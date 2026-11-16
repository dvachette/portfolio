import type { CareerModel } from '@/models/CareerModel'
import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

export async function getCareer(): Promise<CareerModel> {
    const cached = getCache<CareerModel>('career')
    if (cached) return cached
    const res = await fetch(`${API_URL}/career`)
    if (!res.ok) throw new Error('Erreur lors du chargement du parcours')
    const data = await res.json()
    setCache('career', data)
    return data
}

export function useCareerService() {
    return { getCareer }
}
