import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';
import { readJSON } from './readers';

// One promise chain per file: read-modify-write cycles never interleave
const locks = new Map<string, Promise<unknown>>();

function withFileLock<T>(filename: string, task: () => Promise<T>): Promise<T> {
  const previous = locks.get(filename) ?? Promise.resolve();
  const current = previous.catch(() => undefined).then(task);
  locks.set(filename, current);
  return current;
}

// Write to a temporary file then rename it, so readers never see a half-written file
async function writeJSONAtomic(filename: string, data: unknown): Promise<void> {
  const target = path.join(config.dataDir, filename);
  const tmp = `${target}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 4) + '\n', 'utf-8');
  await fs.rename(tmp, target);
}

/**
 * Reads `filename`, applies `mutate` and writes the result back, atomically and serialized per file.
 * Returns whatever `mutate` returns.
 */
export function updateJSON<T, R>(filename: string, mutate: (data: T) => R | Promise<R>): Promise<R> {
  return withFileLock(filename, async () => {
    const data = await readJSON<T>(filename);
    const result = await mutate(data);
    await writeJSONAtomic(filename, data);
    return result;
  });
}
