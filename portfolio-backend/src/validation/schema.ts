import { ValidationError } from '../errors';

export type Field =
  | { type: 'string'; optional?: boolean; nullable?: boolean; enum?: readonly string[]; format?: 'date' }
  | { type: 'number'; optional?: boolean; integer?: boolean }
  | { type: 'string[]'; optional?: boolean; enum?: readonly string[] }
  | { type: 'object'; optional?: boolean; schema: Schema }
  | { type: 'object[]'; optional?: boolean; schema: Schema };

export type Schema = Record<string, Field>;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function checkString(value: unknown, field: Field & { type: 'string' | 'string[]' }, path: string): void {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(`${path} must be a non-empty string`);
  }
  if (field.enum && !field.enum.includes(value)) {
    throw new ValidationError(`${path} must be one of: ${field.enum.join(', ')}`);
  }
  if (field.type === 'string' && field.format === 'date' && (!DATE_PATTERN.test(value) || Number.isNaN(Date.parse(value)))) {
    throw new ValidationError(`${path} must be a date formatted as YYYY-MM-DD`);
  }
}

function checkField(value: unknown, field: Field, path: string): void {
  switch (field.type) {
    case 'string':
      if (value === null && field.nullable) return;
      checkString(value, field, path);
      return;
    case 'number':
      if (typeof value !== 'number' || !Number.isFinite(value) || (field.integer && !Number.isInteger(value))) {
        throw new ValidationError(`${path} must be a${field.integer ? 'n integer' : ' number'}`);
      }
      return;
    case 'string[]':
      if (!Array.isArray(value)) throw new ValidationError(`${path} must be an array of strings`);
      value.forEach((item, i) => checkString(item, field, `${path}[${i}]`));
      return;
    case 'object':
      validate(field.schema, value, path);
      return;
    case 'object[]':
      if (!Array.isArray(value)) throw new ValidationError(`${path} must be an array`);
      value.forEach((item, i) => validate(field.schema, item, `${path}[${i}]`));
      return;
  }
}

/**
 * Checks that `value` strictly matches `schema` (no unknown keys, required keys present, correct types)
 * and returns it typed as T. Throws a ValidationError otherwise.
 */
export function validate<T>(schema: Schema, value: unknown, path = 'body'): T {
  if (!isPlainObject(value)) throw new ValidationError(`${path} must be an object`);

  for (const key of Object.keys(value)) {
    if (!(key in schema)) throw new ValidationError(`${path}.${key} is not an allowed field`);
  }
  for (const [key, field] of Object.entries(schema)) {
    const fieldPath = `${path}.${key}`;
    if (value[key] === undefined) {
      if (!field.optional) throw new ValidationError(`${fieldPath} is required`);
      continue;
    }
    checkField(value[key], field, fieldPath);
  }
  return value as T;
}

export function assertObject(value: unknown, path = 'body'): Record<string, unknown> {
  if (!isPlainObject(value)) throw new ValidationError(`${path} must be an object`);
  return value;
}
