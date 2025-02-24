import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

describe('Header Component', () => {
  test('renders the header correctly', () => {
    render(
      <MemoryRouter>
        <Header isDarkMode={false} toggleDarkMode={vi.fn()} />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const lightModeButton = screen.getByRole('button', { name: /light mode/i });
    expect(lightModeButton).toBeInTheDocument();

    const darkModeButton = screen.getByRole('button', { name: /dark mode/i });
    expect(darkModeButton).toBeInTheDocument();
  });

  test('calls toggleDarkMode with false when light mode button is clicked', () => {
    const mockToggleDarkMode = vi.fn();
    render(
      <MemoryRouter>
        <Header isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
      </MemoryRouter>,
    );

    const lightModeButton = screen.getByRole('button', { name: /light mode/i });
    fireEvent.click(lightModeButton);

    expect(mockToggleDarkMode).toHaveBeenCalledWith(false);
  });

  test('calls toggleDarkMode with true when dark mode button is clicked', () => {
    const mockToggleDarkMode = vi.fn();
    render(
      <MemoryRouter>
        <Header isDarkMode={true} toggleDarkMode={mockToggleDarkMode} />
      </MemoryRouter>,
    );

    const darkModeButton = screen.getByRole('button', { name: /dark mode/i });
    fireEvent.click(darkModeButton);

    expect(mockToggleDarkMode).toHaveBeenCalledWith(true);
  });

  test('logo has the correct link to "/"', () => {
    render(
      <MemoryRouter>
        <Header isDarkMode={false} toggleDarkMode={vi.fn()} />
      </MemoryRouter>,
    );

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
