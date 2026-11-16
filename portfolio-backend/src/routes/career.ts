import { Router, Request, Response } from 'express';
import { readJSON } from '../data/readers';
import { CareerModel } from '../models/CareerModel';
import { CertificationModel } from '../models/CertificationModel';
import { EducationModel } from '../models/EducationModel';
import { ExperienceModel } from '../models/ExperienceModel';

export const careerRouter = Router();

// Most recent first; ongoing entries (no end date) come before finished ones
function byMostRecent(a: { startDate: string, endDate: string | null }, b: { startDate: string, endDate: string | null }): number {
  const endA = a.endDate ?? '9999-12-31';
  const endB = b.endDate ?? '9999-12-31';
  return endB.localeCompare(endA) || b.startDate.localeCompare(a.startDate);
}

careerRouter.get('/', async function (req: Request, res: Response): Promise<void> {
  const [experiences, education, certifications] = await Promise.all([
    readJSON<ExperienceModel[]>('experiences.json'),
    readJSON<EducationModel[]>('formations.json'),
    readJSON<CertificationModel[]>('certifications.json'),
  ]);
  const career: CareerModel = {
    experiences: experiences.sort(byMostRecent),
    education: education.sort(byMostRecent),
    certifications,
  };
  res.json(career);
});
