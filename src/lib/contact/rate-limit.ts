type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  max = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5),
  windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 600_000),
): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true };
}
