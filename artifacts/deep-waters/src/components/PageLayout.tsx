import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />
      <div className="pt-20">
        <div className="relative py-20 bg-card border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-8xl font-heading text-primary"
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[2px] w-24 bg-primary mt-4 origin-left"
            />
          </div>
        </div>
        {children}
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
