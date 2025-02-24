import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';
import arrow from '../../assets/arrow.svg';
import arrowDouble from '../../assets/arrow-double.svg';

describe('Pagination Component', () => {
  const mockProps = {
    gotoPage: vi.fn(),
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    hasPreviousPage: true,
    hasNextPage: true,
    pageIndex: 0,
    pageCount: 5,
  };

  it('renders without crashing', () => {
    render(<Pagination {...mockProps} />);
  });

  it('calls gotoPage with 0 when first page button is clicked', () => {
    render(<Pagination {...mockProps} />);
    const firstPageButton = screen.getByRole('button', { name: /first page/i });
    fireEvent.click(firstPageButton);
    expect(mockProps.gotoPage).toHaveBeenCalledWith(0);
  });

  it('calls previousPage when previous page button is clicked', () => {
    render(<Pagination {...mockProps} />);
    const prevPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });
    fireEvent.click(prevPageButton);
    expect(mockProps.previousPage).toHaveBeenCalled();
  });

  it('calls nextPage when next page button is clicked', () => {
    render(<Pagination {...mockProps} />);
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageButton);
    expect(mockProps.nextPage).toHaveBeenCalled();
  });

  it('calls gotoPage with last page index when last page button is clicked', () => {
    render(<Pagination {...mockProps} />);
    const lastPageButton = screen.getByRole('button', { name: /last page/i });
    fireEvent.click(lastPageButton);
    expect(mockProps.gotoPage).toHaveBeenCalledWith(mockProps.pageCount - 1);
  });

  it('displays the correct page number and total pages', () => {
    render(<Pagination {...mockProps} />);
    const pageInfo = screen.getByText(
      `Page ${mockProps.pageIndex + 1} of ${mockProps.pageCount}`,
    );
    expect(pageInfo).toBeInTheDocument();
  });

  it('disables the previous/first page buttons when hasPreviousPage is false', () => {
    render(<Pagination {...{ ...mockProps, hasPreviousPage: false }} />);
    const firstPageButton = screen.getByRole('button', { name: /first page/i });
    const prevPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });
    expect(firstPageButton).toBeDisabled();
    expect(prevPageButton).toBeDisabled();
  });

  it('disables the next/last page buttons when hasNextPage is false', () => {
    render(<Pagination {...{ ...mockProps, hasNextPage: false }} />);
    const lastPageButton = screen.getByRole('button', { name: /last page/i });
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    expect(lastPageButton).toBeDisabled();
    expect(nextPageButton).toBeDisabled();
  });

  it('renders the arrow and double arrow images', () => {
    render(<Pagination {...mockProps} />);
    const arrowImage = screen.getAllByRole('img', {
      name: /previous page/i,
    })[0];
    const doubleArrowImage = screen.getAllByRole('img', {
      name: /first page/i,
    })[0];

    expect(arrowImage.src).toContain(arrow);
    expect(doubleArrowImage.src).toContain(arrowDouble);
  });
});
