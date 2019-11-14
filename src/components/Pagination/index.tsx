import React, { useState } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { FormGroup, CustomInput, Label, Col, Row } from 'reactstrap';
import { toNumber } from 'lodash';
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import { generatePath } from 'react-router';
import replaceUrlParam from 'utils/replaceUrlParam';
import { getPageItems } from 'utils/common';

interface Props extends ReactPaginateProps {
  onThisPaginationChange?: (selectedItem: { selected: number }) => void;
  resetCurrentPage?: boolean;
}

// eslint-disable-next-line max-lines-per-function
function Pagination(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  React.useEffect(() => {
    setPageCurrent(1);
  }, [props.resetCurrentPage]);

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    setPageCurrent(selectedItem.selected + 1);
    props.onThisPaginationChange && props.onThisPaginationChange(selectedItem);
  };

  const _pageItems = getPageItems();

  const [pageItems, setPageItems] = useState<number>(() => toNumber(getPageItems()));
  function handleChangePageItems(e: React.ChangeEvent<HTMLInputElement>): void {
    setPageItems(toNumber(e.currentTarget.value));
    const url = replaceUrlParam(window.location.pathname + window.location.search, {
      pageitems: e.currentTarget.value,
    });
    dispatch(replace(generatePath(url)));
  }

  React.useEffect(() => {
    setPageItems(toNumber(_pageItems));
  }, [_pageItems]);

  function renderPaginationInfo(): JSX.Element {
    return (
      <Row className="pl-3">
        <Label className="mt-2"> {t('Hiển thị')}</Label>
        <Col>
          <FormGroup>
            <CustomInput id="select-page-items" value={pageItems} type="select" onChange={handleChangePageItems}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </CustomInput>
          </FormGroup>
        </Col>
        <Label className="mt-2">
          {' '}
          {t('Tổng cộng')}: {pageCurrent}/{props.pageCount}
        </Label>
      </Row>
    );
  }

  return (
    <nav className="sipPagination">
      <div className="sipPaginationTotal">{renderPaginationInfo()}</div>
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
