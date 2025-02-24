import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Input from './input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password'],
    },
    required: {
      control: 'boolean',
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export const Text = Template.bind({});
Text.args = {
  label: 'Username',
  id: 'username',
  type: 'text',
  name: 'username',
  value: '',
  required: true,
  'data-testid': 'input-text',
};

export const Email = Template.bind({});
Email.args = {
  label: 'Email',
  id: 'email',
  type: 'email',
  name: 'email',
  value: '',
  required: true,
  'data-testid': 'input-email',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  id: 'password',
  type: 'password',
  name: 'password',
  value: '',
  required: true,
  'data-testid': 'input-password',
};

export const Number = Template.bind({});
Number.args = {
  label: 'Age',
  id: 'age',
  type: 'number',
  name: 'age',
  value: 0,
  required: false,
  'data-testid': 'input-number',
};
