import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Table } from 'reactstrap';

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
      <Row>
        <Col>
          <h1 className="sipTitle">{t('Danh sách phiếu gửi trong bảng kê')}</h1>
          <div className="sipTitleRightBlock">{renderTopController()}</div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="col-4">{t('Mã bảng kê')}</Col>
        <Col className="col-4">abc</Col>
        <Col className="col-4">abc</Col>
      </Row>

      <Row className="mt-3">
        <Col>abc</Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div className="sipTableContainer">{renderDataTable()}</div>
        </Col>
      </Row>
    </>
  );
};

export default ForwardingOrderListInManifest;
