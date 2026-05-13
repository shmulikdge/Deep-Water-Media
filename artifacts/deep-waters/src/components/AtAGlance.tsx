import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { UtensilsCrossed, Shirt, Shield, Camera, Users, Backpack } from "lucide-react";

const GOOGLE_DRIVE_ICON = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M6.28 3h11.44l-2.56 4.44H3.72L6.28 3zm-3.1 5.44h6.16l2.56 4.44-3.08 5.34-5.64-9.78zm7.64 4.44L8.26 18h7.48l2.56-4.44-2.56-4.44H8.26l2.56 4.44zm2.56-4.44l2.56-4.44h5.64l-2.56 4.44h-5.64zm2.56 8.88H8.26l-2.56 4.44h15.6l-2.58-4.44z" />
  </svg>
);

const DROPBOX_ICON = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M6 2L0 6l6 4 6-4L6 2zM18 2l-6 4 6 4 6-4-6-4zM0 14l6 4 6-4-6-4-6 4zM18 10l-6 4 6 4 6-4-6-4zM6 19.5L12 23l6-3.5-6-4-6 4z" />
  </svg>
);

export function AtAGlance() {
  const { t, isRtl } = useLanguage();

  const items = [
    {
      icon: UtensilsCrossed,
      label: t("glance.lunch"),
      sub: null,
      extra: null,
    },
    {
      icon: Shirt,
      label: t("glance.equipment"),
      sub: t("glance.equipmentSub"),
      extra: null,
    },
    {
      icon: Shield,
      label: t("glance.insurance"),
      sub: t("glance.insuranceSub"),
      extra: null,
    },
    {
      icon: Camera,
      label: t("glance.gopro"),
      sub: t("glance.goproSub"),
      extra: "cloud",
    },
    {
      icon: Users,
      label: t("glance.age"),
      sub: t("glance.ageSub"),
      extra: null,
    },
    {
      icon: Backpack,
      label: t("glance.bringLabel"),
      sub: t("glance.bring"),
      extra: null,
    },
  ];

  return (
    <section className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-3 text-primary">
            {t("glance.title")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("glance.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`flex gap-5 p-6 bg-background/60 border border-white/5 hover:border-primary/30 transition-colors ${isRtl ? "flex-row-reverse text-right" : ""}`}
            >
              <div className="shrink-0 mt-1">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground text-base">{item.label}</p>
                {item.sub && (
                  <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                )}
                {item.extra === "cloud" && (
                  <div className={`flex items-center gap-3 mt-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground/70 bg-white/5 px-2 py-1 rounded-sm">
                      <GOOGLE_DRIVE_ICON />
                      Google Drive
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground/70 bg-white/5 px-2 py-1 rounded-sm">
                      <DROPBOX_ICON />
                      Dropbox
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
