import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { TourDetails } from "../components/TourDetails";
import { AtAGlance } from "../components/AtAGlance";
import { PoliciesSection } from "../components/PoliciesSection";
import { FAQ } from "../components/FAQ";
import { useSeo } from "../lib/seo";

export default function TourPage() {
  const { t } = useLanguage();
  useSeo(t("tour.pageTitle"), t("tour.pageDesc"));

  return (
    <PageLayout title={t("tour.pageTitle")}>
      <TourDetails />
      <AtAGlance />
      <FAQ />
      <PoliciesSection />
    </PageLayout>
  );
}
