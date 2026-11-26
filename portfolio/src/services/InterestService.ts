import type { InterestModel } from '@/models/InterestModel'
import { apiGet, hasKeys, isArrayOf } from '@/services/api'

const isInterestList = isArrayOf(hasKeys<InterestModel>('id', 'title', 'description', 'tags'))

export function getInterests(): Promise<InterestModel[]> {
    return apiGet('/interests', 'Erreur lors du chargement des centres d’intérêt', isInterestList)
}

export function useInterestService() {
    return { getInterests }
}
