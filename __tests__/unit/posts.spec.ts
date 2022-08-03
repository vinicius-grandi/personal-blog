/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-promise-executor-return */
import { createMocks } from 'node-mocks-http';
import FormData from 'form-data';
import posts from '../../pages/api/posts';
import send from '../../pages/api/code/send';
import signupRoute from '../../pages/api/signup';
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
    const { req, res }: any = createMocks({
      method: 'POST',
      body: { username: 'vinicius' },
    });
    await send(req, res);
    const code = await connection.get('vinicius');
    const formData = new FormData();
    formData.append('username', 'vinicius');
    formData.append('password', 'coolPassword');
    formData.append('code', code ?? '');
    const loginInfo: any = createMocks({
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });
    await signupRoute(loginInfo.req, loginInfo.res);
    console.log(code);
  });
});
