const API_URL = import.meta.env.VITE_API_URL

export interface ContactPayload {
    name: string
    email: string
    message: string
}

export async function sendContactForm(payload: ContactPayload): Promise<void> {
    const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Unknown error')
    }
}
