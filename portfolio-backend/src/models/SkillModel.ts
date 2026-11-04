export interface SkillModel {
    name: string
    id: string
    description: string
    level: number
    levels: SkillLevelModel[]
    image: string
    details: SkillDetailModel[]

}

export interface SkillLevelModel {
    level: number
    description: string
    levelName: string
    details: SkillDetailModel[]
}

export interface SkillDetailModel {
    id: string
    name: string
}
