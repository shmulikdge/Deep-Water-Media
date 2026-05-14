import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Skeleton } from "./ui/skeleton";

import closeJump from "@assets/close_jump_1778693481893.mp4";
import farJump from "@assets/far_jump_1778693481894.mp4";
import waterJump from "@assets/water_jump_1778693481897.mp4";
import splashRiver from "@assets/splash_river_1778693481898.mp4";
import rafting1 from "@assets/rafting_1778693481901.jpeg";
import rafting2 from "@assets/rafting_2_1778693481892.jpeg";

interface GalleryItem {
  type: "video" | "image";
  src: string;
  span: string;
}

const ITEMS: GalleryItem[] = [
  { type: "video", src: closeJump, span: "col-span-1 md:col-span-2 row-span-2" },
  { type: "image", src: rafting1, span: "col-span-1 row-span-1" },
  { type: "video", src: farJump, span: "col-span-1 row-span-1" },
  { type: "image", src: rafting2, span: "col-span-1 md:col-span-2 row-span-1" },
  { type: "video", src: waterJump, span: "col-span-1 row-span-1" },
  { type: "video", src: splashRiver, span: "col-span-1 md:col-span-3 row-span-2" },
];

function GalleryTile({ item, idx }: { item: GalleryItem; idx: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className={`relative overflow-hidden group bg-card ${item.span}`}
    >
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      {item.type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
          className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.src}
          alt="Canyoning"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </motion.div>
  );
}

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading mb-12 text-center"
        >
          {t("gallery.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {ITEMS.map((item, idx) => (
            <GalleryTile key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
