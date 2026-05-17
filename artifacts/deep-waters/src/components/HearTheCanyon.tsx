import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { getCanyonAudio } from "../lib/canyonAudio";

export function HearTheCanyon() {
  const { t } = useLanguage();
  const audio = useMemo(() => getCanyonAudio(), []);
  const [playing, setPlaying] = useState(() => audio.isPlaying());
  const [loading, setLoading] = useState(false);

  useEffect(() => audio.subscribe(setPlaying), [audio]);

  if (!audio.isSupported) return null;

  const toggle = async () => {
    if (playing) {
      audio.stop();
      return;
    }
    try {
      setLoading(true);
      await audio.start();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1 }}
      onClick={toggle}
      aria-label={t("audio.label")}
      data-testid="btn-hear-canyon"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2 pl-3 pr-4 py-2.5 bg-card/90 backdrop-blur-md border border-primary/30 shadow-xl rounded-full text-sm font-medium text-foreground hover:border-primary transition-all"
    >
      <span
        className={`relative w-9 h-9 rounded-full flex items-center justify-center ${
          playing ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
        } transition-colors`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : playing ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
        {playing && (
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />
        )}
      </span>
      <span className="hidden sm:inline whitespace-nowrap">
        {playing ? t("audio.pause") : t("audio.play")}
      </span>
    </motion.button>
  );
}
