import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { TourDetails } from "../components/TourDetails";
import { AtAGlance } from "../components/AtAGlance";
import { PoliciesSection } from "../components/PoliciesSection";

export default function TourPage() {
  const { t } = useLanguage();
  return (
    <PageLayout title={t("tour.pageTitle")}>
      <TourDetails />
      <AtAGlance />
      <PoliciesSection />
    </PageLayout>
  );
}
