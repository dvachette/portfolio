import type { CareerModel } from '@/models/CareerModel'
import { apiGet, hasKeys } from '@/services/api'

const isCareer = hasKeys<CareerModel>('experiences', 'education', 'certifications')

export function getCareer(): Promise<CareerModel> {
    return apiGet('/career', 'Erreur lors du chargement du parcours', isCareer)
}

export function useCareerService() {
    return { getCareer }
}
