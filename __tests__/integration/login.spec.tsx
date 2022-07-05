import login from '../../pages/api/login';
import testClient from '../utils/test-client';

describe('/api/login', () => {
  it('should not login when credentials are wrong', async () => {
    const request = testClient(login);
    const response = await request.post('/login').send({
      username: 'jo',
      password: 'jo',
    });

    expect(response.status).toBe(403);
  });
});
