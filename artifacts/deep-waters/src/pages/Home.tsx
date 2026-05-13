import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { BookingForm } from "../components/BookingForm";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { MapSection } from "../components/MapSection";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <BookingForm />
      <MapSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
