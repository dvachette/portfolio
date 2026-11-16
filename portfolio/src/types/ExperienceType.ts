export type ExperienceType = 'job' | 'internship' | 'association'

export type Workload = 'full-time' | 'part-time' | 'volunteer'

export const workloadLabels: Record<Workload, string> = {
    'full-time': 'Temps plein',
    'part-time': 'Mi-temps',
    volunteer: 'Bénévolat',
}
