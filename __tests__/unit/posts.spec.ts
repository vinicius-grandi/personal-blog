/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-promise-executor-return */
import posts from '../../pages/api/posts';
import send from '../../pages/api/code/send';
import signupRoute from '../../pages/api/signup';
import testClient from '../utils/test-client';
import connection from '../../lib/redis';
import truncateTables from '../utils/truncateTables';

describe('/api/code/verify', () => {
  beforeEach(async () => {
    await truncateTables();
    await connection.flushall();
  });
  afterAll(async () => {
    await new Promise<void>((resolve) => {
      connection.quit(() => {
        resolve();
      });
    });
    await new Promise((resolve) => setImmediate(resolve));
  });
  it('gets a code from the request body, if it exists, and then signs up a new user', async () => {
    const agent = testClient(send);
    await agent.post('/code/send').send({ username: 'vinicius' });
    const code = await connection.get('vinicius');
    const request = testClient(signupRoute);
    const formdata = new FormData();
    formdata.set('username', 'vinicius');
    formdata.set('password', 'coolPassword');
    formdata.set('code', code ?? '');
    const resp = await request.post('/signup').send(formdata);
    const response = await testClient(posts).post('/posts');
    expect(response.text).toBe('ok');
  });
});
