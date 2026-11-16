import { Router } from 'express';
import { readJSON } from '../../data/readers';
import { ConflictError } from '../../errors';
import { CertificationModel } from '../../models/CertificationModel';
import { EducationModel } from '../../models/EducationModel';
import { ExperienceModel } from '../../models/ExperienceModel';
import { InterestModel } from '../../models/InterestModel';
import { ProjectReaderModel } from '../../models/ProjectReaderModel';
import { SkillSectionReaderModel } from '../../models/SkillSectionReaderModel';
import {
  certificationSchema,
  educationSchema,
  experienceSchema,
  interestSchema,
  projectSchema,
} from '../../validation/schemas';
import { collectionRouter } from './collectionRouter';
import { adminSkillsRouter } from './skills';

// Every route below is protected by requireAdminToken (mounted in index.ts)
export const adminRouter = Router();

adminRouter.use(
  '/projects',
  collectionRouter<ProjectReaderModel>('projects.json', projectSchema, {
    // A project must only reference existing skills
    beforeWrite: async (project) => {
      const sections = await readJSON<SkillSectionReaderModel[]>('skills.json');
      const known = new Set(sections.flatMap((s) => s.skills.map((sk) => sk.id)));
      const unknown = project.competences.filter((id) => !known.has(id));
      if (unknown.length) throw new ConflictError(`Unknown skill id(s): ${unknown.join(', ')}`);
    },
  }),
);
adminRouter.use('/skills', adminSkillsRouter);
adminRouter.use('/experiences', collectionRouter<ExperienceModel>('experiences.json', experienceSchema));
adminRouter.use('/education', collectionRouter<EducationModel>('formations.json', educationSchema));
adminRouter.use('/certifications', collectionRouter<CertificationModel>('certifications.json', certificationSchema));
adminRouter.use('/interests', collectionRouter<InterestModel>('interests.json', interestSchema));
