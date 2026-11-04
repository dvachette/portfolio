import { Router, Request, Response } from 'express';
import { readJSON } from '../data/readers';
import { ProjectReaderModel } from '../models/ProjectReaderModel';
import { SkillSectionReaderModel } from '../models/SkillSectionReaderModel';
import { ProjectModel } from '../models/ProjectModel';


export const projectsRouter = Router();

async function resolveProjects(): Promise<ProjectModel[]> {
  const [projects, skills] = await Promise.all([
    readJSON<ProjectReaderModel[]>('projects.json'),
    readJSON<SkillSectionReaderModel[]>('skills.json'),
  ]);
  return projects.map((project) => ({
    ...project,
    competences: project.competences.map((id: string) =>
      skills.flatMap(s => s.skills).find(sk => sk.id === id) ?? {
        id: 'not-found',
        name: 'Compétence non trouvée',
        description: "La compétence demandée n'a pas été trouvée.",
        level: 3,
        levels: [],
        details: [],
        image: 'https://placehold.co/100x100'
      }
    ),
  }));
}

projectsRouter.get('/', async function (req: Request, res: Response): Promise<void> {
  res.json(await resolveProjects());
});

projectsRouter.get('/:id', async function (req: Request, res: Response): Promise<void> {
  const projects = await resolveProjects();
  const project = projects.find((p) => p.id === req.params.id) ?? {
    id: 'unknown',
    title: 'Projet non trouvé',
    description: "Le projet que vous cherchez n'existe pas ou a été supprimé.",
    image: 'notfound.png',
    competences: [],
    programmingLanguages: [],
    projectType: 'Personal',
  };
  res.json(project);
});

projectsRouter.get('/by-competence/:competenceId', async function (req: Request, res: Response): Promise<void> {
  const projects = await resolveProjects();
  res.json(projects.filter((p) =>
    p.competences.some((c: any) => c.id === req.params.competenceId)
  ));
});