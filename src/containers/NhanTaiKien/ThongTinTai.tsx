import * as React from 'react';
import { Button, Row, Col, Label, Table, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const ThongTinTai: React.FC = (): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();

  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination className="sipPagination">
        <PaginationItem className="sipPaginationPrev pull-left">
          <PaginationLink previous href="#">
            <i className="fa fa-arrow-left"></i>
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
            <i className="fa fa-arrow-right"></i>
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
              <th>{t('Bưu cục đi')}</th>
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
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>BK-2683077-TTKT1</td>
              <td>TTKT1</td>
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
      <h1 className="sipTitle">{t('Thông tin tải/kiện')}</h1>
      <div className="sipTitleRightBlock">
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-print" />
        </Button>
        <Button onClick={toggle}>
          <i className="fa fa-plus" />
          {t('Nhận tải')}
        </Button>
        <Button onClick={toggle}>
          <i className="fa fa-plus" />
          {t('Hoàn thành nhận BK/PG')}
        </Button>
      </div>
      <div className="row mt-3" />
      <div className="sipSummaryContent">
        <Row>
          <Col md="5" xs="12">
            <Row>
              <Col xs="5">{t('Mã bảng kê')}: </Col>
              <Col xs="7">BK_1209_BNH</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Ngày tạo')}: </Col>
              <Col xs="7">24/04/2019</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Ghi chú')}: </Col>
              <Col xs="7">{t('Chuyển hoàn về bưu cục gốc')}: </Col>
            </Row>
          </Col>
          <Col md="3" xs="12">
            <Row>
              <Col xs="5">{t('Bưu cục đến')}: </Col>
              <Col xs="7">TQN</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Ngày gửi')}: </Col>
              <Col xs="7">24/04/2019</Col>
            </Row>
          </Col>
          <Col md="4" xs="12" className="text-right">
            {t('Tổng số')}: 5
          </Col>
        </Row>
      </div>
      <div className="row mt-3" />
      <h1 className="sipTitle">{t('Thông tin bảng kê/ phiếu gửi')}</h1>
      <div className="sipTitleRightBlock sipTitleRightBlock2">
        <Button onClick={toggle}>
          <i className="fa fa-plus" />
          {t('Nhận BK/PG')}
        </Button>
        <Button onClick={toggle}>
          <i className="fa fa-plus" />
          {t('Quét mã')}
        </Button>
      </div>
      <div className="row mt-3" />
      <div className="row sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </div>
      <div className="row mt-3" />
      {renderTable()}
      {renderPagination()}
    </div>
  );
};

export default ThongTinTai;
