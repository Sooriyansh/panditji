type CacheEntry<T> = { expiresAt: number; value: Promise<T> };

const cache = new Map<string, CacheEntry<unknown>>();

/** Small process-local cache. A platform cache/Redis can replace this without changing callers. */
export function cached<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const existing = cache.get(key) as CacheEntry<T> | undefined;
  if (existing && existing.expiresAt > now) return existing.value;

  const value = loader().catch((error: unknown) => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, { expiresAt: now + ttlMs, value });
  return value;
}
