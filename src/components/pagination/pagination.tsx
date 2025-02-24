import React from 'react';
import arrow from '../../assets/arrow.svg';
import arrowDouble from '../../assets/arrow-double.svg';
import Button from '../button/button';

interface PaginationProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageIndex: number;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  gotoPage,
  previousPage,
  nextPage,
  hasPreviousPage,
  hasNextPage,
  pageIndex,
  pageCount,
}) => {
  return (
    <div className="flex justify-end items-center p-2">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => gotoPage(0)}
          disabled={!hasPreviousPage}
          variant="default"
        >
          <img src={arrowDouble} alt="First Page" className="w-4 h-4" />
        </Button>
        <Button
          onClick={previousPage}
          disabled={!hasPreviousPage}
          variant="default"
        >
          <img src={arrow} alt="Previous Page" className="w-4 h-4 -rotate-90" />
        </Button>
      </div>

      <span className="mr-4">
        Page {pageIndex + 1} of {pageCount}
      </span>

      <div className="flex items-center space-x-2">
        <Button onClick={nextPage} disabled={!hasNextPage} variant="default">
          <img src={arrow} alt="Next Page" className="w-4 h-4 rotate-90" />
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!hasNextPage}
          variant="default"
        >
          <img
            src={arrowDouble}
            alt="Last Page"
            className="w-4 h-4 rotate-180"
          />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
