import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { TourDetails } from "../components/TourDetails";
import { AtAGlance } from "../components/AtAGlance";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { PoliciesLocation } from "../components/PoliciesLocation";
import { BookingForm } from "../components/BookingForm";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <TourDetails />
      <AtAGlance />
      <About />
      <Gallery />
      <PoliciesLocation />
      <BookingForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
