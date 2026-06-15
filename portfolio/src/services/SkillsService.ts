import type { SkillModel } from '@/models/SkillModel'
import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

export async function getSkillTab(): Promise<{ section: string, icon: string, skills: SkillModel[] }[]> {
    const cached = getCache<{ section: string, icon: string, skills: SkillModel[] }[]>('skills')
    if (cached) return cached
    const res = await fetch(`${API_URL}/skills`)
    if (!res.ok) throw new Error('Erreur lors du chargement des compétences')
    const data = await res.json()
    setCache('ues', data)
    return data
}

export async function getSkillById(id: string): Promise<SkillModel> {
    const cached = getCache<SkillModel>(`skills:${id}`)
    if (cached) return cached
    const res = await fetch(`${API_URL}/skills/${id}`)
    if (!res.ok) throw new Error(`Erreur lors du chargement de la compétence ${id}`)
    const data = await res.json()
    setCache(`ues:${id}`, data)
    return data
}

export function useSkillsService() {
    return { getSkillTab, getSkillById }
}