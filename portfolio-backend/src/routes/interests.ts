import { Router, Request, Response } from 'express';
import { readJSON } from '../data/readers';
import { InterestModel } from '../models/InterestModel';

export const interestsRouter = Router();

interestsRouter.get('/', async function (req: Request, res: Response): Promise<void> {
  res.json(await readJSON<InterestModel[]>('interests.json'));
});
