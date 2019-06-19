import * as React from 'react';
import { Button, Col, Input, Label, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin chuyến thư')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button>
            <i className="fa fa-truck" />
            {t('Nhận chuyến thư')}
          </Button>
          <Button>
            <i className="fa fa-download" />
            {t('Hoàn thành nhận tải kiện')}
          </Button>
        </div>
      </Row>
    );
  }

  function renderOrderInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin tải kiện')}</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-shopping-bag" />
            {t('Nhận tải kiện')}
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            {t('Quét mã')}
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionOrderShipping(): JSX.Element {
    return (
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
        <Col xl={3} lg={5} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg={2} xl={4} xs={12} className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
    );
  }

  function renderFindOrder(): JSX.Element {
    return (
      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Nhập mã tải kiện" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>
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

  // eslint-disable-next-line max-lines-per-function
  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Mã tải kiện')}</th>
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
              <td>41100035876</td>
              <td>TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>650 g</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td>
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>41100035876</td>
              <td>TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>650 g</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td>
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>41100035876</td>
              <td>TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>650 g</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }
  return (
    <div>
      {renderShippingInformationTitle()}
      {renderDescriptionOrderShipping()}
      {renderOrderInformationTitle()}
      {renderFindOrder()}
      {renderTable()}
    </div>
  );
};
export default ShippingInformation;
