type AnyAudioCtx = typeof AudioContext;

function getCtxCtor(): AnyAudioCtx | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { AudioContext?: AnyAudioCtx; webkitAudioContext?: AnyAudioCtx };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

export interface CanyonAudio {
  start: () => Promise<void>;
  stop: () => void;
  destroy: () => void;
  isSupported: boolean;
  isPlaying: () => boolean;
  subscribe: (cb: (playing: boolean) => void) => () => void;
}

export function createCanyonAudio(): CanyonAudio {
  const CtorRaw = getCtxCtor();
  if (!CtorRaw) {
    return {
      start: async () => {},
      stop: () => {},
      destroy: () => {},
      isSupported: false,
      isPlaying: () => false,
      subscribe: () => () => {},
    };
  }
  const Ctor: AnyAudioCtx = CtorRaw;

  let ctx: AudioContext | null = null;
  let source: AudioBufferSourceNode | null = null;
  let gain: GainNode | null = null;
  let playing = false;
  const listeners = new Set<(p: boolean) => void>();
  const setPlaying = (p: boolean) => {
    if (playing === p) return;
    playing = p;
    listeners.forEach((cb) => cb(p));
  };

  function buildGraph(c: AudioContext) {
    const sampleRate = c.sampleRate;
    const duration = 3;
    const buffer = c.createBuffer(2, Math.floor(duration * sampleRate), sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let lastOut = 0;
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        const bubble = Math.sin(i * 0.0028 + ch * 1.7) * 0.18 * (Math.random() - 0.5);
        data[i] = lastOut * 3.4 + bubble;
      }
    }
    const src = c.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const highpass = c.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 140;

    const lowpass = c.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 2400;

    const peak = c.createBiquadFilter();
    peak.type = "peaking";
    peak.frequency.value = 820;
    peak.Q.value = 0.7;
    peak.gain.value = 4;

    const g = c.createGain();
    g.gain.value = 0;

    src.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(peak);
    peak.connect(g);
    g.connect(c.destination);
    src.start();
    return { src, g };
  }

  async function start() {
    if (!ctx) {
      ctx = new Ctor();
      const { src, g } = buildGraph(ctx);
      source = src;
      gain = g;
    }
    if (ctx.state === "suspended") await ctx.resume();
    if (gain) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.5);
    }
    setPlaying(true);
  }

  function stop() {
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    setPlaying(false);
  }

  function destroy() {
    try {
      source?.stop();
    } catch {
      /* noop */
    }
    source = null;
    gain = null;
    if (ctx && ctx.state !== "closed") {
      void ctx.close();
    }
    ctx = null;
    setPlaying(false);
  }

  return {
    start,
    stop,
    destroy,
    isSupported: true,
    isPlaying: () => playing,
    subscribe: (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
  };
}

let singleton: CanyonAudio | null = null;
export function getCanyonAudio(): CanyonAudio {
  if (!singleton) singleton = createCanyonAudio();
  return singleton;
}

export function playSplash(volume = 0.5): void {
  const Ctor = getCtxCtor();
  if (!Ctor) return;
  const Ctx = Ctor;
  try {
    const c = new Ctx();
    const sampleRate = c.sampleRate;
    const duration = 0.9;
    const buffer = c.createBuffer(1, Math.floor(duration * sampleRate), sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buffer;

    const bandpass = c.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 1200;
    bandpass.Q.value = 0.6;

    const lowShelf = c.createBiquadFilter();
    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 300;
    lowShelf.gain.value = 8;

    const g = c.createGain();
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(volume, c.currentTime + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);

    src.connect(bandpass);
    bandpass.connect(lowShelf);
    lowShelf.connect(g);
    g.connect(c.destination);
    src.start();
    src.stop(c.currentTime + duration);
    src.onended = () => void c.close();
  } catch {
    /* silent fail — splash is optional polish */
  }
}
