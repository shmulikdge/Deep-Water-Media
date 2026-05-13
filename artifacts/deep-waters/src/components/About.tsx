import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import rafting3 from "@assets/rafting_3_1778693481900.jpeg";
import rafting4 from "@assets/rafting_4_1778693481899.jpeg";
import { Star, CheckCircle, Users, Globe } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const features = [
    { icon: Star, text: t("about.exp") },
    { icon: CheckCircle, text: t("about.licensed") },
    { icon: Users, text: t("about.groups") },
    { icon: Globe, text: t("about.hebrew") },
  ];

  return (
    <section id="about" className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img src={rafting3} alt="Canyon Gorge" className="w-full object-cover aspect-[4/5] grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -right-12 w-2/3 border-8 border-card hidden md:block z-20"
            >
              <img src={rafting4} alt="Guide at Lookout" className="w-full object-cover aspect-square" />
            </motion.div>
          </div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-heading mb-6"
            >
              {t("about.title")}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              {t("about.desc")}
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-center gap-4 p-4 bg-background/50 border border-white/5"
                >
                  <feature.icon className="w-6 h-6 text-primary shrink-0" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
