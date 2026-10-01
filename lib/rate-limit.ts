/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Suitable as a basic abuse guard for a single server/lambda instance. It is
 * intentionally dependency-free and compatible with the current Next.js +
 * Netlify deployment. Note: serverless instances do not share memory, so this
 * is a best-effort throttle, not a distributed limit. For stricter guarantees
 * a shared store (e.g. Redis / Upstash) would be required.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets (only meaningful when !allowed). */
  retryAfterSeconds: number;
}

/**
 * Record a hit for `key` and report whether it is within the allowed limit.
 *
 * @param key        Identifier to bucket by (e.g. client IP).
 * @param limit      Max requests allowed per window.
 * @param windowMs   Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count < limit) {
    existing.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/** Opportunistically drop expired buckets to bound memory use. */
function sweep() {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}

// Periodic cleanup (guarded so it only registers once per process).
const globalForRateLimit = globalThis as unknown as {
  __rateLimitSweep?: ReturnType<typeof setInterval>;
};
if (!globalForRateLimit.__rateLimitSweep) {
  const timer = setInterval(sweep, 60_000);
  // Do not keep the process alive solely for this timer.
  if (typeof timer.unref === "function") timer.unref();
  globalForRateLimit.__rateLimitSweep = timer;
}
