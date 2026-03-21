import projects from '@/data/projects.json'
import type { ProjectModel } from '@/models/ProjectModel'
import { useCompetenceService } from './CompetenceService'
const competenceService = useCompetenceService()
function getProjectTab(): ProjectModel[] {
    // Replace the id's in the projects with the actual competence objects

    const projectsTab = projects.map((project) => {
        const projectCompetences = project.competences.map((competenceId) => {
            const competence = competenceService.getCompetenceById(competenceId)
            if (competence.id === 'not-found') {
                console.warn(
                    `Competence with id ${competenceId} not found for project ${project.id}.`,
                )
            }
            return competence
        })
        return {
            ...project,
            competences: projectCompetences,
        } as ProjectModel
    })
    console.log('Loaded projects:', projectsTab)

    return projectsTab
}

function getProjectById(id: string): ProjectModel {
    let project = getProjectTab().find((project) => project.id === id) as ProjectModel | undefined
    if (!project) {
        console.warn(`Project with id ${id} not found.`)
        project = {
            id: 'unknown',
            title: 'Projet non trouvé',
            description: "Le projet que vous cherchez n'existe pas ou a été supprimé.",
            image: 'notfound.png',
            competences: [],
            programmingLanguages: [],
        }
    }
    return project
}

function getProjectsByCompetenceId(competenceId: string): ProjectModel[] {
    const projectsTab = getProjectTab()
    return projectsTab.filter((project) =>
        project.competences.some((competence) => competence.id === competenceId),
    )
}

export function useProjectService() {
    return {
        getProjectTab,
        getProjectById,
        getProjectsByCompetenceId,
    }
}
