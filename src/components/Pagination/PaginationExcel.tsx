import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

interface Props extends ReactPaginateProps {
  resetCurrentPage?: boolean;
  onGetPageCurrent: (pageCurrent: number) => void;
}

// eslint-disable-next-line max-lines-per-function
function Pagination(props: Props): JSX.Element {
  const onPaginationChange = (selectedItem: { selected: number }): void => {
    props.onGetPageCurrent(selectedItem.selected + 1);
  };

  return (
    <nav className="sipPagination">
      <div className="sipPaginationTotal"></div>
      <ReactPaginate
        containerClassName="pagination"
        previousClassName="sipPaginationPrev page-item"
        nextClassName="sipPaginationNext page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLabel={<img src={'../../assets/img/icon/iconBack.svg'} alt="VTPostek" />}
        nextLabel={<img src={'../../assets/img/icon/iconNext.svg'} alt="VTPostek" />}
        activeClassName="selected"
        breakClassName="page-item"
        onPageChange={onPaginationChange}
        {...props}
      />
    </nav>
  );
}

export default Pagination;
