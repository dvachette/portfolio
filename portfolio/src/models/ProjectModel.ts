import type { UEModel } from '@/models/UEModel'
import type { ProgrammingLanguage } from '@/types/ProgramingLanguage'
import type { ProjectType } from '@/types/ProjectType'
export interface ProjectModel {
    id: string
    projectType: ProjectType
    title: string
    description: string
    image: string
    sourceCodeLink?: string
    liveDemoLink?: string
    competences: UEModel[]
    programmingLanguages: ProgrammingLanguage[]
}
