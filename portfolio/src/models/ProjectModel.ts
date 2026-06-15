import type { SkillModel } from '@/models/SkillModel'
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
    competences: SkillModel[]
    programmingLanguages: ProgrammingLanguage[]
}
