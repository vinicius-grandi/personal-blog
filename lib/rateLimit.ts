import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import type { Request, Response } from 'express';

const getIP = (request: Request) => {
  const ip = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.socket.remoteAddress;
  if (!ip) {
    return 'null';
  }
  if (Array.isArray(ip)) {
    return ip[0];
  }
  return ip;
};

const getRateLimitMiddleware = ({
  limit = 10,
  windowMs = 60 * 1000,
} = {}) => rateLimit({ keyGenerator: getIP, windowMs, max: limit });

export const applyMiddleware = (
  middleware: RateLimitRequestHandler,
) => (
  request: Request,
  response: Response,
) => new Promise((resolve, reject) => {
  middleware(request, response, (result) => (
    result instanceof Error ? reject(result) : resolve(result)
  ));
});

export default getRateLimitMiddleware;
