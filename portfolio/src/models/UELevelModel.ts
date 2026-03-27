import type { ApprentissageCritiqueModel } from '@/models/ApprentissageCritiqueModel'
export interface UELevelModel {
    level: number
    description: string
    apprentissagesCritiques: ApprentissageCritiqueModel[]
}
