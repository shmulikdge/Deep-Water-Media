import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Language, TranslationKey } from "../translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "dw_lang";
const VALID: Language[] = ["en", "he", "me"];

function isValid(value: string | null): value is Language {
  return value !== null && (VALID as string[]).includes(value);
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isValid(fromUrl)) return fromUrl;
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (isValid(fromStorage)) return fromStorage;
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (browser === "he") return "he";
    if (browser === "sr" || browser === "me" || browser === "hr" || browser === "bs") return "me";
  } catch {
    // ignore
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRtl: language === "he",
      }}
    >
      <div dir={language === "he" ? "rtl" : "ltr"} className="w-full min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
