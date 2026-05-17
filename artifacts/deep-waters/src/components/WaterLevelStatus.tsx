import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import type { TranslationKey } from "../translations";

type Status = "optimal" | "caution" | "closed";

const STATUS: Status = "optimal";

const COLORS: Record<Status, { dot: string; glow: string; text: string; ring: string }> = {
  optimal: {
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_18px_4px_rgba(52,211,153,0.55)]",
    text: "text-emerald-300",
    ring: "border-emerald-400/40",
  },
  caution: {
    dot: "bg-amber-400",
    glow: "shadow-[0_0_18px_4px_rgba(251,191,36,0.55)]",
    text: "text-amber-300",
    ring: "border-amber-400/40",
  },
  closed: {
    dot: "bg-rose-500",
    glow: "shadow-[0_0_18px_4px_rgba(244,63,94,0.55)]",
    text: "text-rose-300",
    ring: "border-rose-500/40",
  },
};

export function WaterLevelStatus() {
  const { t, isRtl } = useLanguage();
  const c = COLORS[STATUS];
  const statusLabelKey = `water.status.${STATUS}` as TranslationKey;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-14 bg-background"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <div className={`relative border ${c.ring} bg-card/60 backdrop-blur-sm p-5 md:p-6 overflow-hidden`}>
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent" />

          <div className={`flex items-center gap-4 flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 shrink-0">
              <span className={`w-3.5 h-3.5 rounded-full ${c.dot} ${c.glow}`} />
              <span className={`absolute w-3.5 h-3.5 rounded-full ${c.dot} animate-ping opacity-60`} />
            </div>

            <div className={`flex-1 min-w-0 ${isRtl ? "text-right" : ""}`}>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
                  {t("water.title")}
                </p>
              </div>
              <p className="text-base md:text-lg font-medium">
                <span className="text-muted-foreground">{t("water.label")}: </span>
                <span className={`font-heading ${c.text}`}>{t(statusLabelKey)}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t("water.note")}</p>
            </div>

            <div className={`text-[10px] uppercase tracking-widest text-muted-foreground font-mono shrink-0 ${isRtl ? "text-left" : "text-right"}`}>
              <p>{t("water.updated")}</p>
              <p className="text-foreground/80 mt-0.5">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
