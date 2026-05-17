import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import { GUIDE_ARTICLES } from "../lib/guideArticles";

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

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {GUIDE_ARTICLES.map((article, idx) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <Link
                    href={`/guide/${article.slug}`}
                    data-testid={`card-guide-${article.slug}`}
                    className="group block h-full border border-white/10 bg-card/40 hover:border-primary/50 transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={article.img}
                        alt={t(article.titleKey)}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-background/85 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary">
                        {t(article.tagKey)}
                      </div>
                    </div>

                    <div className={`p-6 ${isRtl ? "text-right" : ""}`}>
                      <div className={`flex items-center gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                          {t("guide.article")} 0{idx + 1}
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-heading mb-3 leading-tight group-hover:text-primary transition-colors">
                        {t(article.titleKey)}
                      </h2>

                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {t(article.leadKey)}
                      </p>

                      <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary ${isRtl ? "flex-row-reverse" : ""}`}>
                        <span>{t("guide.readMore")}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
