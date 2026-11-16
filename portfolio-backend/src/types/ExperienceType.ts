export const experienceTypes = ['job', 'internship', 'association'] as const;

export type ExperienceType = (typeof experienceTypes)[number];

export const workloads = ['full-time', 'part-time', 'volunteer'] as const;

export type Workload = (typeof workloads)[number];
