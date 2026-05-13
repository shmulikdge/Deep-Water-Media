import { Link } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../translations";
import { Button } from "./ui/button";
import logo from "@assets/deep_water_logo_1778693462993.jpg";

export function Navigation() {
  const { language, setLanguage, t, isRtl } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <img src={logo} alt="Deep Waters Montenegro" className="h-12 w-auto object-contain" />
          <span className="font-heading text-2xl tracking-widest hidden md:block">Deep Waters</span>
        </Link>

        <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="hidden md:flex gap-6">
            <a href="#tour" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.tours")}</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.about")}</a>
            <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.gallery")}</a>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
            {(['en', 'he', 'me'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                data-testid={`btn-lang-${lang}`}
                className={`text-xs font-bold uppercase px-2 py-1 rounded transition-colors ${
                  language === lang ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Button asChild className="hidden sm:inline-flex" data-testid="btn-nav-book">
            <a href="#book">{t("nav.book")}</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}
