import signupRoute from '../../pages/api/signup';
import testClient from '../utils/test-client';

describe('/api/signup', () => {
  it("signs up a new user using the website owner's email for confirmation code", async () => {
    const request = testClient(signupRoute);
    const response = await request.post('/signup').send({
      username: 'Vinicius',
      password: 'coolPassword',
    });
    expect(response.status).toBe(200);
  });
});
