import { motion } from "framer-motion";
import { Shield, Backpack, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import type { TranslationKey } from "../translations";

import rafting1 from "@assets/rafting_1778693481901.jpeg";
import rafting2 from "@assets/rafting_2_1778693481892.jpeg";
import rafting3 from "@assets/rafting_3_1778693481900.jpeg";

type Article = {
  img: string;
  icon: LucideIcon;
  tagKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  bodyKeys: TranslationKey[];
};

const ARTICLES: Article[] = [
  {
    img: rafting1,
    icon: Shield,
    tagKey: "guide.a1.tag",
    titleKey: "guide.a1.title",
    leadKey: "guide.a1.lead",
    bodyKeys: ["guide.a1.p1", "guide.a1.p2", "guide.a1.p3"],
  },
  {
    img: rafting2,
    icon: Backpack,
    tagKey: "guide.a2.tag",
    titleKey: "guide.a2.title",
    leadKey: "guide.a2.lead",
    bodyKeys: ["guide.a2.p1", "guide.a2.p2", "guide.a2.p3"],
  },
  {
    img: rafting3,
    icon: CalendarDays,
    tagKey: "guide.a3.tag",
    titleKey: "guide.a3.title",
    leadKey: "guide.a3.lead",
    bodyKeys: ["guide.a3.p1", "guide.a3.p2", "guide.a3.p3"],
  },
];

export default function GuidePage() {
  const { t, isRtl } = useLanguage();
  useSeo(t("guide.pageTitle"), t("guide.pageDesc"));

  return (
    <PageLayout title={t("guide.pageTitle")}>
      <section className="py-20 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-5xl ${isRtl ? "text-right" : ""}`}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mb-16"
          >
            {t("guide.intro")}
          </motion.p>

          <div className="flex flex-col gap-16">
            {ARTICLES.map((article, idx) => {
              const Icon = article.icon;
              return (
                <motion.article
                  key={article.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="grid md:grid-cols-5 gap-8 items-start border-t border-white/5 pt-12"
                >
                  <div className="md:col-span-2 relative overflow-hidden aspect-[4/3] md:aspect-[3/4]">
                    <img
                      src={article.img}
                      alt={t(article.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary">
                      {t(article.tagKey)}
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                        {t("guide.article")} 0{idx + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-heading mb-5 leading-tight">
                      {t(article.titleKey)}
                    </h2>

                    <p className="text-lg text-foreground/90 mb-6 leading-relaxed font-light">
                      {t(article.leadKey)}
                    </p>

                    <div className="space-y-4">
                      {article.bodyKeys.map((bk) => (
                        <p key={bk} className="text-muted-foreground leading-relaxed">
                          {t(bk)}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
