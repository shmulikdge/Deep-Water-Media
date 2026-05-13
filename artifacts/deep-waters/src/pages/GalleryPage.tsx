import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { Gallery } from "../components/Gallery";

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <PageLayout title={t("gallery.pageTitle")}>
      <Gallery />
    </PageLayout>
  );
}
