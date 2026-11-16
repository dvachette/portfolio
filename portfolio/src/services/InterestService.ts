import type { InterestModel } from '@/models/InterestModel'
import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

export async function getInterests(): Promise<InterestModel[]> {
    const cached = getCache<InterestModel[]>('interests')
    if (cached) return cached
    const res = await fetch(`${API_URL}/interests`)
    if (!res.ok) throw new Error('Erreur lors du chargement des centres d’intérêt')
    const data = await res.json()
    setCache('interests', data)
    return data
}

export function useInterestService() {
    return { getInterests }
}
