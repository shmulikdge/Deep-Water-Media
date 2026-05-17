import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const SESSION_KEY = "dw_welcome_seen_v2";
const CEREMONY_AUDIO_URL = "https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav";
const CEREMONY_PLAY_MS = 5000;
const CEREMONY_FADE_MS = 1500;

type Phase = "idle" | "snipping" | "cutting";

export function WelcomeOverlay() {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const snipTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFadeFrameRef = useRef<number | null>(null);
  const confettiFrameRef = useRef<number | null>(null);
  const confettiBurstTimerRef = useRef<number | null>(null);

  // Mark seen as soon as the overlay opens so refresh mid-ceremony won't reshow.
  useEffect(() => {
    if (!open) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore quota / privacy mode errors */
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (snipTimerRef.current !== null) window.clearTimeout(snipTimerRef.current);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      if (confettiBurstTimerRef.current !== null)
        window.clearTimeout(confettiBurstTimerRef.current);
      if (confettiFrameRef.current !== null) cancelAnimationFrame(confettiFrameRef.current);
      if (audioFadeFrameRef.current !== null) cancelAnimationFrame(audioFadeFrameRef.current);
      confetti.reset();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const launchConfetti = () => {
    const colors = [
      "#fbbf24",
      "#f59e0b",
      "#ef4444",
      "#22d3ee",
      "#a78bfa",
      "#f472b6",
      "#34d399",
      "#ffffff",
    ];
    const zIndex = 10000;

    // Two big center bursts
    confetti({
      particleCount: 220,
      spread: 160,
      startVelocity: 60,
      origin: { x: 0.5, y: 0.5 },
      colors,
      zIndex,
    });
    confettiBurstTimerRef.current = window.setTimeout(() => {
      confettiBurstTimerRef.current = null;
      confetti({
        particleCount: 160,
        spread: 180,
        startVelocity: 55,
        origin: { x: 0.25, y: 0.45 },
        colors,
        zIndex,
      });
      confetti({
        particleCount: 160,
        spread: 180,
        startVelocity: 55,
        origin: { x: 0.75, y: 0.45 },
        colors,
        zIndex,
      });
    }, 250);

    // Continuous side cannons for ~2.5s
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 75,
        startVelocity: 55,
        origin: { x: 0, y: 0.75 },
        colors,
        zIndex,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 75,
        startVelocity: 55,
        origin: { x: 1, y: 0.75 },
        colors,
        zIndex,
      });
      if (Date.now() < end) {
        confettiFrameRef.current = requestAnimationFrame(frame);
      } else {
        confettiFrameRef.current = null;
      }
    };
    frame();
  };

  const playCeremonyAudio = async () => {
    try {
      const audio = new Audio(CEREMONY_AUDIO_URL);
      audio.volume = 1;
      audioRef.current = audio;
      await audio.play();
    } catch {
      /* host may block hotlink — silent fail, visuals still play */
    }
  };

  const stopCeremonyAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const startedAt = performance.now();
    const fadeTick = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, CEREMONY_FADE_MS - elapsed);
      audio.volume = Math.max(0, remaining / CEREMONY_FADE_MS);
      if (remaining > 0) {
        audioFadeFrameRef.current = requestAnimationFrame(fadeTick);
      } else {
        audioFadeFrameRef.current = null;
        audio.pause();
        audio.currentTime = 0;
      }
    };
    audioFadeFrameRef.current = requestAnimationFrame(fadeTick);
  };

  const handleCut = () => {
    if (phase !== "idle") return;
    setPhase("snipping");
    void playCeremonyAudio();
    snipTimerRef.current = window.setTimeout(() => {
      snipTimerRef.current = null;
      setPhase("cutting");
      launchConfetti();
      closeTimerRef.current = window.setTimeout(() => {
        closeTimerRef.current = null;
        stopCeremonyAudio();
        setOpen(false);
      }, CEREMONY_PLAY_MS);
    }, 520);
  };

  const cutting = phase === "cutting";
  const snipping = phase === "snipping";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black"
          data-testid="welcome-overlay"
          dir="ltr"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.10)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.10)_0%,transparent_55%)]" />

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
            <AnimatePresence>
              {phase === "idle" && (
                <motion.div
                  key="welcome-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24, transition: { duration: 0.45 } }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-12 md:mb-16"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 border border-amber-400/40 bg-amber-400/10 rounded-full"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-amber-200">
                      Grand Opening · פתיחה חגיגית
                    </span>
                  </motion.div>
                  <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
                    Welcome to the New
                    <br />
                    <span className="bg-gradient-to-r from-primary via-cyan-300 to-primary bg-clip-text text-transparent">
                      Deep Waters Montenegro
                    </span>
                    <br />
                    Portal, Stefan!
                  </h1>
                  <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto">
                    Click the scissors to cut the ribbon and launch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <Ribbon cutting={cutting} snipping={snipping} onCut={handleCut} />

            <AnimatePresence>
              {phase === "idle" && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="mt-10 md:mt-14 text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/45"
                >
                  ✂ Cut the ribbon — חתוך את הסרט ✂
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {cutting && (
                <motion.p
                  key="launching"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm md:text-base font-mono uppercase tracking-[0.4em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                >
                  Launching…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Ribbon({
  cutting,
  snipping,
  onCut,
}: {
  cutting: boolean;
  snipping: boolean;
  onCut: () => void;
}) {
  return (
    <div className="relative flex h-32 md:h-40 w-[min(680px,94vw)] items-center justify-center">
      {/* Left ribbon half */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[70%]"
        style={{ width: "50%" }}
        animate={cutting ? { x: -1400, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <svg viewBox="0 0 300 130" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ribL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fecaca" />
              <stop offset="0.45" stopColor="#dc2626" />
              <stop offset="1" stopColor="#7f1d1d" />
            </linearGradient>
            <filter id="shadowL" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.55" />
            </filter>
          </defs>
          <polygon
            points="10,30 10,100 0,118 44,92 44,40 0,12"
            fill="url(#ribL)"
            filter="url(#shadowL)"
          />
          <rect x="44" y="40" width="252" height="50" fill="url(#ribL)" filter="url(#shadowL)" />
          <rect x="44" y="44" width="252" height="6" fill="rgba(255,255,255,0.28)" />
          <rect x="44" y="82" width="252" height="3" fill="rgba(0,0,0,0.25)" />
          <polygon points="296,40 300,65 296,90 286,90 286,40" fill="#7f1d1d" />
        </svg>
      </motion.div>

      {/* Right ribbon half */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[70%]"
        style={{ width: "50%" }}
        animate={cutting ? { x: 1400, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <svg viewBox="0 0 300 130" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ribR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fecaca" />
              <stop offset="0.45" stopColor="#dc2626" />
              <stop offset="1" stopColor="#7f1d1d" />
            </linearGradient>
            <filter id="shadowR" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.55" />
            </filter>
          </defs>
          <polygon
            points="290,30 290,100 300,118 256,92 256,40 300,12"
            fill="url(#ribR)"
            filter="url(#shadowR)"
          />
          <rect x="4" y="40" width="252" height="50" fill="url(#ribR)" filter="url(#shadowR)" />
          <rect x="4" y="44" width="252" height="6" fill="rgba(255,255,255,0.28)" />
          <rect x="4" y="82" width="252" height="3" fill="rgba(0,0,0,0.25)" />
          <polygon points="4,40 14,40 14,90 4,90 0,65" fill="#7f1d1d" />
        </svg>
      </motion.div>

      {/* Golden scissors button */}
      <motion.button
        onClick={onCut}
        disabled={cutting || snipping}
        data-testid="btn-cut-ribbon"
        aria-label="Cut the ribbon"
        whileHover={cutting || snipping ? undefined : { scale: 1.08 }}
        whileTap={cutting || snipping ? undefined : { scale: 0.94 }}
        animate={
          cutting
            ? { scale: [1, 1.4, 0], rotate: 540, opacity: [1, 1, 0], y: [0, -30, -120] }
            : { y: [0, -6, 0] }
        }
        transition={
          cutting
            ? { duration: 1.2, ease: "easeOut" }
            : { y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
        }
        className="relative z-20 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-50 p-4 md:p-5 shadow-[0_0_60px_rgba(251,191,36,0.6),0_0_120px_rgba(220,38,38,0.35)] hover:shadow-[0_0_80px_rgba(251,191,36,0.8),0_0_140px_rgba(220,38,38,0.5)] cursor-pointer disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 transition-shadow"
      >
        <GoldenScissors snipping={snipping} />
      </motion.button>
    </div>
  );
}

/**
 * Golden scissors with two independently-rotating blade groups around the pivot.
 * Snip animation: blades close (rotate to 0°), open, close, open — quick double snip.
 */
function GoldenScissors({ snipping }: { snipping: boolean }) {
  const OPEN_TOP = -10;
  const OPEN_BOT = 10;

  const topAnimate = snipping
    ? { rotate: [OPEN_TOP, 0, OPEN_TOP, 0, OPEN_TOP] }
    : { rotate: OPEN_TOP };
  const botAnimate = snipping
    ? { rotate: [OPEN_BOT, 0, OPEN_BOT, 0, OPEN_BOT] }
    : { rotate: OPEN_BOT };
  const snipTransition = {
    duration: 0.5,
    times: [0, 0.22, 0.45, 0.7, 1],
    ease: "easeInOut" as const,
  };

  return (
    <svg
      viewBox="0 0 160 100"
      className="w-20 h-12 md:w-28 md:h-16 drop-shadow-[0_4px_18px_rgba(251,191,36,0.7)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.35" stopColor="#fbbf24" />
          <stop offset="0.7" stopColor="#d97706" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="bladeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fef9c3" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Top blade + handle (rotates around pivot 70,50) */}
      <motion.g
        style={{ originX: "70px", originY: "50px" }}
        animate={topAnimate}
        transition={snipping ? snipTransition : { duration: 0.3, ease: "easeOut" }}
      >
        {/* finger ring */}
        <circle cx="20" cy="32" r="13" stroke="url(#goldGrad)" strokeWidth="5" fill="none" />
        <circle cx="20" cy="32" r="9" stroke="#92400e" strokeWidth="1" fill="none" opacity="0.4" />
        {/* arm from ring to pivot */}
        <path
          d="M 30 38 Q 50 44 70 50"
          stroke="url(#goldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* blade */}
        <path d="M 70 50 L 152 36 L 156 44 L 72 54 Z" fill="url(#bladeGrad)" />
        <path d="M 72 52 L 152 39" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      </motion.g>

      {/* Bottom blade + handle */}
      <motion.g
        style={{ originX: "70px", originY: "50px" }}
        animate={botAnimate}
        transition={snipping ? snipTransition : { duration: 0.3, ease: "easeOut" }}
      >
        <circle cx="20" cy="68" r="13" stroke="url(#goldGrad)" strokeWidth="5" fill="none" />
        <circle cx="20" cy="68" r="9" stroke="#92400e" strokeWidth="1" fill="none" opacity="0.4" />
        <path
          d="M 30 62 Q 50 56 70 50"
          stroke="url(#goldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 70 50 L 152 64 L 156 56 L 72 46 Z" fill="url(#bladeGrad)" />
        <path d="M 72 48 L 152 61" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      </motion.g>

      {/* Pivot screw */}
      <circle cx="70" cy="50" r="4.5" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
      <circle cx="70" cy="50" r="1.2" fill="#fef3c7" />
    </svg>
  );
}
