import type { UEDetailModel } from '@/models/UEDetailModel'
import type { UELevelModel } from '@/models/UELevelModel'
export interface UEModel {
    id: string
    name: string
    description: string
    level: number
    levels: UELevelModel[]
    details: UEDetailModel[]
}
