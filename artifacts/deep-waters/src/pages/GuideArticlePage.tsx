import { Link, useRoute, Redirect } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";
import { getArticleBySlug } from "../lib/guideArticles";

export default function GuideArticlePage() {
  const { t, isRtl } = useLanguage();
  const [, params] = useRoute<{ slug: string }>("/guide/:slug");
  const article = params ? getArticleBySlug(params.slug) : undefined;

  useSeo(
    article ? t(article.titleKey) : t("guide.pageTitle"),
    article ? t(article.leadKey) : t("guide.pageDesc"),
  );

  if (!article) return <Redirect to="/guide" />;

  const Icon = article.icon;

  return (
    <PageLayout title={t(article.titleKey)}>
      <article className="py-20 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-3xl ${isRtl ? "text-right" : ""}`}>
          <Link
            href="/guide"
            data-testid="link-back-to-guides"
            className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            <span>{t("guide.back")}</span>
          </Link>

          <div className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse" : ""}`}>
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              {t(article.tagKey)}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] overflow-hidden mb-10"
          >
            <img
              src={article.img}
              alt={t(article.titleKey)}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light mb-10 border-l-2 border-primary pl-6"
            dir={isRtl ? "rtl" : "ltr"}
            style={isRtl ? { borderLeft: 0, borderRight: "2px solid hsl(var(--primary))", paddingLeft: 0, paddingRight: "1.5rem" } : undefined}
          >
            {t(article.leadKey)}
          </motion.p>

          <div className="space-y-6">
            {article.bodyKeys.map((bk, idx) => (
              <motion.p
                key={bk}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {t(bk)}
              </motion.p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/guide"
              className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-primary hover:text-foreground transition-colors ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
              <span>{t("guide.back")}</span>
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
