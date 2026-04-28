import type { ProjectModel } from '@/models/ProjectModel'
import { getCache, setCache } from '@/composables/useCache'

const API_URL = import.meta.env.VITE_API_URL

export async function getProjectTab(): Promise<ProjectModel[]> {
    const cached = getCache<ProjectModel[]>('projects')
    if (cached) return cached
    const res = await fetch(`${API_URL}/projects`)
    if (!res.ok) throw new Error('Erreur lors du chargement des projets')
    const data = await res.json()
    setCache('projects', data)
    return data
}

export async function getProjectById(id: string): Promise<ProjectModel> {
    const cached = getCache<ProjectModel>(`projects:${id}`)
    if (cached) return cached
    const res = await fetch(`${API_URL}/projects/${id}`)
    if (!res.ok) throw new Error(`Erreur lors du chargement du projet ${id}`)
    const data = await res.json()
    setCache(`projects:${id}`, data)
    return data
}

export async function getProjectsByCompetenceId(competenceId: string): Promise<ProjectModel[]> {
    const cached = getCache<ProjectModel[]>(`projects:by-competence:${competenceId}`)
    if (cached) return cached
    const res = await fetch(`${API_URL}/projects/by-competence/${competenceId}`)
    if (!res.ok) throw new Error(`Erreur lors du chargement des projets pour la compétence ${competenceId}`)
    const data = await res.json()
    setCache(`projects:by-competence:${competenceId}`, data)
    return data
}

export function useProjectService() {
    return { getProjectTab, getProjectById, getProjectsByCompetenceId }
}