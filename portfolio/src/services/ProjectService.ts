import type { ProjectModel } from '@/models/ProjectModel'
import { apiGet, hasKeys, isArrayOf } from '@/services/api'

const isProject = hasKeys<ProjectModel>('id', 'title', 'projectType', 'programmingLanguages')
const isProjectList = isArrayOf(isProject)

export function getProjectTab(): Promise<ProjectModel[]> {
    return apiGet('/projects', 'Erreur lors du chargement des projets', isProjectList)
}

export function getProjectById(id: string): Promise<ProjectModel> {
    return apiGet(
        `/projects/${encodeURIComponent(id)}`,
        `Erreur lors du chargement du projet ${id}`,
        isProject,
    )
}

export function getProjectsByCompetenceId(competenceId: string): Promise<ProjectModel[]> {
    return apiGet(
        `/projects/by-competence/${encodeURIComponent(competenceId)}`,
        `Erreur lors du chargement des projets pour la compétence ${competenceId}`,
        isProjectList,
    )
}

export function useProjectService() {
    return { getProjectTab, getProjectById, getProjectsByCompetenceId }
}
