import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, ArrowDownToLine, Anchor } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import { Button } from "../components/ui/button";
import canyonImg from "@assets/rafting_3_1778693481900.jpeg";

type Choice = "jump" | "abseil";

export default function AdventureGame() {
  const { t, isRtl } = useLanguage();
  useSeo(t("game.pageTitle"), t("game.pageDesc"));
  const [choice, setChoice] = useState<Choice | null>(null);

  return (
    <PageLayout title={t("game.title")}>
      <section className="py-16 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-3xl ${isRtl ? "text-right" : ""}`}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-muted-foreground mb-10"
          >
            {t("game.intro")}
          </motion.p>

          <div className="relative aspect-[16/10] overflow-hidden border border-white/10 mb-10">
            <img
              src={canyonImg}
              alt="Nevidio canyon jump"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <AnimatePresence>
              {choice === "jump" && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0, scale: 0.4, y: -120 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-7xl md:text-9xl drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)]">
                    💦
                  </span>
                </motion.div>
              )}
              {choice === "abseil" && (
                <motion.div
                  key="rope"
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-6xl md:text-8xl drop-shadow-[0_4px_30px_rgba(45,212,191,0.5)]">
                    🧗
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {choice === null ? (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setChoice("jump")}
                  data-testid="btn-game-jump"
                  className="p-6 bg-primary text-primary-foreground font-heading text-xl tracking-widest uppercase flex flex-col items-center gap-3 hover:brightness-110 transition-all"
                >
                  <ArrowDownToLine className="w-8 h-8" />
                  {t("game.btn.jump")}
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setChoice("abseil")}
                  data-testid="btn-game-abseil"
                  className="p-6 bg-card border border-primary/40 text-foreground font-heading text-xl tracking-widest uppercase flex flex-col items-center gap-3 hover:border-primary transition-all"
                >
                  <Anchor className="w-8 h-8 text-primary" />
                  {t("game.btn.abseil")}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className={`relative p-8 border ${
                  choice === "jump" ? "border-amber-400/50 bg-amber-400/5" : "border-primary/50 bg-primary/10"
                } overflow-hidden text-center`}
                data-testid="game-result"
              >
                <Sparkles
                  className={`w-8 h-8 mx-auto mb-4 ${choice === "jump" ? "text-amber-400" : "text-primary"}`}
                />
                <p className="text-2xl md:text-3xl font-heading mb-3">
                  {t(choice === "jump" ? "game.result.jump.title" : "game.result.abseil.title")}
                </p>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {t(choice === "jump" ? "game.result.jump.body" : "game.result.abseil.body")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setChoice(null)}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
}
