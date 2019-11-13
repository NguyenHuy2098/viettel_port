import React, { useState } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { FormGroup, CustomInput, Label, Col, Row } from 'reactstrap';

interface Props extends ReactPaginateProps {
  onThisPaginationChange?: (selectedItem: { selected: number }) => void;
  resetCurrentPage?: boolean;
}

// eslint-disable-next-line max-lines-per-function
function Pagination(props: Props): JSX.Element {
  const { t } = useTranslation();
  const [pageCurrent, setPageCurrent] = useState<number>(1);

  React.useEffect(() => {
    setPageCurrent(1);
  }, [props.resetCurrentPage]);

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    setPageCurrent(selectedItem.selected + 1);
    props.onThisPaginationChange && props.onThisPaginationChange(selectedItem);
  };

  function renderPaginationInfo(): JSX.Element {
    return (
      <Row className="pl-3">
        <Label className="mt-2"> {t('Hiển thị')}</Label>
        <Col>
          <FormGroup>
            <CustomInput type="select">
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
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
