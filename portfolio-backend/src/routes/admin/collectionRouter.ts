import { Request, Response, Router } from 'express';
import { readJSON } from '../../data/readers';
import { updateJSON } from '../../data/writers';
import { ConflictError, NotFoundError } from '../../errors';
import { assertObject, Schema, validate } from '../../validation/schema';

export interface CollectionOptions<T> {
  /** Extra checks run before an item is created or updated; throw an HttpError to refuse the write. */
  beforeWrite?: (item: T) => Promise<void>;
}

/**
 * Applies a partial update: `null` on an optional, non-nullable field removes it.
 * The id always comes from the URL.
 */
export function mergePatch<T extends object>(current: T, patch: Record<string, unknown>, schema: Schema): T {
  const merged: Record<string, unknown> = { ...current, ...patch };
  for (const [key, value] of Object.entries(patch)) {
    const field = schema[key];
    if (value === null && field?.optional && !(field.type === 'string' && field.nullable)) {
      delete merged[key];
    }
  }
  return merged as T;
}

/** Forces the id from the URL, keeping it as the first key so the JSON files stay readable. */
export function withId<T extends object>(id: string, item: T): T & { id: string } {
  return Object.assign({ id }, item, { id });
}

/**
 * CRUD router over a JSON file holding an array of items identified by `id`:
 *   GET /, GET /:id, POST /, PUT /:id (full replace), PATCH /:id (partial update), DELETE /:id
 */
export function collectionRouter<T extends { id: string }>(
  filename: string,
  schema: Schema,
  options: CollectionOptions<T> = {},
): Router {
  const router = Router();
  const label = filename.replace(/\.json$/, '');
  const beforeWrite = options.beforeWrite ?? (async () => undefined);

  function findIndex(items: T[], id: string): number {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundError(`No item with id "${id}" in ${label}`);
    return index;
  }

  router.get('/', async function (req: Request, res: Response): Promise<void> {
    res.json(await readJSON<T[]>(filename));
  });

  router.get('/:id', async function (req: Request<{ id: string }>, res: Response): Promise<void> {
    const items = await readJSON<T[]>(filename);
    res.json(items[findIndex(items, req.params.id)]);
  });

  router.post('/', async function (req: Request, res: Response): Promise<void> {
    const item = validate<T>(schema, req.body);
    await updateJSON<T[], void>(filename, async (items) => {
      await beforeWrite(item);
      if (items.some((existing) => existing.id === item.id)) {
        throw new ConflictError(`An item with id "${item.id}" already exists in ${label}`);
      }
      items.push(item);
    });
    res.status(201).json(item);
  });

  router.put('/:id', async function (req: Request<{ id: string }>, res: Response): Promise<void> {
    const item = validate<T>(schema, withId(req.params.id, assertObject(req.body)));
    await updateJSON<T[], void>(filename, async (items) => {
      const index = findIndex(items, req.params.id);
      await beforeWrite(item);
      items[index] = item;
    });
    res.json(item);
  });

  router.patch('/:id', async function (req: Request<{ id: string }>, res: Response): Promise<void> {
    const patch = assertObject(req.body);
    const item = await updateJSON<T[], T>(filename, async (items) => {
      const index = findIndex(items, req.params.id);
      const updated = validate<T>(schema, withId(req.params.id, mergePatch(items[index]!, patch, schema)));
      await beforeWrite(updated);
      items[index] = updated;
      return updated;
    });
    res.json(item);
  });

  router.delete('/:id', async function (req: Request<{ id: string }>, res: Response): Promise<void> {
    await updateJSON<T[], void>(filename, (items) => {
      items.splice(findIndex(items, req.params.id), 1);
    });
    res.status(204).end();
  });

  return router;
}
