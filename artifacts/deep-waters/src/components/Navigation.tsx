import { Link, useLocation } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../translations";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { JumpingManButton } from "./JumpingManButton";
import logo from "@assets/deep_water_logo_1778693462993.jpg";

const NAV_LINKS = [
  { key: "nav.tours" as const, href: "/tour" },
  { key: "nav.gallery" as const, href: "/gallery" },
  { key: "nav.guide" as const, href: "/guide" },
  { key: "nav.about" as const, href: "/about" },
  { key: "nav.contact" as const, href: "/contact" },
];

function LanguageSwitcher({ size = "sm" }: { size?: "sm" | "md" }) {
  const { language, setLanguage } = useLanguage();
  const padding = size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-xs";
  return (
    <div className="flex items-center gap-1">
      {(["en", "he", "me"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          data-testid={`btn-lang-${lang}`}
          className={`font-bold uppercase rounded transition-colors ${padding} ${
            language === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export function Navigation() {
  const { t, isRtl } = useLanguage();
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={goHome}
          data-testid="btn-logo-home"
          className="flex items-center gap-3 focus:outline-none shrink-0"
        >
          <img src={logo} alt="Deep Waters Montenegro" className="h-12 w-auto object-contain" />
          <span className="font-heading text-xl tracking-widest hidden lg:block">Deep Waters</span>
        </button>

        <div className={`hidden lg:flex items-center gap-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={`flex gap-5 ${isRtl ? "flex-row-reverse" : ""}`}>
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

          <div
            className={`flex items-center gap-3 border-white/20 ${
              isRtl ? "border-r pr-4 mr-2" : "border-l pl-4 ml-2"
            }`}
          >
            <JumpingManButton />
            <LanguageSwitcher />
            <Button asChild data-testid="btn-nav-book">
              <Link href="/contact">{t("nav.book")}</Link>
            </Button>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <JumpingManButton />
          <LanguageSwitcher />
          <button
            className="p-2 text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            data-testid="btn-mobile-menu"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background/95 border-b border-white/10 px-4 pb-6 pt-2 flex flex-col gap-2">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-3 border-b border-white/5 hover:text-primary transition-colors"
            >
              {t(key)}
            </Link>
          ))}
          <Button asChild className="w-full mt-3">
            <Link href="/contact" onClick={() => setMenuOpen(false)}>{t("nav.book")}</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
