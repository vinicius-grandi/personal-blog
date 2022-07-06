import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPage from '../pages/admin';

describe('Admin Page', () => {
  afterAll(() => {
    afterAll(() => jest.clearAllMocks());
  });
  it('renders a login form and log in when credentials are correct', async () => {
    render(<AdminPage />);
    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', {
      name: 'Send',
    });
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // typing values into inputs and submitting
    await userEvent.type(usernameInput, 'Vinicius');
    await userEvent.type(passwordInput, 'coolPassword');
    await userEvent.click(submitButton);

    // page reloads after successful login
    expect(window.location.reload).toHaveBeenCalled();
  });
});
