import type { UEModel } from '@/models/UEModel'
import type { ProjectModel } from '@/models/ProjectModel'
import data from '@/data/UEs.json'

const competences = data as UEModel[]

function getUEsTab(): UEModel[] {
    return competences
}

function getUEById(id: string): UEModel {
    let ret = competences.find((competence) => competence.id === id)
    if (!ret) {
        ret = {
            id: 'not-found',
            name: 'Compétence non trouvée',
            description: "La compétence demandée n'a pas été trouvée.",
            level: 3,
            levels: [],
            details: [],
        }
    }
    return ret
}

export function useUEService() {
    return {
        getUEsTab,
        getUEById,
    }
}
