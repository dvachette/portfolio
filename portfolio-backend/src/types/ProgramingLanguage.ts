export const programmingLanguages = [
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'C++',
    'PHP',
    'Kotlin',
    'Assembly',
    'C',
    'Vue',
    'React',
    'Angular',
    'Bash',
    'HTML/CSS',
    'SQL',
] as const;

export type ProgrammingLanguage = (typeof programmingLanguages)[number];
