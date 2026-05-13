import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { TourDetails } from "../components/TourDetails";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { BookingForm } from "../components/BookingForm";
import { PoliciesLocation } from "../components/PoliciesLocation";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <TourDetails />
      <About />
      <Gallery />
      <PoliciesLocation />
      <BookingForm />
      <Footer />
    </main>
  );
}
