const cache = new Map<string, { value: unknown; expiresAt: number }>()

const DEFAULT_TTL = 5 * 60 * 1000

export function getCache<T>(key: string): T | null {
    const entry = cache.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
        cache.delete(key)
        return null
    }
    return entry.value as T
}

export function setCache<T>(key: string, value: T, ttl: number = DEFAULT_TTL): void {
    cache.set(key, { value, expiresAt: Date.now() + ttl })
}