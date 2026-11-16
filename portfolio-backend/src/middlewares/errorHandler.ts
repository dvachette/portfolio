import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  // Errors raised by express.json() (malformed JSON, body too large…)
  if (typeof err === 'object' && err !== null && 'status' in err && typeof err.status === 'number' && err.status < 500) {
    res.status(err.status).json({ error: err instanceof Error ? err.message : 'Bad request' });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
