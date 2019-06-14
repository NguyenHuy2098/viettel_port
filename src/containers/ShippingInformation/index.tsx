import * as React from 'react';
import { Button, Col, Input, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="sipOrderShippingInformationTitle">
        <Col>
          <i className="fa fa-arrow-left backIcon" />
          <h1 className="sipTitle">Thông tin chuyến thư</h1>
        </Col>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button>
            <i className="fa fa-truck" />
            Nhận chuyến thư
          </Button>
          <Button>
            <i className="fa fa-download" />
            Hoàn thành nhận tải kiện
          </Button>
        </div>
      </Row>
    );
  }

  function renderOrderInformationTitle(): JSX.Element {
    return (
      <Row className="sipOrderShippingInformationTitle">
        <Col>
          <h1 className="sipTitle">Thông tin tải kiện</h1>
        </Col>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-shopping-bag" />
            Nhận tải kiện
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            Quét mã
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionOrderShipping(): JSX.Element {
    return (
      <div className="">
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
      </div>
    );
  }

  function renderFindOrder(): JSX.Element {
    return (
      <Row className="sipFindOrder">
        <Col xs="6" sm="4">
          <Input type="text" placeholder="Nhập mã tải kiện" />
        </Col>
        <Col className="scanCodeButton">
          <Button>Tìm kiếm</Button>
        </Col>
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
      <div className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>Mã tải kiện</th>
              <th>Bưu cục đi</th>
              <th>Bưu cục đến</th>
              <th>Số lượng</th>
              <th>Trọng lượng</th>
              <th>Ngày tạo</th>
              <th>Ghi chú</th>
              <th>Quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="custom-checkbox">
                <input type="checkbox" />
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
                <input type="checkbox" />
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
              <td className="custom-checkbox">
                <input type="checkbox" />
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
      </div>
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
