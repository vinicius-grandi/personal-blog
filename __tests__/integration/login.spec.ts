import connection from '../../lib/redis';
import send from '../../pages/api/code/send';
import login from '../../pages/api/login';
import signupRoute from '../../pages/api/signup';
import testClient from '../utils/test-client';

describe('/api/login', () => {
  it('logins when credentials are correct', async () => {
    await testClient(send).post('/code/send').send({ username: 'vinicius' });
    const code = await connection.get('vinicius');
    const request = testClient(signupRoute);
    await request.post('/signup').send({
      username: 'vinicius',
      password: 'coolPassword',
      code,
    });
    const response = await testClient(login).post('/login').send({
      username: 'vinicius',
      password: 'coolPassword',
    });

    expect(response.body.username).toBe('vinicius');
  });
  it('should not login when credentials are wrong', async () => {
    const request = testClient(login);
    const response = await request.post('/login').send({
      username: 'jo',
      password: 'jo',
    });

    expect(response.status).toBe(403);
  });
});
