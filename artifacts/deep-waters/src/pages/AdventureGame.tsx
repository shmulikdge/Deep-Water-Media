import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { RotateCcw, Trophy, AlertCircle, Zap } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import { Button } from "../components/ui/button";
import { playSplash } from "../lib/canyonAudio";

type Phase = "aiming" | "flying" | "landed";
type Result = "perfect" | "clumsy";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  r: number;
}

interface GameState {
  w: number;
  h: number;
  time: number;
  last: number;
  player: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    rotV: number;
    inAir: boolean;
  };
  power: number;
  powerDir: number;
  lockedPower: number;
  particles: Particle[];
}

const GRAVITY = 1400;
const PERFECT_THRESHOLD = 60;

export default function AdventureGame() {
  const { t, isRtl } = useLanguage();
  useSeo(t("game.pageTitle"), t("game.pageDesc"));

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const landingTimeoutRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("aiming");
  const stateRef = useRef<GameState>({
    w: 800,
    h: 480,
    time: 0,
    last: 0,
    player: { x: 600, y: 250, vx: 0, vy: 0, rot: 0, rotV: 0, inAir: false },
    power: 0,
    powerDir: 1,
    lockedPower: 0,
    particles: [],
  });

  const [phase, setPhase] = useState<Phase>("aiming");
  const [result, setResult] = useState<Result | null>(null);

  const resetCharacter = useCallback(() => {
    const s = stateRef.current;
    s.player.x = s.w * 0.78;
    s.player.y = s.h * 0.55;
    s.player.vx = 0;
    s.player.vy = 0;
    s.player.rot = 0;
    s.player.rotV = 0;
    s.player.inAir = false;
    s.power = 0;
    s.powerDir = 1;
    s.lockedPower = 0;
    s.particles = [];
  }, []);

  const reset = useCallback(() => {
    if (landingTimeoutRef.current !== null) {
      window.clearTimeout(landingTimeoutRef.current);
      landingTimeoutRef.current = null;
    }
    resetCharacter();
    phaseRef.current = "aiming";
    setPhase("aiming");
    setResult(null);
  }, [resetCharacter]);

  const jump = useCallback(() => {
    if (phaseRef.current !== "aiming") return;
    const s = stateRef.current;
    const p = s.power / 100;
    s.lockedPower = s.power;
    s.player.vx = -(120 + p * 280);
    s.player.vy = -(280 + p * 380);
    s.player.rotV = (1.4 + p * 4) * Math.PI;
    s.player.inAir = true;
    phaseRef.current = "flying";
    setPhase("flying");
  }, []);

  // Render & physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = Math.min(900, container.clientWidth);
      const h = Math.round(w * 0.6);
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const s = stateRef.current;
      s.w = w;
      s.h = h;
      if (phaseRef.current === "aiming") resetCharacter();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const render = (s: GameState) => {
      const { w, h, time, player, power, particles } = s;

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#0c4a6e");
      sky.addColorStop(0.55, "#155e75");
      sky.addColorStop(1, "#0e7490");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#1f2937";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.18, 0);
      ctx.lineTo(w * 0.09, h * 0.55);
      ctx.lineTo(0, h * 0.78);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#374151";
      ctx.beginPath();
      ctx.moveTo(w * 0.7, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(w * 0.6, h);
      ctx.lineTo(w * 0.68, h * 0.62);
      ctx.lineTo(w * 0.7, h * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#4b5563";
      ctx.fillRect(w * 0.7, h * 0.6 - 4, w * 0.3, 4);

      const waterY = h * 0.85;
      const waterGrad = ctx.createLinearGradient(0, waterY, 0, h);
      waterGrad.addColorStop(0, "#06b6d4");
      waterGrad.addColorStop(1, "#0e7490");
      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.moveTo(0, waterY);
      for (let x = 0; x <= w; x += 8) {
        const y =
          waterY +
          Math.sin((x + time * 60) * 0.04) * 3 +
          Math.sin((x + time * 30) * 0.08) * 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = waterY + Math.sin((x + time * 60) * 0.04) * 3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.rot);
      ctx.fillStyle = "#14b8a6";
      ctx.fillRect(-7, -8, 14, 22);
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, -14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(-2.5, -15, 5, 2);
      ctx.strokeStyle = "#14b8a6";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.lineTo(-13, 5);
      ctx.moveTo(7, -4);
      ctx.lineTo(13, 5);
      ctx.moveTo(-4, 14);
      ctx.lineTo(-7, 22);
      ctx.moveTo(4, 14);
      ctx.lineTo(7, 22);
      ctx.stroke();
      ctx.restore();

      for (const p of particles) {
        const a = Math.max(0, p.life);
        ctx.fillStyle = `rgba(165, 243, 252, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * Math.max(0.3, a), 0, Math.PI * 2);
        ctx.fill();
      }

      const barX = 18;
      const barY = h * 0.18;
      const barW = 14;
      const barH = h * 0.64;
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(barX, barY, barW, barH);
      const fillH = (power / 100) * barH;
      const grad = ctx.createLinearGradient(0, barY + barH, 0, barY);
      grad.addColorStop(0, "#10b981");
      grad.addColorStop(0.6, "#fbbf24");
      grad.addColorStop(1, "#ef4444");
      ctx.fillStyle = grad;
      ctx.fillRect(barX, barY + barH - fillH, barW, fillH);
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1;
      ctx.strokeRect(barX + 0.5, barY + 0.5, barW - 1, barH - 1);

      const threshY = barY + barH - (PERFECT_THRESHOLD / 100) * barH;
      ctx.strokeStyle = "rgba(251,191,36,0.9)";
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(barX - 4, threshY);
      ctx.lineTo(barX + barW + 4, threshY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px ui-monospace, monospace";
      ctx.fillText("PWR", barX - 4, barY - 6);
      ctx.fillText(Math.round(power) + "%", barX - 4, barY + barH + 14);
    };

    const tick = (now: number) => {
      const s = stateRef.current;
      if (!s.last) s.last = now;
      const dt = Math.min(0.033, (now - s.last) / 1000);
      s.last = now;
      s.time += dt;

      if (phaseRef.current === "aiming") {
        s.power += s.powerDir * dt * 220;
        if (s.power >= 100) {
          s.power = 100;
          s.powerDir = -1;
        }
        if (s.power <= 0) {
          s.power = 0;
          s.powerDir = 1;
        }
      } else if (phaseRef.current === "flying") {
        const p = s.player;
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.rotV * dt;
        const waterY = s.h * 0.85;
        if (p.y >= waterY && p.inAir) {
          p.inAir = false;
          for (let i = 0; i < 38; i++) {
            const angle = -Math.PI + Math.random() * Math.PI;
            const speed = 80 + Math.random() * 380;
            s.particles.push({
              x: p.x,
              y: waterY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 1,
              r: 2 + Math.random() * 5,
            });
          }
          p.vy = 60;
          p.vx = 0;
          p.rotV = 0;
          playSplash(0.5);
          if (landingTimeoutRef.current !== null) {
            window.clearTimeout(landingTimeoutRef.current);
          }
          landingTimeoutRef.current = window.setTimeout(() => {
            landingTimeoutRef.current = null;
            if (phaseRef.current !== "flying") return;
            phaseRef.current = "landed";
            setResult(s.lockedPower >= PERFECT_THRESHOLD ? "perfect" : "clumsy");
            setPhase("landed");
          }, 950);
        }
        if (p.x < -60 || p.y > s.h + 220) {
          p.vx = 0;
          p.vy = 0;
        }
      }

      for (const pt of s.particles) {
        pt.vy += 800 * dt;
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.life -= dt / 1.2;
      }
      s.particles = s.particles.filter((pt) => pt.life > 0);

      render(s);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (landingTimeoutRef.current !== null) {
        window.clearTimeout(landingTimeoutRef.current);
        landingTimeoutRef.current = null;
      }
    };
  }, [resetCharacter]);

  // Spacebar control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const tgt = e.target as HTMLElement | null;
      if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA")) return;
      e.preventDefault();
      if (phaseRef.current === "aiming") jump();
      else if (phaseRef.current === "landed") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, reset]);

  return (
    <PageLayout title={t("game.title")}>
      <section className="py-12 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-4xl ${isRtl ? "text-right" : ""}`}>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            {t("game.intro")}
          </p>

          <div
            ref={containerRef}
            className="relative w-full mx-auto border border-white/10 bg-black overflow-hidden shadow-2xl"
            style={{ maxWidth: 900 }}
          >
            <canvas
              ref={canvasRef}
              className="block w-full select-none touch-none"
              data-testid="game-canvas"
            />

            <AnimatePresence>
              {phase === "landed" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/85 backdrop-blur-sm p-4"
                  data-testid="game-result"
                >
                  <div
                    className={`max-w-md text-center p-6 md:p-8 border ${
                      result === "perfect"
                        ? "border-amber-400/70 bg-amber-400/10"
                        : "border-primary/50 bg-primary/10"
                    }`}
                  >
                    {result === "perfect" ? (
                      <>
                        <Trophy className="w-12 h-12 mx-auto mb-3 text-amber-400 drop-shadow-[0_0_22px_rgba(251,191,36,0.7)]" />
                        <p className="text-2xl md:text-3xl font-heading mb-2">
                          {t("game.result.perfect")}
                        </p>
                        <p className="text-sm text-muted-foreground mb-5">
                          {t("game.result.perfectSub")}
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-primary" />
                        <p className="text-2xl md:text-3xl font-heading mb-2">
                          {t("game.result.clumsy")}
                        </p>
                        <p className="text-sm text-muted-foreground mb-5">
                          {t("game.result.clumsySub")}
                        </p>
                      </>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={reset}
                        data-testid="btn-game-replay"
                        className="rounded-none font-heading tracking-wider"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t("game.playAgain")}
                      </Button>
                      <Button asChild className="rounded-none font-heading tracking-wider">
                        <Link href="/contact">{t("game.bookReal")}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 min-h-[64px]">
            {phase === "aiming" && (
              <motion.button
                onClick={jump}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                data-testid="btn-game-jump"
                className="px-10 py-4 bg-primary text-primary-foreground font-heading text-xl md:text-2xl tracking-widest uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(45,212,191,0.45)] hover:brightness-110 transition-all"
              >
                <Zap className="w-6 h-6" />
                {t("game.btn.jump")}
              </motion.button>
            )}
            {phase === "flying" && (
              <p className="text-primary text-sm font-mono uppercase tracking-widest animate-pulse">
                {t("game.flying")}
              </p>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3 font-mono uppercase tracking-widest">
            {t("game.hint")}
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
