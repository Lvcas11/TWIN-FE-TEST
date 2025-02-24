import { Meta, StoryFn } from '@storybook/react';
import Pagination from './pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => <Pagination {...args} />;

export const FirstPage = Template.bind({});
FirstPage.args = {
  gotoPage: (page) => console.log('Go to page:', page),
  previousPage: () => console.log('Previous page'),
  nextPage: () => console.log('Next page'),
  hasPreviousPage: false,
  hasNextPage: true,
  pageIndex: 0,
  pageCount: 10,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  gotoPage: (page) => console.log('Go to page:', page),
  previousPage: () => console.log('Previous page'),
  nextPage: () => console.log('Next page'),
  hasPreviousPage: true,
  hasNextPage: true,
  pageIndex: 5,
  pageCount: 10,
};

export const LastPage = Template.bind({});
LastPage.args = {
  gotoPage: (page) => console.log('Go to page:', page),
  previousPage: () => console.log('Previous page'),
  nextPage: () => console.log('Next page'),
  hasPreviousPage: true,
  hasNextPage: false,
  pageIndex: 9,
  pageCount: 10,
};
