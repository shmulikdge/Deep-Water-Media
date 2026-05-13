import { useLanguage } from "../lib/LanguageContext";
import logo from "@assets/deep_water_logo_1778693462993.jpg";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card py-12 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <img src={logo} alt="Deep Waters Montenegro" className="h-20 w-auto object-contain mb-8 grayscale hover:grayscale-0 transition-all" />
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Deep Waters Montenegro. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
