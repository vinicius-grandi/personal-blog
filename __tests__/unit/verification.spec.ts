import send from '../../pages/api/code/send';
import verify from '../../pages/api/code/verify';
import testClient from '../utils/test-client';
import connection from '../../lib/redis';

jest.mock('../../lib/rateLimit');

describe('/api/code/verify', () => {
  beforeEach(async () => {
    await connection.flushall();
  });
  it('gets a code from the request body, if it exists, and then signs up a new user', async () => {
    await testClient(send).post('/code/send').send({ username: 'vinicius' });
    const code = await connection.get('vinicius');
    const response = await testClient(verify).post('/code/verify').send({
      username: 'vinicius',
      code,
    });
    expect(response.body.message).toBe('ok');
  });
  it('sends error when code is incorrect', async () => {
    await testClient(send).post('/code/send').send({ username: 'vinicius' });
    const response = await testClient(verify).post('/code/verify').send({
      username: 'vinicius',
      code: '123',
    });
    expect(response.status).toBe(403);
  });
  it('has a rate limit in send route', async () => {
    const agent = testClient(send);
    await agent.post('/code/send').send({ username: 'vinicius' });
    const response = await agent.post('/code/send').send({ username: 'vinicius' });
    expect(response.text).toBe('Too many requests, please try again later.');
  });
});
