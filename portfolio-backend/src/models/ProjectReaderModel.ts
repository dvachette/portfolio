import { ProgrammingLanguage } from "../types/ProgramingLanguage";
import { ProjectType } from "../types/ProjectType";

export interface ProjectReaderModel {
    id: string,
    projectType: ProjectType,
    title: string,
    description: string,
    image: string,
    liveDemoLink?: string,
    sourceCodeLink?: string,
    competences: string[],
    programmingLanguages: ProgrammingLanguage[]
}