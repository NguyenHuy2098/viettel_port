import * as React from 'react';
import { Button, Row, Col, Table, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe: React.FC = (): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();

  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
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
      </Pagination>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
      </>
    );
  }

  function renderTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>{t('Mã BK/PG')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày tạo')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>BK-2683077-TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>Nguyễn Văn An</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      <h1 className="sipTitle">{t('Danh sách bảng kêê/ phiếu gửi trong tải')}</h1>
      <div className="sipTitleRightBlock">
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-trash-o" />
        </Button>
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-print" />
        </Button>
        <Button onClick={toggle}>
          <i className="fa fa-download" />
          {t('Ghi lại')}
        </Button>
      </div>
      <div className="row mt-3" />
      <div className="sipSummaryContent">
        <Row>
          <Col className="col-1">{t('Mã tải')}: </Col>
          <Col className="col-3">BK_1209_BNH</Col>
          <Col className="col-1">{t('Bưu cục đi')}: </Col>
          <Col className="col-1">TQN</Col>
          <Col className="col-5" />
          <Col className="col-1">{t('Tổng số')}: 5</Col>
        </Row>
        <Row>
          <Col className="col-1">{t('Ngày tạo')}: </Col>
          <Col className="col-3">24/04/2019</Col>
          <Col className="col-1">{t('Ngày gửi')}: </Col>
          <Col className="col-1">24/04/2019</Col>
        </Row>
      </div>
      <div className="row mt-3" />
      <div className="sipTableSearch">
        <Row>
          <Col className="col-3">
            <Input type="text" placeholder={t('Quét mã bảng kê/ phiếu gửi')} />
          </Col>
          <Col className="col-1">
            <Button>{t('Quét mã')}</Button>
          </Col>
        </Row>
      </div>
      <div className="row mt-3" />
      {renderTable()}
      {renderPagination()}
    </div>
  );
};

export default DanhSachBangKe;
