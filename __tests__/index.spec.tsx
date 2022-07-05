import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/index';

describe('Home', () => {
  afterAll(() => jest.clearAllMocks());
  it('renders home page', () => {
    render(<Home />);

    const homeIcon = screen.getByTitle('home');
    const searchIcon = screen.getByRole('button', { name: /search/i });
    const title = screen.getByText(/last posts/i);
    const themeToggleIcon = screen.getByTitle(/theme toggle/i);

    expect(homeIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(themeToggleIcon).toBeInTheDocument();
  });
  it('opens searchbox when search icon is clicked', async () => {
    render(<Home />);

    const searchIcon = screen.getByRole('search', { name: /search/i });

    await userEvent.click(searchIcon);
    const searchBox = await screen.findByRole('searchbox', {
      name: /searchbox/,
    });

    expect(searchBox).toBeInTheDocument();
  });
});
