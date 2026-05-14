import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { useSeo } from "../lib/seo";

export default function PrivacyPolicyPage() {
  const { t, isRtl } = useLanguage();
  useSeo(t("privacy.pageTitle"), t("privacy.pageDesc"));

  const sections = [
    { titleKey: "privacy.s1.title", bodyKey: "privacy.s1.body" },
    { titleKey: "privacy.s2.title", bodyKey: "privacy.s2.body" },
    { titleKey: "privacy.s3.title", bodyKey: "privacy.s3.body" },
    { titleKey: "privacy.s4.title", bodyKey: "privacy.s4.body" },
    { titleKey: "privacy.s5.title", bodyKey: "privacy.s5.body" },
    { titleKey: "privacy.s6.title", bodyKey: "privacy.s6.body" },
  ] as const;

  return (
    <PageLayout title={t("privacy.pageTitle")}>
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
