import * as React from 'react';
import { Button, Row, Col, Label, Table, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe: React.FC = (): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();

  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }
  const dispatch = useDispatch();
  const handleBack = (): void => {
    dispatch(goBack());
  };

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
      <Row className="sipTableContainer">
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
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
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
        {renderPagination()}
      </Row>
    );
  }
  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack}>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
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
      </Row>
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
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
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>
      <div className="row mt-3" />
      {renderTable()}
    </>
  );
};

export default DanhSachBangKe;
