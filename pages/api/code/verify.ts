import { NextApiRequest, NextApiResponse } from 'next';
import type { Request, Response } from 'express';
import getRateLimitMiddleware, { applyMiddleware } from '../../../lib/rateLimit';
import connection from '../../../lib/redis';

const middleware = applyMiddleware(getRateLimitMiddleware());

export default async function handler(
  req: NextApiRequest & Request,
  res: NextApiResponse & Response,
) {
  if (req.method === 'POST') {
    // rate limiter
    try {
      await middleware(req, res);
    } catch {
      return res.status(429).json({ message: 'Too many requests' });
    }
    const {
      body: { username, code },
    } = req;

    const userCode = await connection.get(username);

    if (userCode && !code) {
      return res.json({ message: 'your code has already been sent!' });
    }
    if (code !== userCode) {
      return res.status(403).json({
        message: 'your code is incorrect!',
      });
    }
    return res.json({ message: 'ok' });
  }
  return res.status(404).json({ message: "This route doesn't exist" });
}
