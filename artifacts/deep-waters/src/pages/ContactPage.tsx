import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { PageLayout } from "../components/PageLayout";
import { BookingForm } from "../components/BookingForm";
import { MapSection } from "../components/MapSection";

const WHATSAPP_URL = "https://wa.me/38268889498";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61589125478449";
const INSTAGRAM_URL = "https://www.instagram.com/deepwaters.me";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.5l5.808-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.374l-.36-.214-3.727.977.994-3.636-.235-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
    </svg>
  );
}

export default function ContactPage() {
  const { t, isRtl } = useLanguage();

  const socialLinks = [
    {
      label: "WhatsApp",
      sub: t("contact.whatsappSub"),
      href: WHATSAPP_URL,
      icon: <WhatsAppIcon />,
      color: "hover:border-[#25D366]/50 hover:text-[#25D366]",
      bg: "hover:bg-[#25D366]/10",
    },
    {
      label: "Facebook",
      sub: "Deep Waters Montenegro",
      href: FACEBOOK_URL,
      icon: <FacebookIcon />,
      color: "hover:border-[#1877F2]/50 hover:text-[#1877F2]",
      bg: "hover:bg-[#1877F2]/10",
    },
    {
      label: "Instagram",
      sub: "@deepwaters.me",
      href: INSTAGRAM_URL,
      icon: <InstagramIcon />,
      color: "hover:border-[#E1306C]/50 hover:text-[#E1306C]",
      bg: "hover:bg-[#E1306C]/10",
    },
  ];

  return (
    <PageLayout title={t("contact.pageTitle")}>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-muted-foreground/70 uppercase tracking-widest">
              {t("contact.socialTitle")}
            </h2>
            <div className={`grid sm:grid-cols-3 gap-4 ${isRtl ? "direction-rtl" : ""}`}>
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-contact-${link.label.toLowerCase()}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center gap-3 p-8 border border-white/10 text-center transition-all duration-300 ${link.color} ${link.bg}`}
                >
                  <span className="text-muted-foreground group-hover:text-inherit transition-colors">
                    {link.icon}
                  </span>
                  <span className="font-heading text-2xl tracking-wide">{link.label}</span>
                  <span className="text-xs text-muted-foreground">{link.sub}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BookingForm />
      <MapSection />
    </PageLayout>
  );
}
