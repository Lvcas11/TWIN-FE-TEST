import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Table from './table';

vi.mock('../button/button', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <button data-testid="button">{children}</button>
  ),
}));

vi.mock('../pagination/pagination', () => ({
  default: ({
    gotoPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    pageIndex,
    pageCount,
  }: {
    gotoPage: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    pageIndex: number;
    pageCount: number;
  }) => (
    <div data-testid="pagination">
      <button
        onClick={() => gotoPage(0)}
        disabled={!hasPreviousPage}
        data-testid="first-page"
      >
        First
      </button>
      <button
        onClick={previousPage}
        disabled={!hasPreviousPage}
        data-testid="prev-page"
      >
        Prev
      </button>
      <span>
        {pageIndex + 1} of {pageCount}
      </span>
      <button
        onClick={nextPage}
        disabled={!hasNextPage}
        data-testid="next-page"
      >
        Next
      </button>
      <button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!hasNextPage}
        data-testid="last-page"
      >
        Last
      </button>
    </div>
  ),
}));

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe('Table Component', () => {
  const mockColumns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'item', header: 'Item' },
    { accessorKey: 'creationDate', header: 'Creation Date' },
    { accessorKey: 'action', header: 'Action' },
  ];

  const mockData = [
    { id: 1, item: 'Item 1', creationDate: '2024-01-01', action: 'view' },
    { id: 2, item: 'Item 2', creationDate: '2024-01-02', action: 'view' },
    { id: 3, item: 'Item 3', creationDate: '2024-01-03', action: 'view' },
  ];

  const mockData2 = [
    { id: 1, item: 'Item 1', creationDate: '2024-01-01', action: 'view' },
    { id: 2, item: 'Item 2', creationDate: '2024-01-02', action: 'view' },
    { id: 3, item: 'Item 3', creationDate: '2024-01-03', action: 'view' },
    { id: 4, item: 'Item 4', creationDate: '2024-01-04', action: 'view' },
    { id: 5, item: 'Item 5', creationDate: '2024-01-05', action: 'view' },
    { id: 6, item: 'Item 6', creationDate: '2024-01-06', action: 'view' },
    { id: 7, item: 'Item 7', creationDate: '2024-01-07', action: 'view' },
    { id: 8, item: 'Item 8', creationDate: '2024-01-08', action: 'view' },
    { id: 9, item: 'Item 9', creationDate: '2024-01-09', action: 'view' },
    { id: 10, item: 'Item 10', creationDate: '2024-01-10', action: 'view' },
    { id: 11, item: 'Item 11', creationDate: '2024-01-11', action: 'view' },
    { id: 12, item: 'Item 12', creationDate: '2024-01-12', action: 'view' },
    { id: 13, item: 'Item 13', creationDate: '2024-01-13', action: 'view' },
    { id: 14, item: 'Item 14', creationDate: '2024-01-14', action: 'view' },
    { id: 15, item: 'Item 15', creationDate: '2024-01-15', action: 'view' },
    { id: 16, item: 'Item 16', creationDate: '2024-01-16', action: 'view' },
    { id: 17, item: 'Item 17', creationDate: '2024-01-17', action: 'view' },
    { id: 18, item: 'Item 18', creationDate: '2024-01-18', action: 'view' },
    { id: 19, item: 'Item 19', creationDate: '2024-01-19', action: 'view' },
    { id: 20, item: 'Item 20', creationDate: '2024-01-20', action: 'view' },
    { id: 21, item: 'Item 21', creationDate: '2024-01-21', action: 'view' },
    { id: 22, item: 'Item 22', creationDate: '2024-01-22', action: 'view' },
  ];

  it('renders without crashing', () => {
    render(<Table columns={mockColumns} data={mockData} />);
  });

  it('renders pagination when there is more than one page', () => {
    render(<Table columns={mockColumns} data={mockData2} />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('sorts the table when a header is clicked', () => {
    render(<Table columns={mockColumns} data={mockData} />);
    const header = screen.getByText('Item');
    fireEvent.click(header);
  });
});
