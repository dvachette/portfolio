import fs from 'fs/promises';
import path from 'path';
import { config } from '../config';

export async function readJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(path.join(config.dataDir, filename), 'utf-8');
  return JSON.parse(file) as T;
}