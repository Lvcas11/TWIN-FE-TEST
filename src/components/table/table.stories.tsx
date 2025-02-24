import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Table from './table';
import { ColumnDef } from '@tanstack/react-table';
import { BrowserRouter } from 'react-router-dom';
import { SupplyChainItem } from '../../api/supplyChainService';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Table>;

const mockColumns: ColumnDef<SupplyChainItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: () => <button>View</button>,
  },
];

const mockData: SupplyChainItem[] = [
  { id: '1', name: 'Item 1', category: 'Category A', action: 'view' },
  { id: '2', name: 'Item 2', category: 'Category B', action: 'view' },
];

export const Default: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    columns: mockColumns,
    data: [],
  },
};
