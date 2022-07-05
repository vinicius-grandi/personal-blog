import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPage from '../pages/admin';

describe('Admin Page', () => {
  const original = window.location;
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        reload: jest.fn(),
      },
    });
  });
  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    });
  });
  it('renders a login form and log in when credentials are correct', () => {
    render(<AdminPage />);
    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', {
      name: 'Send',
    });
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // typing values into inputs and submitting
    userEvent.type(usernameInput, 'Vinicius');
    userEvent.type(passwordInput, 'coolPassword');
    userEvent.click(submitButton);

    // page reloads after successful login
    expect(window.location.reload).toHaveBeenCalled();
  });
});
