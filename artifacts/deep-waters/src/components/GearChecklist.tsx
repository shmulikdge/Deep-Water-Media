import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, PartyPopper } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { Button } from "./ui/button";
import type { TranslationKey } from "../translations";

type Item = { id: string; labelKey: TranslationKey };

const ITEMS: Item[] = [
  { id: "swimsuit", labelKey: "checklist.swimsuit" },
  { id: "dryClothes", labelKey: "checklist.dryClothes" },
  { id: "towel", labelKey: "checklist.towel" },
  { id: "spirit", labelKey: "checklist.spirit" },
];

export function GearChecklist() {
  const { t, isRtl } = useLanguage();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = useMemo(
    () => ITEMS.every((i) => checked[i.id]),
    [checked],
  );
  const completed = ITEMS.filter((i) => checked[i.id]).length;

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section
      className="py-24 bg-gradient-to-b from-background via-card/30 to-background"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={`container mx-auto px-4 max-w-3xl ${isRtl ? "text-right" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t("checklist.eyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            {t("checklist.title")}
          </h2>
          <p className="text-muted-foreground">{t("checklist.subtitle")}</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{t("checklist.progress")}</span>
            <span className="font-mono">
              {completed} / {ITEMS.length}
            </span>
          </div>
          <div className="h-1.5 bg-card rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${(completed / ITEMS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {ITEMS.map((item, idx) => {
            const isOn = !!checked[item.id];
            return (
              <motion.button
                key={item.id}
                onClick={() => toggle(item.id)}
                data-testid={`checklist-${item.id}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-3 p-4 border transition-all text-left ${
                  isRtl ? "flex-row-reverse text-right" : ""
                } ${
                  isOn
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-card/40 hover:border-primary/40"
                }`}
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded border flex items-center justify-center transition-all ${
                    isOn ? "bg-primary border-primary" : "border-white/30"
                  }`}
                >
                  <AnimatePresence>
                    {isOn && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={`flex-1 font-medium ${isOn ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {t(item.labelKey)}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {allChecked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative text-center p-8 border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-primary/10 overflow-hidden"
              data-testid="checklist-celebration"
            >
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-10, -60 - i * 8],
                    x: [(i % 2 === 0 ? -1 : 1) * (20 + i * 8)],
                  }}
                  transition={{ duration: 1.4, delay: i * 0.05, repeat: Infinity, repeatDelay: 1.2 }}
                  className="absolute top-1/2 left-1/2 text-primary"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
              ))}
              <div className="relative">
                <PartyPopper className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-xl md:text-2xl font-heading mb-5">
                  {t("checklist.success")}
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById("book");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="rounded-none font-heading tracking-wider animate-pulse"
                  data-testid="btn-checklist-book"
                >
                  {t("checklist.cta")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
