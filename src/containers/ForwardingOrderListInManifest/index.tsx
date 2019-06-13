import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, InputGroup, InputGroupText, Col, Row, Table } from 'reactstrap';

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
            <InputGroupText>
              <Input addon type="checkbox" aria-label="Checkbox for following text input" />
            </InputGroupText>
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
      <Row>
        <Col>
          <h1 className="sipTitle">
            <Button className="btn btn-ghost-dark">
              <i className="fa fa-arrow-left" />
            </Button>
            <span>{t('Danh sách phiếu gửi trong bảng kê')}</span>
          </h1>
          <div className="sipTitleRightBlock">{renderTopController()}</div>
        </Col>
      </Row>

      <Row className="m-0 mt-3 pt-3 pb-3 bg-white">
        <Col className="col-4">
          <div>
            {t('Mã bảng kê')}: {'V00596290'}
          </div>
          <div>
            {t('Ngày tạo')}: {'24/04/2019'}
          </div>
        </Col>
        <Col className="col-4">
          <div>
            {t('Bưu cục đến')}: {'HUB1'}
          </div>
          <div>
            {t('Ghi chú')}: {'Chuyển hoàn về bưu cục gốc'}
          </div>
        </Col>
        <Col className="col-4">
          <div>
            {t('Tổng số')}: {'3'}
          </div>
        </Col>
      </Row>

      <Row className="m-0 mt-3 pt-3 pb-3 bg-white">
        <Col>
          <InputGroup>
            <Input placeholder={t('Quét mã phiếu gửi')} />
            <Button>{t('Quét mã')}</Button>
          </InputGroup>
        </Col>
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
