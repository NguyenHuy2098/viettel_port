import * as React from 'react';
import { Button, Col, Input, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKeDaDong: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleBack = (): void => {
    dispatch(goBack());
  };
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack}>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          Danh sách phiếu gửi trong bảng kê
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">BK_1209_BNH</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">1400 g</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{t('Thư - Hỏa tốc')}: </Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row className="sipLine mt-3 mb-3" />
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã bảng kê phiếu gửi')} />
          </div>
          <Button color="primary" className="ml-2">
            {t('Quét mã')}
          </Button>
          <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
            <i className="fa fa-trash-o" />
          </Button>
        </div>
      </div>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
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
              <th>Mã tải</th>
              <th>Điểm đến</th>
              <th>Số lượng</th>
              <th>Trọng lượng</th>
              <th>Ngày gửi</th>
              <th>Loại</th>
              <th>Quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td>Bảng kê</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  return (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <div className="sipTabContainer">{renderTable()}</div>
    </>
  );
};
export default DanhSachPhieuGuiTrongBangKeDaDong;
