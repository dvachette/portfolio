import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

function sha256(value: string): Buffer {
  return crypto.createHash('sha256').update(value).digest();
}

// Hash both sides so timingSafeEqual always compares equal-length buffers
const expectedDigest = config.adminApiToken ? sha256(config.adminApiToken) : null;

/**
 * Only lets through requests carrying `Authorization: Bearer <ADMIN_API_TOKEN>`.
 * The admin API is disabled (503) when no token is configured.
 */
export function requireAdminToken(req: Request, res: Response, next: NextFunction): void {
  if (!expectedDigest) {
    res.status(503).json({ error: 'Admin API is disabled: ADMIN_API_TOKEN is not configured.' });
    return;
  }

  const match = /^Bearer (\S+)$/.exec(req.get('authorization') ?? '');
  if (!match || !crypto.timingSafeEqual(sha256(match[1]!), expectedDigest)) {
    res.set('WWW-Authenticate', 'Bearer').status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
