import { NextApiRequest, NextApiResponse } from 'next';
import type { Request, Response } from 'express';
import logger from 'jet-logger';
import getRateLimitMiddleware, { applyMiddleware } from '../../../lib/rateLimit';
import connection from '../../../lib/redis';
import sendMail from '../../../lib/sendMail';

const middleware = applyMiddleware(getRateLimitMiddleware({ limit: 1 }));

export default async function handler(
  req: NextApiRequest & Request,
  res: NextApiResponse & Response,
) {
  if (req.method === 'POST') {
    // rate limiter
    try {
      await middleware(req, res);
    } catch (err) {
      logger.err(err);
      return res.status(429).json({ message: 'Too many requests' });
    }
    const {
      body: { username },
    } = req;
    const verificationCode = Math.round(Math.random() * 10e5);

    await sendMail(verificationCode);
    await connection.set(username, String(verificationCode), 'EX', 60 * 10);

    return res.json({ message: 'verification code sent to email' });
  }
  return res.status(404).json({ message: "This route doesn't exist" });
}