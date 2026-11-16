export const projectTypes = ['Personal', 'Academic'] as const;

export type ProjectType = (typeof projectTypes)[number];
