import { useLanguage } from "../lib/LanguageContext";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { BookingForm } from "../components/BookingForm";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { MapSection } from "../components/MapSection";
import { InstagramFeed } from "../components/InstagramFeed";
import { useSeo } from "../lib/seo";

export default function Home() {
  const { t } = useLanguage();
  useSeo(t("hero.title"), t("hero.subtitle"));

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <BookingForm />
      <InstagramFeed />
      <MapSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
