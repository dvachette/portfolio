import type { ExperienceType, Workload } from '@/types/ExperienceType'

export interface OrganizationModel {
    name: string
    website?: string
    location: string
}

export interface ExperienceModel {
    id: string
    type: ExperienceType
    title: string
    organization: OrganizationModel
    startDate: string
    endDate: string | null
    workload: Workload
    highlights: string[]
    tags: string[]
}

export interface EducationModel {
    id: string
    title: string
    establishment: OrganizationModel
    startDate: string
    endDate: string | null
    description?: string
    specialities: string[]
    options: string[]
}

export interface CertificationModel {
    id: string
    name: string
    context?: string
    date?: string
}

export interface CareerModel {
    experiences: ExperienceModel[]
    education: EducationModel[]
    certifications: CertificationModel[]
}
