import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout from './layout';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('../header/header', () => ({
  default: ({ isDarkMode, toggleDarkMode }) => (
    <header data-testid="header">
      Mock Header - Dark Mode: {isDarkMode.toString()}
      <button
        data-testid="toggle-button"
        onClick={() => toggleDarkMode(!isDarkMode)}
      >
        Toggle
      </button>
    </header>
  ),
}));

vi.mock('../footer/footer', () => ({
  default: ({ columns }) => (
    <footer data-testid="footer">{JSON.stringify(columns)}</footer>
  ),
}));

describe('Layout Component', () => {
  const footerData = [
    {
      id: 'doc',
      title: 'Documentation',
      links: [
        { id: 'intro', label: 'Introduction', link: '/docs/introduction' },
        { id: 'app', label: 'Application', link: '/docs/application' },
        { id: 'quick-start', label: 'Quick Start', link: '/docs/quick-start' },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        {
          id: 'guidelines',
          label: 'Guidelines',
          link: '/resources/guidelines',
        },
        {
          id: 'community',
          label: 'Community Lookup',
          link: '/resources/community',
        },
      ],
    },
    {
      id: 'help',
      title: 'Help',
      links: [
        { id: 'faq', label: 'FAQ', link: '/help/faq' },
        { id: 'support', label: 'Support', link: '/help/support' },
      ],
    },
  ];

  it('renders without crashing', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
  });

  it('renders Header', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toHaveTextContent(
      JSON.stringify(footerData),
    );
  });

  it('renders children', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it("has min-h-screen and flex-col classes on the main div's parent", () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    const layoutDiv = screen.getByRole('main').parentNode;
    expect(layoutDiv).toHaveClass('min-h-screen');
    expect(layoutDiv).toHaveClass('flex-col');
  });

  it('has flex-grow class on main', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('flex-grow');
  });

  it('toggles dark mode when the toggle button is clicked', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const toggleButton = screen.getByTestId('toggle-button');
    expect(document.documentElement).not.toHaveClass('dark'); // Initial state: light mode

    fireEvent.click(toggleButton);
    expect(document.documentElement).toHaveClass('dark'); // After click: dark mode

    fireEvent.click(toggleButton);
    expect(document.documentElement).not.toHaveClass('dark'); // After another click: light mode
  });
});
