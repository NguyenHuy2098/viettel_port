import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { map, get } from 'lodash';
import { useGet_MT_ZTMI047_OUT_Row } from 'redux/MIOA_ZTMI047/selectors';

// eslint-disable-next-line max-lines-per-function
const BangKeChuaHoanThanh: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }, [dispatch]);

  function renderPagination(): JSX.Element {
    return (
      <Pagination className="sipPagination">
        <PaginationItem className="sipPaginationPrev pull-left">
          <PaginationLink previous href="#">
            <i className="fa fa-arrow-left" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem className="sipPaginationNext pull-right">
          <PaginationLink next href="#">
            <i className="fa fa-arrow-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  const listManifest = useGet_MT_ZTMI047_OUT_Row();

  function renderTable(): JSX.Element {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Mã bảng kê')}</th>
              <th>{t('Điểm đến')}</th>
              <th>{t('SL')}</th>
              <th>{t('Người nhập')}</th>
              <th>{t('Ngày nhập')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            {map(
              listManifest,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <Label check>
                        {/* eslint-disable-next-line react/jsx-max-depth */}
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.TOR_ID}</td>
                    <td></td>
                    <td>{item.ITEM_NO}</td>
                    <td></td>
                    <td>{item.DATETIME_CHLC}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderAction()}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
        {renderPagination()}
      </>
    );
  }

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tìm kiếm bảng kê')} />
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{get(listManifest, 'length', 0)}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">{renderTable()}</Row>
    </>
  );
};

export default BangKeChuaHoanThanh;
