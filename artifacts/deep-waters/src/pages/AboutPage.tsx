import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { About } from "../components/About";
import { useSeo } from "../lib/seo";

export default function AboutPage() {
  const { t } = useLanguage();
  useSeo(t("about.pageTitle"), t("about.pageDesc"));

  return (
    <PageLayout title={t("about.pageTitle")}>
      <About />
    </PageLayout>
  );
}
