import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Instagram, ExternalLink } from "lucide-react";

import rafting1 from "@assets/rafting_1778693481901.jpeg";
import rafting2 from "@assets/rafting_2_1778693481892.jpeg";
import rafting3 from "@assets/rafting_3_1778693481900.jpeg";
import rafting4 from "@assets/rafting_4_1778693481899.jpeg";

const INSTAGRAM_URL = "https://www.instagram.com/deepwaters.me";

const POSTS = [
  { src: rafting2, caption: "Frozen mid-rapid. The canyon doesn't slow down for anyone." },
  { src: rafting3, caption: "Where the river carved this gorge over a million years." },
  { src: rafting1, caption: "Trekking deeper than most ever go." },
  { src: rafting4, caption: "Look down. That's where you're jumping next." },
];

export function InstagramFeed() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-24 bg-card border-y border-white/5" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`flex flex-wrap items-end justify-between gap-4 mb-10 ${isRtl ? "text-right" : ""}`}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Instagram className="w-6 h-6 text-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">@deepwaters.me</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading">{t("instagram.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("instagram.subtitle")}</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram-cta"
            className="inline-flex items-center gap-2 px-5 py-3 border border-primary/30 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            {t("instagram.cta")}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POSTS.map((post, idx) => (
            <motion.a
              key={idx}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group aspect-square overflow-hidden block"
            >
              <img
                src={post.src}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs leading-snug line-clamp-3">{post.caption}</p>
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
