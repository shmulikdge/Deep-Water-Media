import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { Gallery } from "../components/Gallery";
import { InstagramFeed } from "../components/InstagramFeed";
import { useSeo } from "../lib/seo";

export default function GalleryPage() {
  const { t } = useLanguage();
  useSeo(t("gallery.pageTitle"), t("gallery.pageDesc"));

  return (
    <PageLayout title={t("gallery.pageTitle")}>
      <Gallery />
      <InstagramFeed />
    </PageLayout>
  );
}
