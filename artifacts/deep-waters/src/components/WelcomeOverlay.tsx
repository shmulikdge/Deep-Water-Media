import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scissors, Sparkles } from "lucide-react";
import { getCanyonAudio } from "../lib/canyonAudio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  r: number;
}

const COLORS = [
  "#fbbf24",
  "#ef4444",
  "#22d3ee",
  "#a78bfa",
  "#f472b6",
  "#34d399",
  "#ffffff",
  "#fde68a",
];

export function WelcomeOverlay() {
  const [open, setOpen] = useState(true);
  const [cutting, setCutting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastBurstRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const closeTimerRef = useRef<number | null>(null);

  const handleCut = () => {
    if (cutting) return;
    setCutting(true);
    void getCanyonAudio()
      .start()
      .catch(() => {
        /* audio is best-effort; user can still toggle later */
      });
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 3200);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Fireworks engine — runs only after the ribbon is cut
  useEffect(() => {
    if (!cutting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = performance.now();
    let last = performance.now();

    const spawnBurst = (cx: number, cy: number) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 70 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
        const speed = 120 + Math.random() * 320;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          r: 1.6 + Math.random() * 2.4,
        });
      }
    };

    // Opening salvo
    spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.45);

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const elapsed = now - startTimeRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (elapsed < 2600 && now - lastBurstRef.current > 200) {
        lastBurstRef.current = now;
        spawnBurst(w * (0.08 + Math.random() * 0.84), h * (0.12 + Math.random() * 0.5));
        if (Math.random() < 0.5) {
          spawnBurst(w * (0.08 + Math.random() * 0.84), h * (0.12 + Math.random() * 0.5));
        }
      }

      // Trail effect: slight fade instead of full clear
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const p of particlesRef.current) {
        p.vy += 240 * dt;
        p.vx *= 0.985;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt / 1.5;
        if (p.life > 0) {
          const a = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
    };
  }, [cutting]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black"
          data-testid="welcome-overlay"
          dir="ltr"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.12)_0%,transparent_50%)]" />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ display: cutting ? "block" : "none" }}
            aria-hidden
          />

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
            <AnimatePresence>
              {!cutting && (
                <motion.div
                  key="welcome-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="mb-12 md:mb-16"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 border border-red-500/40 bg-red-500/10 rounded-full"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-red-300" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.35em] text-red-200">
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

            <Ribbon cutting={cutting} onCut={handleCut} />

            <AnimatePresence>
              {!cutting && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
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
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm md:text-base font-mono uppercase tracking-[0.4em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
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

function Ribbon({ cutting, onCut }: { cutting: boolean; onCut: () => void }) {
  return (
    <div className="relative flex h-32 md:h-40 w-[min(680px,94vw)] items-center justify-center">
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{ width: "50%", transformOrigin: "left center" }}
        animate={
          cutting
            ? { x: -360, y: 260, rotate: -38, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 1.5, ease: [0.4, 0, 0.6, 1] }}
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

      <motion.div
        className="absolute right-0 top-0 h-full"
        style={{ width: "50%", transformOrigin: "right center" }}
        animate={
          cutting
            ? { x: 360, y: 260, rotate: 38, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 1.5, ease: [0.4, 0, 0.6, 1] }}
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

      <motion.button
        onClick={onCut}
        disabled={cutting}
        data-testid="btn-cut-ribbon"
        aria-label="Cut the ribbon"
        whileHover={cutting ? undefined : { scale: 1.08, rotate: -8 }}
        whileTap={cutting ? undefined : { scale: 0.94 }}
        animate={
          cutting
            ? { scale: [1, 1.45, 0], rotate: [0, 220, 540], opacity: [1, 1, 0], y: [0, -30, -100] }
            : { y: [0, -6, 0] }
        }
        transition={
          cutting
            ? { duration: 1.2, ease: "easeOut" }
            : { y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
        }
        className="relative z-20 rounded-full bg-white p-5 md:p-6 text-zinc-900 shadow-[0_0_60px_rgba(255,255,255,0.55),0_0_120px_rgba(220,38,38,0.45)] hover:bg-amber-50 cursor-pointer disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/60"
      >
        <Scissors className="w-10 h-10 md:w-14 md:h-14" strokeWidth={2.4} />
      </motion.button>
    </div>
  );
}
