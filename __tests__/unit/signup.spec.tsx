import { render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';
import SignupPage from '../../pages/signup';

describe('Sign Up Page', () => {
  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.doMockIf(/.*/, (req) => {
      if (req.url.endsWith('/code/send')) {
        return Promise.resolve(JSON.stringify({
          message: 'verification code sent to email',
        }));
      }
      if (req.url.endsWith('/code/verify')) {
        return Promise.resolve(JSON.stringify({
          message: 'ok',
        }));
      }
      return Promise.resolve(JSON.stringify({
        status: 200,
      }));
    });
  });
  afterAll(() => jest.clearAllMocks());
  it('renders username and password input. When the "continue" button is clicked, a new screen appears. There, you can request a verification code, which will be sent to blog\'s owner', async () => {
    render(<SignupPage />);
    const router = await import('next/router') as any;
    const useRouter = jest.spyOn(router, 'useRouter');
    const replace = jest.fn(() => Promise.resolve(true));
    useRouter.mockImplementation(() => ({
      replace,
    }));

    // getting elements
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const continueButton = screen.getByRole('button', {
      name: 'Continue',
    });

    // verifying if elements are on display
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    // typing values into inputs and, then, submitting
    await userEvent.type(usernameInput, 'Vinicius');
    await userEvent.type(passwordInput, 'coolPassword');
    await userEvent.click(continueButton);

    // sending verification code
    const verificationCodeButton = await screen.findByRole('button', {
      name: /send code/i,
    });

    await userEvent.click(verificationCodeButton);

    const statusMsg = await screen.findByText(/verification code sent to email/i);
    expect(statusMsg).toBeInTheDocument();

    const verificationCodeInput = screen.getByLabelText(/verification code/i);

    await userEvent.type(verificationCodeInput, 'secretCode');

    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(replace).toBeCalledTimes(1);
  });
});
