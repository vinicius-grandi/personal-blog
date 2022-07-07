import Redis from 'ioredis';
import logger from 'jet-logger';

const connection = new Redis(process.env.REDIS_URI ?? '');

connection.on('error', (error) => {
  logger.err(error);
});

export default connection;
