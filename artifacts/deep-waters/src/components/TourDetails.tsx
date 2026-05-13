import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Card, CardContent } from "./ui/card";
import { Clock, Mountain, Shield, Activity, Droplets, Package } from "lucide-react";

export function TourDetails() {
  const { t } = useLanguage();

  const details = [
    { icon: Clock, text: t("tour.duration") },
    { icon: Mountain, text: t("tour.difficulty") },
    { icon: Shield, text: t("tour.minAge") },
    { icon: Activity, text: t("tour.maxWeight") },
  ];

  return (
    <section id="tour" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-primary">{t("tour.title")}</h2>
          <div className="inline-block bg-primary/10 text-primary border border-primary/20 px-6 py-3 rounded-none font-bold text-2xl tracking-widest mb-4">
            {t("tour.price")}
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("tour.priceNote")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="grid grid-cols-2 gap-4">
            {details.map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="bg-card/50 border-white/5 rounded-none text-center h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <detail.icon className="w-8 h-8 text-primary mb-3" />
                    <span className="font-medium text-sm text-card-foreground">{detail.text}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <Droplets className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-card-foreground font-medium">{t("tour.swimming")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("tour.jumps")}</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <Package className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-card-foreground font-medium">{t("tour.bring")}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
