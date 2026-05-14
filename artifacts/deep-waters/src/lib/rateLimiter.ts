const STORAGE_KEY = "dw_booking_attempts";
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

export function checkRateLimit(): { ok: boolean; retryInSec: number } {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(STORAGE_KEY);
    const attempts: number[] = raw ? JSON.parse(raw) : [];
    const recent = attempts.filter((t) => now - t < WINDOW_MS);

    if (recent.length >= MAX_ATTEMPTS) {
      const oldest = Math.min(...recent);
      const retryInSec = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
      return { ok: false, retryInSec };
    }

    recent.push(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    return { ok: true, retryInSec: 0 };
  } catch {
    return { ok: true, retryInSec: 0 };
  }
}
