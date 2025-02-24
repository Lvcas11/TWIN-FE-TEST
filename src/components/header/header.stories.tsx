import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const LightMode = Template.bind({});
LightMode.args = {
  isDarkMode: false,
  toggleDarkMode: (isDark) => console.log('Toggled to:', isDark),
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  isDarkMode: true,
  toggleDarkMode: (isDark) => console.log('Toggled to:', isDark),
};
