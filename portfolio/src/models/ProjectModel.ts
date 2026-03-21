import type { CompetenceModel } from '@/models/CompetenceModel'
import type { ProgrammingLanguage } from '@/types/ProgramingLanguage'
export interface ProjectModel {
    id: string
    title: string
    description: string
    image: string
    sourceCodeLink?: string
    liveDemoLink?: string
    competences: CompetenceModel[]
    programmingLanguages: ProgrammingLanguage[]
}
