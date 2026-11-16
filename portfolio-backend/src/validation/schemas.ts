import { experienceTypes, workloads } from '../types/ExperienceType';
import { programmingLanguages } from '../types/ProgramingLanguage';
import { projectTypes } from '../types/ProjectType';
import { Schema } from './schema';

const id = { type: 'string' } as const;
const text = { type: 'string' } as const;
const optionalText = { type: 'string', optional: true } as const;
const strings = { type: 'string[]' } as const;
const date = { type: 'string', format: 'date' } as const;
const nullableDate = { type: 'string', format: 'date', nullable: true } as const;

const organization: Schema = {
  name: text,
  website: optionalText,
  location: text,
};

export const projectSchema: Schema = {
  id,
  projectType: { type: 'string', enum: projectTypes },
  title: text,
  description: text,
  image: text,
  liveDemoLink: optionalText,
  sourceCodeLink: optionalText,
  competences: strings,
  programmingLanguages: { type: 'string[]', enum: programmingLanguages },
};

export const experienceSchema: Schema = {
  id,
  type: { type: 'string', enum: experienceTypes },
  title: text,
  organization: { type: 'object', schema: organization },
  startDate: date,
  endDate: nullableDate,
  workload: { type: 'string', enum: workloads },
  highlights: strings,
  tags: strings,
};

export const educationSchema: Schema = {
  id,
  title: text,
  establishment: { type: 'object', schema: organization },
  startDate: date,
  endDate: nullableDate,
  description: optionalText,
  specialities: strings,
  options: strings,
};

export const certificationSchema: Schema = {
  id,
  name: text,
  context: optionalText,
  date: { type: 'string', format: 'date', optional: true },
};

export const interestSchema: Schema = {
  id,
  title: text,
  icon: text,
  description: text,
  tags: strings,
};

const skillDetail: Schema = {
  id,
  name: text,
};

const skillLevel: Schema = {
  level: { type: 'number', integer: true },
  levelName: text,
  description: text,
  details: { type: 'object[]', schema: skillDetail },
};

export const skillSchema: Schema = {
  id,
  name: text,
  image: text,
  description: text,
  level: { type: 'number', integer: true },
  details: { type: 'object[]', schema: skillDetail },
  levels: { type: 'object[]', schema: skillLevel },
};

export const sectionSchema: Schema = {
  section: text,
  icon: text,
  skills: { type: 'object[]', schema: skillSchema },
};
