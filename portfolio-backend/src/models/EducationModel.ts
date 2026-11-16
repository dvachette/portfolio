import { OrganizationModel } from './OrganizationModel';

export interface EducationModel {
    id: string,
    title: string,
    establishment: OrganizationModel,
    startDate: string,
    endDate: string | null,
    description?: string,
    specialities: string[],
    options: string[]
}
