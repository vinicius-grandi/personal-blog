import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupPage from '../../pages/signup';

describe('Sign Up Page', () => {
  afterAll(() => jest.clearAllMocks());
  it('renders username and password input. When the "continue" button is clicked, a new screen appears. There, you can request a verification code, which will be sent to blog\'s owner', async () => {
    render(<SignupPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const continueButton = screen.getByRole('button', {
      name: 'Continue',
    });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    // typing values into inputs and submitting
    await userEvent.type(usernameInput, 'Vinicius');
    await userEvent.type(passwordInput, 'coolPassword');

    await userEvent.click(continueButton);

    const verificationCodeButton = await screen.findByRole('button', {
      name: /send code/i,
    });

    await userEvent.click(verificationCodeButton);

    const statusMsg = await screen.findByText(/verification code sent to email/i);
    expect(statusMsg).toBeInTheDocument();

    const verificationCodeInput = screen.getByLabelText('verification code');

    await userEvent.type(verificationCodeInput, 'secretCode');

    await userEvent.click(continueButton);
    expect(window).toBeCalledTimes(1);
  });
});
