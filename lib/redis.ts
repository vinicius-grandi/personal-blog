import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URI ?? '');

connection.on('connection', (error) => {
  console.log('sucesso', error);
});

connection.on('error', (error) => {
  console.error(error);
});

export default connection;
