import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const homeIcon = screen.getByTitle('home');
    const searchIcon = screen.getByRole('search', { name: /search/i });

    expect(homeIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
});
