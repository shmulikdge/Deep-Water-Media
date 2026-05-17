import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";

export function JumpingManButton() {
  const { t, isRtl } = useLanguage();
  const [location] = useLocation();
  const active = location === "/adventure-game";

  return (
    <Link href="/adventure-game" data-testid="link-adventure-game" aria-label={t("nav.game")}>
      <motion.span
        initial="rest"
        whileHover="jump"
        animate="rest"
        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium cursor-pointer select-none transition-colors ${
          active
            ? "border-primary bg-primary/15 text-primary"
            : "border-primary/40 text-foreground/90 hover:border-primary hover:text-primary"
        } ${isRtl ? "flex-row-reverse" : ""}`}
      >
        <span className="relative w-6 h-6 flex items-center justify-center">
          <motion.span
            className="text-lg leading-none origin-bottom"
            variants={{
              rest: { y: 0, rotate: 0, scale: 1 },
              jump: {
                y: [0, -14, -10, 4, 0],
                rotate: [0, -25, 25, 10, 0],
                scale: [1, 1.05, 1.05, 0.95, 1],
                transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
              },
            }}
          >
            🏊‍♂️
          </motion.span>
          <motion.span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-primary/60"
            variants={{
              rest: { scaleX: 0.6, opacity: 0.3 },
              jump: {
                scaleX: [0.4, 0.4, 1.4, 1, 0.6],
                opacity: [0.2, 0.2, 0.9, 0.5, 0.3],
                transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
              },
            }}
          />
        </span>
        <span className="whitespace-nowrap">{t("nav.game")}</span>
      </motion.span>
    </Link>
  );
}
