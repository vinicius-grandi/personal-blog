import { NextApiRequest, NextApiResponse } from 'next';
import type { Request, Response } from 'express';
import getRateLimitMiddleware, { applyMiddleware } from '../../lib/rateLimit';
import connection from '../../lib/redis';
import sendMail from '../../lib/sendMail';

const middleware = applyMiddleware(getRateLimitMiddleware());

export default async function handler(
  req: NextApiRequest & Request,
  res: NextApiResponse & Response,
) {
  const {
    body: { username, code },
  } = req;
  
  if (req.method === 'POST') {
    // rate limiter
    try {
      await middleware(req, res);
    } catch (err) {
      console.error(err);
      return res.status(429).json({ message: 'Too many requets' });
    }

    const userCode = await connection.get(username);

    if (userCode && !code) {
      return res.json({ message: 'your code has already been sent!' });
    }
    if (code === userCode) {
      return res.json({ message: 'ok' });
    }
    if (code) {
      return res.status(403).json({
        message: 'your code is incorrect!',
      });
    }
    const verificationCode = Math.round(Math.random() * 10e5);

    await sendMail(verificationCode);
    await connection.set(username, verificationCode, 'EX', 60 * 10);

    return res.json({ message: 'verification code sent to email' });
  }
  return res.status(404).json({ message: "This route doesn't exist" });
}
