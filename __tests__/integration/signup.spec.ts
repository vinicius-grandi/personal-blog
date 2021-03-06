import connection from '../../lib/redis';
import send from '../../pages/api/code/send';
import signupRoute from '../../pages/api/signup';
import testClient from '../utils/test-client';
import db from '../../db/models';
import truncateTables from '../utils/truncateTables';

const { User } = db;

describe('/api/signup', () => {
  beforeEach(async () => {
    await connection.flushall();
    await truncateTables();
  });
  it("signs up a new user using the website owner's email for confirmation code", async () => {
    await testClient(send).post('/code/send').send({ username: 'vinicius' });
    const code = await connection.get('vinicius');
    const request = testClient(signupRoute);
    await request.post('/signup').send({
      username: 'vinicius',
      password: 'coolPassword',
      code,
    });
    const user = await User.findOne({
      where: {
        username: 'vinicius',
      },
    });
    expect(user.username).toBe('vinicius');
  });
  it('should return an error when user makes a bad request', async () => {
    await testClient(send).post('/code/send').send({ username: 'vinicius' });
    const request = testClient(signupRoute);
    const response = await request.post('/signup').send({
      username: 'vinicius',
      password: 'coolPassword',
    });
    expect(response.status).toBe(400);
  });
});
