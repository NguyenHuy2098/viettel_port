import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Col, Row, Table } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  const renderTopController = (): React.ReactElement => (
    <>
      <Button className="sipTitleRightBlockBtnIcon">
        <i className="fa fa-trash-o" />
      </Button>
      <Button className="sipTitleRightBlockBtnIcon">
        <i className="fa fa-print" />
      </Button>
      <Button>
        <i className="fa fa-download" />
        {t('Ghi lại')}
      </Button>
    </>
  );

  const renderTableRowControllers = (): JSX.Element => (
    <>
      <Button>
        <i className="fa fa-pencil fa-lg color-blue" />
      </Button>
      <Button>
        <i className="fa fa-trash-o fa-lg color-red" />
      </Button>
    </>
  );

  const renderDataTable = (): JSX.Element => (
    <Table striped hover>
      <thead>
        <tr>
          <th></th>
          <th>Mã phiếu gửi</th>
          <th>Điểm đến</th>
          <th>Số lượng</th>
          <th>Trọng lượng</th>
          <th>Ngày gửi</th>
          <th>Quản trị</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Label check>
              <Input type="checkbox" />
            </Label>
          </td>
          <td>0026830775</td>
          <td>BNE</td>
          <td>2</td>
          <td>250g</td>
          <td>19/6/2019</td>
          <td className="SipTableFunctionIcon">{renderTableRowControllers()}</td>
        </tr>
      </tbody>
    </Table>
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>

      <Row className="sipSummaryContent">
        <Col md="4" xs="12">
          <Row>
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">{'V00596290'}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">{'1400g'}</Col>
          </Row>
        </Col>
        <Col md="5" xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">HUB1</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{'Thư hỏa tốc'}</Col>
          </Row>
        </Col>
        <Col md="3" xs="12" className="text-right">
          {t('Tổng số')}: 45
        </Col>
      </Row>

      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>

      <Row className="sipTableContainer">{renderDataTable()}</Row>
    </>
  );
};

export default DanhSachPhieuGuiTrongBangKe;
