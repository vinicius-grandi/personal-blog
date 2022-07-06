import verificationCodeRoute from '../../pages/api/verification-code';
import testClient from '../utils/test-client';
import connection from '../../lib/redis';
import '../../db/models';

describe('/api/verification-code', () => {
  beforeAll(async () => {
    await connection.flushall();
  });
  it("uses nodemailer to send an email to blog's owner", async () => {
    const agent = testClient(verificationCodeRoute);
    const response = await agent.post('/verification-code');
    expect(response.body.message).toBe('verification code sent to email');

    const response2 = await agent.post('/verification-code');
    expect(response2.body.message).toBe('your code has already been sent!');
  });
});
