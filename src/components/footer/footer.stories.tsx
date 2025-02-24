import { Meta, StoryFn } from '@storybook/react';
import Footer from './footer';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta<typeof Footer>;

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

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: footerData,
};
