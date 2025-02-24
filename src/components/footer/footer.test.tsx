import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

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
      { id: 'guidelines', label: 'Guidelines', link: '/resources/guidelines' },
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

describe('Footer Component', () => {
  test('renders the footer correctly', () => {
    render(<Footer columns={footerData} />);

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    footerData.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });

    footerData.forEach((column) => {
      column.links.forEach((link) => {
        expect(screen.getByText(link.label)).toBeInTheDocument();
      });
    });
  });

  test('ensures all links have the correct href attributes', () => {
    render(<Footer columns={footerData} />);

    footerData.forEach((column) => {
      column.links.forEach((link) => {
        const linkElement = screen.getByText(link.label);
        expect(linkElement).toHaveAttribute('href', link.link);
      });
    });
  });

  test('copyright is visible', () => {
    render(<Footer columns={footerData} />);
    const copyrightElement = screen.getByText(
      '@2025 TWIN Foundation All Rights Reservered',
    );
    expect(copyrightElement).toBeVisible();
  });
});
