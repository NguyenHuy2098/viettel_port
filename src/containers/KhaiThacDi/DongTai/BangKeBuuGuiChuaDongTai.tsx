import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { map } from 'lodash';
import { Button, Col, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';

// eslint-disable-next-line max-lines-per-function
const BangKeBuuGuiChuaDongTai: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);
  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);

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

  function renderTable(): JSX.Element {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th />
            <th>{t('Mã tải')}</th>
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
            listBangKeChuaDongTai,
            (bangeKe: API.RowMTZTMI047OUT): JSX.Element => (
              <tr key={bangeKe.TOR_ID}>
                <td className="text-center">
                  <Label check>
                    <Input type="checkbox" />
                  </Label>
                </td>
                <td>{bangeKe.TOR_ID}</td>
                <td>{bangeKe.LOG_LOCID_DES}</td>
                <td>{bangeKe.ITEM_NO}</td>
                <td>-</td>
                <td>{moment(parseInt(bangeKe.DATETIME_CHLC || '0')).format()}</td>
                <td>{bangeKe.EXEC_CONT || '-'}</td>
                <td className="SipTableFunctionIcon">{renderAction()}</td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tìm kiếm tải')} />
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countBangKeChuaDongTai}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        {renderTable()}
        {renderPagination()}
      </Row>
    </>
  );
};

export default BangKeBuuGuiChuaDongTai;
