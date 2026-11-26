import type { SkillModel, SkillSectionModel } from '@/models/SkillModel'
import { apiGet, hasKeys, isArrayOf } from '@/services/api'

const isSkill = hasKeys<SkillModel>('id', 'name', 'level', 'levels')
const isSkillSectionList = isArrayOf(hasKeys<SkillSectionModel>('section', 'icon', 'skills'))

export function getSkillTab(): Promise<SkillSectionModel[]> {
    return apiGet('/skills', 'Erreur lors du chargement des compétences', isSkillSectionList)
}

export function getSkillById(id: string): Promise<SkillModel> {
    return apiGet(
        `/skills/${encodeURIComponent(id)}`,
        `Erreur lors du chargement de la compétence ${id}`,
        isSkill,
    )
}

export function useSkillsService() {
    return { getSkillTab, getSkillById }
}
