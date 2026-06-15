export interface SkillModel {
    name: string
    id: string
    description: string
    level: number
    levels: SkillLevelModel[]

}

export interface SkillLevelModel {
    level: number
    description: string
    details: SkillDetailModel[]
}

export interface SkillDetailModel {
    id: string
    name: string
}
