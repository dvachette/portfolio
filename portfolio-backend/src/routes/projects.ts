import { Router, Request, Response } from 'express';
import { readJSON } from '../data/readers';

export const projectsRouter = Router();

async function resolveProjects(): Promise<any[]> {
  const [projects, ues] = await Promise.all([
    readJSON<any[]>('projects.json'),
    readJSON<any[]>('UEs.json'),
  ]);
  return projects.map((project) => ({
    ...project,
    competences: project.competences.map((id: string) =>
      ues.find((u) => u.id === id) ?? {
        id: 'not-found',
        name: 'Compétence non trouvée',
        description: "La compétence demandée n'a pas été trouvée.",
        level: 3,
        levels: [],
        details: [],
      }
    ),
  }));
}

projectsRouter.get('/', async function(req: Request, res: Response): Promise<void> {
  res.json(await resolveProjects());
});

projectsRouter.get('/:id', async function(req: Request, res: Response): Promise<void> {
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

projectsRouter.get('/by-competence/:competenceId', async function(req: Request, res: Response): Promise<void> {
  const projects = await resolveProjects();
  res.json(projects.filter((p) =>
    p.competences.some((c: any) => c.id === req.params.competenceId)
  ));
});