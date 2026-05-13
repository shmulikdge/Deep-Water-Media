import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { MapPin, ExternalLink } from "lucide-react";

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Nevidio+Canyon+Montenegro&hl=en&z=13&output=embed";
const MAPS_LINK_URL =
  "https://www.google.com/maps/search/Nevidio+Canyon+Montenegro";

export function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-heading mb-4">{t("location.title")}</h2>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
            <p className="text-lg text-muted-foreground">{t("location.meeting")}</p>
          </div>
          <p className="text-sm text-primary mt-2 ml-8">{t("location.pickup")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full overflow-hidden border border-white/10" style={{ paddingTop: "45%" }}>
            <iframe
              src={MAPS_EMBED_URL}
              title="Nevidio Canyon location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale"
              style={{ border: 0 }}
              data-testid="iframe-google-maps"
            />
          </div>
          <div className="flex justify-center mt-4">
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-open-maps"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-medium tracking-wide"
            >
              <ExternalLink className="w-4 h-4" />
              {t("location.openMaps")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
