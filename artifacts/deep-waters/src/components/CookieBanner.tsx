import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "../lib/LanguageContext";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "dw_cookie_consent";

export function CookieBanner() {
  const { t, isRtl } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        timer = setTimeout(() => setVisible(true), 800);
      }
    } catch {
      setVisible(true);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const close = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore quota errors
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[60]"
          dir={isRtl ? "rtl" : "ltr"}
          data-testid="banner-cookie"
        >
          <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md border border-white/10 shadow-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <Cookie className="w-6 h-6 text-primary shrink-0" />
            <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
              {t("cookie.message")}{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                {t("cookie.learnMore")}
              </Link>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => close("rejected")}
                data-testid="btn-cookie-reject"
                className="rounded-none"
              >
                {t("cookie.reject")}
              </Button>
              <Button
                size="sm"
                onClick={() => close("accepted")}
                data-testid="btn-cookie-accept"
                className="rounded-none"
              >
                {t("cookie.accept")}
              </Button>
              <button
                onClick={() => close("rejected")}
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
