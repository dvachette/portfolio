import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

/** Runtime check of an API payload, so malformed responses fail loudly instead of breaking the UI later */
export type Validator<T> = (data: unknown) => data is T

export function isObject(data: unknown): data is Record<string, unknown> {
    return typeof data === 'object' && data !== null && !Array.isArray(data)
}

export function isArrayOf<T>(item: Validator<T>): Validator<T[]> {
    return (data: unknown): data is T[] => Array.isArray(data) && data.every(item)
}

/** Minimal shape check: an object owning the given keys */
export function hasKeys<T>(...keys: string[]): Validator<T> {
    return (data: unknown): data is T => isObject(data) && keys.every((key) => key in data)
}

/**
 * GET a JSON resource from the backend, with in-memory caching.
 * @param path API path, also used as cache key
 * @param errorMessage message shown to the user when the request fails
 */
export async function apiGet<T>(
    path: string,
    errorMessage: string,
    validate: Validator<T>,
): Promise<T> {
    const cached = getCache<T>(path)
    if (cached) return cached

    const res = await fetch(`${API_URL}${path}`)
    if (!res.ok) throw new Error(errorMessage)
    const data: unknown = await res.json()
    if (!validate(data)) throw new Error(`${errorMessage} (réponse invalide)`)

    setCache(path, data)
    return data
}
