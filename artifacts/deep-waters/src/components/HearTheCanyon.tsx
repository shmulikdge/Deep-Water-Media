import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

const AUDIO_SRC = "https://www.soundjay.com/nature/sounds/river-1.mp3";

export function HearTheCanyon() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.5;
    audio.crossOrigin = "anonymous";
    audio.addEventListener("error", () => {
      setErrored(true);
      setPlaying(false);
      setLoading(false);
    });
    audio.addEventListener("playing", () => setLoading(false));
    audio.addEventListener("waiting", () => setLoading(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || errored) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        await audio.play();
        setPlaying(true);
      } catch {
        setErrored(true);
        setPlaying(false);
        setLoading(false);
      }
    }
  };

  if (errored) return null;

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
