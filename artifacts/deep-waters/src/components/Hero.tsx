import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Button } from "./ui/button";
import { Link } from "wouter";
import heroVideo from "@assets/river_1778693481895.mp4";
import posterImg from "@assets/rafting_1778693481901.jpeg";

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener("canplay", onReady, { once: true });
    v.addEventListener("loadeddata", onReady, { once: true });
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("loadeddata", onReady);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterImg}
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading text-white mb-6 drop-shadow-lg animate-hero-fade">
          {t("hero.title")}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-none font-heading tracking-wider"
            asChild
            data-testid="btn-hero-book"
          >
            <Link href="/contact">{t("hero.cta")}</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
