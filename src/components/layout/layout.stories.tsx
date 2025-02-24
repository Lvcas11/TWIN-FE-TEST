import { Meta, StoryFn } from '@storybook/react';
import Layout from './layout';

export default {
  title: 'Components/Layout',
  component: Layout,
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args) => (
  <Layout {...args}>
    <div className="p-6 text-center text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">Welcome to the Layout</h1>
      <p className="mt-2">This is a sample content inside the layout.</p>
    </div>
  </Layout>
);

export const Default = Template.bind({});
Default.args = {};
