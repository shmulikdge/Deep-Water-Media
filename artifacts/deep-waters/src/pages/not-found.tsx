import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { useSeo } from "../lib/seo";
import { Compass } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();
  useSeo("404", t("notfound.subtitle"));

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Compass className="w-20 h-20 text-primary mx-auto mb-8" strokeWidth={1.2} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="font-heading text-7xl md:text-9xl text-primary/30 mb-2">404</p>
            <h1 className="font-heading text-4xl md:text-6xl mb-4">{t("notfound.title")}</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              {t("notfound.subtitle")}
            </p>
            <Button asChild size="lg" className="rounded-none font-heading tracking-wider px-8 py-6">
              <Link href="/" data-testid="btn-return-home">{t("notfound.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
