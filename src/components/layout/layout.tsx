import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

interface LayoutProps {
  children: React.ReactNode;
}

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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">{children}</main>
      <Footer columns={footerData} />
    </div>
  );
};

export default Layout;
