import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Col, Row, Table } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const ForwardingOrderListInManifest: React.FC = (): React.ReactElement => {
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

  const renderDataTable = (): JSX.Element => (
    <Table striped hover>
      <thead>
        <tr>
          <th></th>
          <th>Mã bảng kê</th>
          <th>Bưu cục đi</th>
          <th>Bưu cục đến</th>
          <th>Số lượng</th>
          <th>Người nhập</th>
          <th>Ngày nhập</th>
          <th>Ghi chú</th>
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
          <td>BK-2683077-TTKT1</td>
          <td>TTKT1</td>
          <td>TTKT3</td>
          <td>25</td>
          <td>Nguyễn Văn An</td>
          <td>19/6/2019</td>
          <td>Hàng giá trị cao</td>
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
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">2{'24/04/2019'}</Col>
          </Row>
        </Col>
        <Col md="5" xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đến')}: </Col>
            <Col xs="7">HUB1</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{'Chuyển hoàn về bưu cục gốc'}</Col>
          </Row>
        </Col>
        <Col md="3" xs="12" className="text-right">
          {t('Tổng số')}: 3
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

export default ForwardingOrderListInManifest;
