import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import { ArrowRight } from "lucide-react";
import type { TranslationKey } from "../translations";

import rafting1 from "@assets/rafting_1778693481901.jpeg";
import rafting3 from "@assets/rafting_3_1778693481900.jpeg";
import rafting4 from "@assets/rafting_4_1778693481899.jpeg";

interface Article {
  img: string;
  titleKey: TranslationKey;
  excerptKey: TranslationKey;
  tagKey: TranslationKey;
}

const ARTICLES: Article[] = [
  { img: rafting4, titleKey: "guide.a1.title", excerptKey: "guide.a1.excerpt", tagKey: "guide.a1.tag" },
  { img: rafting1, titleKey: "guide.a2.title", excerptKey: "guide.a2.excerpt", tagKey: "guide.a2.tag" },
  { img: rafting3, titleKey: "guide.a3.title", excerptKey: "guide.a3.excerpt", tagKey: "guide.a3.tag" },
];

export default function GuidePage() {
  const { t, isRtl } = useLanguage();
  useSeo(t("guide.pageTitle"), t("guide.pageDesc"));

  return (
    <PageLayout title={t("guide.pageTitle")}>
      <section className="py-20 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-6xl ${isRtl ? "text-right" : ""}`}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mb-14"
          >
            {t("guide.intro")}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                data-testid={`card-article-${idx + 1}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.img}
                    alt={t(article.titleKey)}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs uppercase tracking-widest text-primary mb-3 border border-primary/30 px-2 py-1">
                    {t(article.tagKey)}
                  </span>
                  <h3 className="text-xl font-heading mb-3 group-hover:text-primary transition-colors leading-tight">
                    {t(article.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t(article.excerptKey)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="italic">{t("guide.comingSoon")}</span>
                    <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                      {t("guide.readMore")}
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
