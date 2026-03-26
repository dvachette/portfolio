import type { UEModel } from '@/models/UEModel'
import type { ProgrammingLanguage } from '@/types/ProgramingLanguage'
export interface ProjectModel {
    id: string
    title: string
    description: string
    image: string
    sourceCodeLink?: string
    liveDemoLink?: string
    competences: UEModel[]
    programmingLanguages: ProgrammingLanguage[]
}
