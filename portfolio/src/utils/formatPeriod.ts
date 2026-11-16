const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' })

function parse(date: string): Date {
    // Dates are ISO calendar dates (YYYY-MM-DD): parse them as local dates
    const [year, month, day] = date.split('-').map(Number)
    return new Date(year!, (month ?? 1) - 1, day ?? 1)
}

export function formatPeriod(startDate: string, endDate: string | null): string {
    const start = monthYear.format(parse(startDate))
    const end = endDate ? monthYear.format(parse(endDate)) : 'aujourd’hui'
    return start === end ? start : `${start} – ${end}`
}

export function formatDuration(startDate: string, endDate: string | null): string {
    const start = parse(startDate)
    const end = endDate ? parse(endDate) : new Date()
    const months =
        (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1
    if (months < 12) return `${months} mois`
    const years = Math.floor(months / 12)
    const rest = months % 12
    const yearLabel = `${years} an${years > 1 ? 's' : ''}`
    return rest ? `${yearLabel} ${rest} mois` : yearLabel
}
