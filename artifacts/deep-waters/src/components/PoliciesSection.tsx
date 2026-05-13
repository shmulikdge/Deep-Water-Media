import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Info, CloudRain } from "lucide-react";

export function PoliciesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading mb-10">{t("policies.title")}</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-card border border-white/5">
              <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-lg text-muted-foreground">{t("policies.cancellation")}</p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-card border border-white/5">
              <CloudRain className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-lg text-muted-foreground">{t("policies.weather")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
