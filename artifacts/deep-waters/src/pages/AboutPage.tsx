import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { About } from "../components/About";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <PageLayout title={t("about.pageTitle")}>
      <About />
    </PageLayout>
  );
}
