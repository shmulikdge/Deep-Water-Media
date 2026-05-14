import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import type { TranslationKey } from "../translations";

const FAQ_KEYS: Array<{ q: TranslationKey; a: TranslationKey }> = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];

export function FAQ() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-3 text-primary">{t("faq.title")}</h2>
          <p className="text-muted-foreground">{t("faq.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full" dir={isRtl ? "rtl" : "ltr"}>
            {FAQ_KEYS.map(({ q, a }, idx) => (
              <AccordionItem
                key={q}
                value={`item-${idx}`}
                className="border-white/10 bg-card/30 mb-3 px-4"
                data-testid={`accordion-faq-${idx + 1}`}
              >
                <AccordionTrigger className={`text-left text-base md:text-lg font-medium hover:text-primary py-5 ${isRtl ? "text-right" : ""}`}>
                  {t(q)}
                </AccordionTrigger>
                <AccordionContent className={`text-muted-foreground text-base leading-relaxed pb-5 ${isRtl ? "text-right" : ""}`}>
                  {t(a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
