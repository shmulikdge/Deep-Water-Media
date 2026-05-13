import { Link, useLocation } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../translations";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@assets/deep_water_logo_1778693462993.jpg";

const NAV_LINKS = [
  { key: "nav.tours" as const, href: "/tour" },
  { key: "nav.gallery" as const, href: "/gallery" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.contact" as const, href: "/contact" },
];

export function Navigation() {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          data-testid="btn-logo-home"
          className="flex items-center gap-4 focus:outline-none"
        >
          <img src={logo} alt="Deep Waters Montenegro" className="h-12 w-auto object-contain" />
          <span className="font-heading text-2xl tracking-widest hidden md:block">Deep Waters</span>
        </Link>

        <div className={`hidden md:flex items-center gap-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={`flex gap-6 ${isRtl ? "flex-row-reverse" : ""}`}>
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={href}
                href={href}
                data-testid={`link-nav-${href.replace("/", "")}`}
                className={`text-sm font-medium transition-colors ${
                  location === href ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          <div className={`flex items-center gap-2 border-white/20 pl-6 ml-2 ${isRtl ? "border-r pr-6 mr-2 pl-0 ml-0" : "border-l"}`}>
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

          <Button asChild data-testid="btn-nav-book">
            <Link href="/contact">{t("nav.book")}</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen((v) => !v)}
          data-testid="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 border-b border-white/10 px-4 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-white/5 hover:text-primary transition-colors"
            >
              {t(key)}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2">
            {(["en", "he", "me"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs font-bold uppercase px-3 py-1 rounded transition-colors ${
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <Button asChild className="w-full mt-2">
            <Link href="/contact" onClick={() => setMenuOpen(false)}>{t("nav.book")}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
