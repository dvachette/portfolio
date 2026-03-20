import projects from '@/data/projects.json'
import type { ProjectModel } from '@/models/ProjectModel'

function getProjectTab(): ProjectModel[] {
    return projects as ProjectModel[]
}

function getProjectByTitle(title: string): ProjectModel | undefined {
    return projects.find((project) => project.title === title) as ProjectModel | undefined
}

export function useProjectService() {
    return {
        getProjectTab,
        getProjectByTitle,
    }
}
