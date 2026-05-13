import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../translations";
import { Button } from "./ui/button";
import logo from "@assets/deep_water_logo_1778693462993.jpg";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navigation() {
  const { language, setLanguage, t, isRtl } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="btn-logo-home"
          className="flex items-center gap-4 focus:outline-none"
          aria-label="Go to top"
        >
          <img src={logo} alt="Deep Waters Montenegro" className="h-12 w-auto object-contain" />
          <span className="font-heading text-2xl tracking-widest hidden md:block">Deep Waters</span>
        </button>

        <div className={`flex items-center gap-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scrollTo("tour")}
              data-testid="btn-nav-tours"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.tours")}
            </button>
            <button
              onClick={() => scrollTo("about")}
              data-testid="btn-nav-about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              data-testid="btn-nav-gallery"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t("nav.gallery")}
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
            {(["en", "he", "me"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                data-testid={`btn-lang-${lang}`}
                className={`text-xs font-bold uppercase px-2 py-1 rounded transition-colors ${
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Button
            onClick={() => scrollTo("book")}
            className="hidden sm:inline-flex"
            data-testid="btn-nav-book"
          >
            {t("nav.book")}
          </Button>
        </div>
      </div>
    </nav>
  );
}
