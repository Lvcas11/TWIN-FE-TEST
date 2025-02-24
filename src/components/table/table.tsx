import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import Button from '../button/button';
import Pagination from '../pagination/pagination';
import { SupplyChainItem } from '../../api/supplyChainService';

type TableProps = {
  columns: ColumnDef<SupplyChainItem>[];
  data: SupplyChainItem[];
};

/**
 * Props for the Table component.
 * @param {ColumnDef<SupplyChainItem>[]} columns - The column definitions for the table.
 * @param {SupplyChainItem[]} data - The data to be displayed in the table.
 */

const availableTableActions = {
  view: 'view',
  // delete: 'delete', // TODO: for a future implementation
  // edit: 'edit' // TODO: for a future implementation
} as const;

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const showPagination = table.getPageCount() > 1;

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full table-auto border-collapse dark:bg-gray-800 dark:text-white"
        aria-label="Table"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-gray-300 bg-gray-300 dark:bg-gray-700 dark:border-gray-600"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer p-2 text-left font-semibold dark:text-gray-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === 'asc' && (
                    <img
                      src={arrow}
                      alt="Sort Ascending"
                      className="inline-block w-7 h-7 ml-1"
                      aria-hidden={true}
                    />
                  )}
                  {header.column.getIsSorted() === 'desc' && (
                    <img
                      src={arrow}
                      alt="Sort Descending"
                      className="inline-block w-7 h-7 ml-1 rotate-180"
                      aria-hidden={true}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 dark:text-gray-200">
                    {cell.column.id === 'action' ? (
                      row.original.action === availableTableActions.view ? (
                        <Button
                          onClick={() => navigate(`/edit/${row.original.id}`)}
                        >
                          <span className="text-white">View</span>
                        </Button>
                      ) : null
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPagination && (
        <Pagination
          gotoPage={table.gotoPage}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          hasPreviousPage={table.canPreviousPage}
          hasNextPage={table.canNextPage}
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={table.getPageCount()}
        />
      )}
    </div>
  );
};

export default Table;
