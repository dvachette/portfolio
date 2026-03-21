import type { CompetenceLevel } from '@/types/CompetenceLevel'

export interface CompetenceModel {
    id: string
    name: string
    description: string
    level: CompetenceLevel
}
