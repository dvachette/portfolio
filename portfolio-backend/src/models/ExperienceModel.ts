import { ExperienceType, Workload } from '../types/ExperienceType';
import { OrganizationModel } from './OrganizationModel';

export interface ExperienceModel {
    id: string,
    type: ExperienceType,
    title: string,
    organization: OrganizationModel,
    startDate: string,
    endDate: string | null,
    workload: Workload,
    highlights: string[],
    tags: string[]
}
