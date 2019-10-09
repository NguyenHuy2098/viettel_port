import React, { useState } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { useTranslation } from 'react-i18next';

interface Props extends ReactPaginateProps {
  onThisPaginationChange?: (selectedItem: { selected: number }) => void;
}

function Pagination(props: Props): JSX.Element {
  const { t } = useTranslation();
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    setPageCurrent(selectedItem.selected + 1);
    props.onThisPaginationChange && props.onThisPaginationChange(selectedItem);
  };

  return (
    <nav className="sipPagination">
      <div className="sipPaginationTotal">
        {t('Hiển thị')}
        <span>
          {pageCurrent}/{props.pageCount}
        </span>
      </div>
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
