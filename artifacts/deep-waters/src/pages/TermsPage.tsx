import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";

export default function TermsPage() {
  const { t, isRtl } = useLanguage();
  useSeo(t("terms.pageTitle"), t("terms.pageDesc"));

  const sections = [
    { titleKey: "terms.s1.title", bodyKey: "terms.s1.body" },
    { titleKey: "terms.s2.title", bodyKey: "terms.s2.body" },
    { titleKey: "terms.s3.title", bodyKey: "terms.s3.body" },
    { titleKey: "terms.s4.title", bodyKey: "terms.s4.body" },
    { titleKey: "terms.s5.title", bodyKey: "terms.s5.body" },
    { titleKey: "terms.s6.title", bodyKey: "terms.s6.body" },
    { titleKey: "terms.s7.title", bodyKey: "terms.s7.body" },
  ] as const;

  return (
    <PageLayout title={t("terms.pageTitle")}>
      <section className="py-20 bg-background" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`container mx-auto px-4 max-w-3xl ${isRtl ? "text-right" : ""}`}>
          <p className="text-sm text-muted-foreground mb-10 italic">{t("legal.lastUpdated")}</p>
          {sections.map((section) => (
            <article key={section.titleKey} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-heading text-primary mb-4">
                {t(section.titleKey)}
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {t(section.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
