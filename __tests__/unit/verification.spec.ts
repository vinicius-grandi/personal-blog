/**
 * @jest-environment node
 */
import verificationCodeRoute from '../../pages/api/verification-code';
import testClient from '../utils/test-client';
import connection from '../../lib/redis';

jest.mock('../../lib/rateLimit');

describe('/api/verification-code', () => {
  beforeEach(async () => {
    await connection.flushall();
  });
  it("uses nodemailer to send an email to blog's owner", async () => {
    const agent = testClient(verificationCodeRoute);
    const response = await agent.post('/verification-code').send({
      username: 'vinicius',
    });
    expect(response.body.message).toBe('verification code sent to email');

    const response2 = await agent.post('/verification-code').send({
      username: 'vinicius',
    });
    expect(response2.body.message).toBe('your code has already been sent!');
  });
  it('gets a code from the request body, if it exists, and then signs up a new user', async () => {
    const agent = testClient(verificationCodeRoute);
    const response = await agent.post('/verification-code').send({
      username: 'vinicius',
    });
    expect(response.body.message).toBe('verification code sent to email');

    const code = await connection.get('vinicius');

    const response2 = await agent.post('/verification-code').send({
      username: 'vinicius',
      code,
    });
    expect(response2.body.message).toBe('ok');
  });
  it('sends error when code is incorrect', async () => {
    const agent = testClient(verificationCodeRoute);
    const response = await agent.post('/verification-code').send({
      username: 'vinicius',
    });
    expect(response.body.message).toBe('verification code sent to email');

    const response2 = await agent.post('/verification-code').send({
      username: 'vinicius',
      code: '12321',
    });
    expect(response2.status).toBe(403);
  });
});
