import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { MapPin, Info, CloudRain } from "lucide-react";

export function PoliciesLocation() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-8">{t("policies.title")}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">{t("policies.cancellation")}</p>
              </div>
              <div className="flex items-start gap-4">
                <CloudRain className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">{t("policies.weather")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-8">{t("location.title")}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">{t("location.meeting")}</p>
              </div>
              <div className="p-6 bg-card border border-white/5 mt-4">
                <p className="text-center font-medium text-primary">{t("location.pickup")}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
