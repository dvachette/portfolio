import { Router, Request, Response } from 'express';
import { readJSON } from '../data/readers';

export const uesRouter = Router();

uesRouter.get('/', async function (req: Request, res: Response): Promise<void> {
  res.json(await readJSON('skills.json'));
});

uesRouter.get('/:id', async function (req: Request, res: Response): Promise<void> {
  const skills = await readJSON<any[]>('skills.json');
  const skill = skills.flatMap(s => s.skills).find(sk => sk.id === req.params.id) ?? {
    id: 'not-found',
    name: 'Compétence non trouvée',
    description: "La compétence demandée n'a pas été trouvée.",
    level: 3,
    levels: [],
    details: [],
  };
  res.json(skill);
});