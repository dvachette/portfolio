import { Request, Response, Router } from 'express';
import { readJSON } from '../../data/readers';
import { updateJSON } from '../../data/writers';
import { ConflictError, NotFoundError, ValidationError } from '../../errors';
import { ProjectReaderModel } from '../../models/ProjectReaderModel';
import { SkillModel } from '../../models/SkillModel';
import { SkillSectionReaderModel } from '../../models/SkillSectionReaderModel';
import { assertObject, validate } from '../../validation/schema';
import { sectionSchema, skillSchema } from '../../validation/schemas';
import { mergePatch, withId } from './collectionRouter';

const FILE = 'skills.json';

type Sections = SkillSectionReaderModel[];
type SectionParams = { section: string };
type SkillParams = { section: string; id: string };

// Sections have no id: they are addressed by their position in skills.json
function getSection(sections: Sections, rawIndex: string): SkillSectionReaderModel {
  const index = Number(rawIndex);
  if (!Number.isInteger(index) || index < 0) throw new ValidationError('Section index must be a non-negative integer');
  const section = sections[index];
  if (!section) throw new NotFoundError(`No section at index ${index}`);
  return section;
}

function findSkillIndex(section: SkillSectionReaderModel, id: string): number {
  const index = section.skills.findIndex((skill) => skill.id === id);
  if (index === -1) throw new NotFoundError(`No skill with id "${id}" in section "${section.section}"`);
  return index;
}

// Skill ids are looked up across all sections by the public API, so they must be globally unique
function assertUniqueSkillIds(sections: Sections): void {
  const seen = new Set<string>();
  for (const skill of sections.flatMap((s) => s.skills)) {
    if (seen.has(skill.id)) throw new ConflictError(`Skill id "${skill.id}" is used more than once`);
    seen.add(skill.id);
  }
}

// Refuse to delete skills still referenced by projects, otherwise they would show as "not found"
async function assertSkillsUnused(skillIds: string[]): Promise<void> {
  const projects = await readJSON<ProjectReaderModel[]>('projects.json');
  const users = projects.filter((p) => p.competences.some((id) => skillIds.includes(id)));
  if (users.length) {
    throw new ConflictError(`Skill(s) still used by project(s): ${users.map((p) => p.id).join(', ')}`);
  }
}

function withDefaultSkills(body: Record<string, unknown>): Record<string, unknown> {
  return { ...body, skills: body.skills ?? [] };
}

export const adminSkillsRouter = Router();

// --- Sections ---

adminSkillsRouter.get('/', async function (req: Request, res: Response): Promise<void> {
  res.json(await readJSON<Sections>(FILE));
});

adminSkillsRouter.post('/', async function (req: Request, res: Response): Promise<void> {
  const section = validate<SkillSectionReaderModel>(sectionSchema, withDefaultSkills(assertObject(req.body)));
  await updateJSON<Sections, void>(FILE, (sections) => {
    sections.push(section);
    assertUniqueSkillIds(sections);
  });
  res.status(201).json(section);
});

adminSkillsRouter.patch('/:section', async function (req: Request<SectionParams>, res: Response): Promise<void> {
  const patch = assertObject(req.body);
  if ('skills' in patch) throw new ValidationError('Use the /skills sub-routes to edit the skills of a section');
  const section = await updateJSON<Sections, SkillSectionReaderModel>(FILE, (sections) => {
    const current = getSection(sections, req.params.section);
    Object.assign(current, validate<SkillSectionReaderModel>(sectionSchema, mergePatch(current, patch, sectionSchema)));
    return current;
  });
  res.json(section);
});

adminSkillsRouter.delete('/:section', async function (req: Request<SectionParams>, res: Response): Promise<void> {
  const section = getSection(await readJSON<Sections>(FILE), req.params.section);
  await assertSkillsUnused(section.skills.map((s) => s.id));
  await updateJSON<Sections, void>(FILE, (sections) => {
    sections.splice(sections.indexOf(getSection(sections, req.params.section)), 1);
  });
  res.status(204).end();
});

// --- Skills inside a section ---

adminSkillsRouter.post('/:section/skills', async function (req: Request<SectionParams>, res: Response): Promise<void> {
  const skill = validate<SkillModel>(skillSchema, req.body);
  await updateJSON<Sections, void>(FILE, (sections) => {
    getSection(sections, req.params.section).skills.push(skill);
    assertUniqueSkillIds(sections);
  });
  res.status(201).json(skill);
});

adminSkillsRouter.put('/:section/skills/:id', async function (req: Request<SkillParams>, res: Response): Promise<void> {
  const skill = validate<SkillModel>(skillSchema, withId(req.params.id, assertObject(req.body)));
  await updateJSON<Sections, void>(FILE, (sections) => {
    const section = getSection(sections, req.params.section);
    section.skills[findSkillIndex(section, req.params.id)] = skill;
  });
  res.json(skill);
});

adminSkillsRouter.patch('/:section/skills/:id', async function (req: Request<SkillParams>, res: Response): Promise<void> {
  const patch = assertObject(req.body);
  const skill = await updateJSON<Sections, SkillModel>(FILE, (sections) => {
    const section = getSection(sections, req.params.section);
    const index = findSkillIndex(section, req.params.id);
    const updated = validate<SkillModel>(skillSchema, withId(req.params.id, mergePatch(section.skills[index]!, patch, skillSchema)));
    section.skills[index] = updated;
    return updated;
  });
  res.json(skill);
});

adminSkillsRouter.delete('/:section/skills/:id', async function (req: Request<SkillParams>, res: Response): Promise<void> {
  await assertSkillsUnused([req.params.id]);
  await updateJSON<Sections, void>(FILE, (sections) => {
    const section = getSection(sections, req.params.section);
    section.skills.splice(findSkillIndex(section, req.params.id), 1);
  });
  res.status(204).end();
});
