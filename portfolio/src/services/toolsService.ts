const API_URL = import.meta.env.VITE_API_URL

async function getToolsData(): Promise<{ [key: string]: { name: string, displayName: string }[] }> {
    const res = await fetch(`${API_URL}/tools`)
    if (!res.ok) throw new Error('Erreur lors du chargement des outils')
    const data = await res.json()
    return data
}

export function useToolsService() {
    return { getToolsData }
}