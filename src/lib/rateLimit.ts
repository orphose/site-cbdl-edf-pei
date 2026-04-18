/**
 * Rate-limiter très léger en mémoire (fenêtre glissante par clé).
 *
 * Suffisant pour protéger un endpoint d'admin mono-instance (ex. génération IA
 * appelée uniquement par des utilisateurs authentifiés). Pour un déploiement
 * multi-instance, remplacer par un store partagé (Upstash / Redis).
 */

type Hit = { timestamps: number[] };

const buckets = new Map<string, Hit>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  const bucket = buckets.get(key) ?? { timestamps: [] };
  const recent = bucket.timestamps.filter((t) => t > cutoff);

  if (recent.length >= limit) {
    buckets.set(key, { timestamps: recent });
    const oldest = recent[0];
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldest + windowMs,
    };
  }

  recent.push(now);
  buckets.set(key, { timestamps: recent });

  return {
    allowed: true,
    remaining: limit - recent.length,
    resetAt: now + windowMs,
  };
}
