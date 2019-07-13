import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

function Paginations(props: ReactPaginateProps): JSX.Element {
  return (
    <nav className="sipPagination">
      <ReactPaginate
        containerClassName="pagination"
        previousClassName="sipPaginationPrev pull-left page-item"
        nextClassName="sipPaginationNext pull-right page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLabel={<i className="fa fa-arrow-left" />}
        nextLabel={<i className="fa fa-arrow-right" />}
        activeClassName="selected"
        breakClassName="page-item"
        {...props}
      />
    </nav>
  );
}

export default Paginations;
