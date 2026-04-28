import type { UEModel } from '@/models/UEModel'
import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

export async function getUEsTab(): Promise<UEModel[]> {
    const cached = getCache<UEModel[]>('ues')
    if (cached) return cached
    const res = await fetch(`${API_URL}/ues`)
    if (!res.ok) throw new Error('Erreur lors du chargement des UEs')
    const data = await res.json()
    setCache('ues', data)
    return data
}

export async function getUEById(id: string): Promise<UEModel> {
    const cached = getCache<UEModel>(`ues:${id}`)
    if (cached) return cached
    const res = await fetch(`${API_URL}/ues/${id}`)
    if (!res.ok) throw new Error(`Erreur lors du chargement de l'UE ${id}`)
    const data = await res.json()
    setCache(`ues:${id}`, data)
    return data
}

export function useUEService() {
    return { getUEsTab, getUEById }
}