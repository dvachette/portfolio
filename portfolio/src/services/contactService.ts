import { isObject } from '@/services/api'

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
        const data: unknown = await response.json().catch(() => null)
        const message =
            isObject(data) && typeof data.error === 'string'
                ? data.error
                : "Le message n'a pas pu être envoyé. Réessayez plus tard."
        throw new Error(message)
    }
}
