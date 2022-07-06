import verificationCodeRoute from '../../pages/api/verification-code';
import testClient from '../utils/test-client';

describe('/api/verification-code', () => {
  it("uses nodemailer to send an email to blog's owner", async () => {
    const response = await testClient(verificationCodeRoute).get('/verification-code');
    expect(response.body).toBe('verification code sent to email');
  });
});
