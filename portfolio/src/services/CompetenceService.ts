import type { CompetenceModel } from '@/models/CompetenceModel'
import type { ProjectModel } from '@/models/ProjectModel'
import data from '@/data/competences.json'

const competences = data as CompetenceModel[]
function getCompetencesTab(): CompetenceModel[] {
    return competences
}

function getCompetenceById(id: string): CompetenceModel {
    let ret = competences.find((competence) => competence.id === id)
    if (!ret) {
        ret = {
            id: 'not-found',
            name: 'Compétence non trouvée',
            description: "La compétence demandée n'a pas été trouvée.",
            level: 'acquiring',
        }
    }
    return ret
}

export function useCompetenceService() {
    return {
        getCompetencesTab,
        getCompetenceById,
    }
}
