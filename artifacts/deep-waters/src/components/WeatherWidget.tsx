import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Cloud, CloudRain, CloudSnow, Sun, CloudSun, Wind, Droplets } from "lucide-react";

const LAT = 42.96;
const LON = 19.10;

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  code: number;
}

function iconFor(code: number) {
  if (code === 0 || code === 1) return Sun;
  if (code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code >= 71 && code <= 77) return CloudSnow;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) return CloudRain;
  return Cloud;
}

export function WeatherWidget() {
  const { t, isRtl } = useLanguage();
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        const c = json.current;
        if (!c) {
          setError(true);
          return;
        }
        setData({
          temp: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          humidity: Math.round(c.relative_humidity_2m),
          wind: Math.round(c.wind_speed_10m),
          code: c.weather_code,
        });
      })
      .catch(() => setError(true));
  }, []);

  const Icon = data ? iconFor(data.code) : Cloud;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card/60 border border-white/10 p-6 backdrop-blur-sm"
      data-testid="widget-weather"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("weather.title")}</p>
      </div>

      {error ? (
        <p className="text-sm text-muted-foreground">{t("weather.error")}</p>
      ) : !data ? (
        <p className="text-sm text-muted-foreground">{t("weather.loading")}</p>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-12 h-12 text-primary" strokeWidth={1.4} />
            <div>
              <div className="text-4xl font-heading text-foreground leading-none">{data.temp}°C</div>
              <div className="text-xs text-muted-foreground mt-1">
                {t("weather.feels")} {data.feelsLike}°C
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground border-t border-white/5 pt-3">
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" />
              {data.wind} km/h
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" />
              {data.humidity}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
