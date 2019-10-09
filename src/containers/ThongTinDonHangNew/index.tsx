import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import InformationSchedule from './InformationSchedule';

// eslint-disable-next-line max-lines-per-function
const OrderInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderOrderInformation(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipInputBlock">
          <h3>Thông tin bưu kiện</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              Mã bưu kiện:
            </Col>
            <Col xs="12" sm="8" className="color-bluegreen">
              123456789
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              Ngày tạo:
            </Col>
            <Col xs="12" sm="8">
              10:43 20/05/2018
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              Dịch vụ:
            </Col>
            <Col xs="12" sm="8">
              VCN
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              Trạng thái:
            </Col>
            <Col xs="12" sm="8">
              <span className="bg-success p-1 rounded">Đang giao</span>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipInputBlock">
          <h3> {t('Người gửi')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ & tên')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Nguyễn Văn An')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              {t('0987654314')}:
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Địa chỉ')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  function renderReceiveCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipInputBlock">
          <h3> {t('Người nhận')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ & tên')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Trần Văn Thao')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              {t('0987654314')}:
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Địa chỉ')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderInformation1(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <div className="sipContentContainer">
          <Row>
            <Col>
              <h3>Thông tin hàng hóa</h3>
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Mặt hàng')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Quần áo Nike')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Trọng lượng')}:
            </Col>
            <Col xs="12" sm="8">
              900 gram
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số lượng')}:
            </Col>
            <Col xs="12" sm="8">
              2
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Giá trị')}:
            </Col>
            <Col xs="12" sm="8">
              2.050.000đ
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Cước phí')}:
            </Col>
            <Col xs="12" sm="8">
              23.000đ
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Tiền thu hộ')}:
            </Col>
            <Col xs="12" sm="8">
              5.250.000đ
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  function renderInformation2(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <div className="sipContentContainer">
          <Row>
            <Col>
              <h3>Bưu tá giao</h3>
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ và tên')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Đỗ Huy Hoàng')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              0977865635
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Bưu cục')}:
            </Col>
            <Col xs="12" sm="8">
              DBH
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  function renderInformation3(): JSX.Element {
    return (
      <div className="sipInputBlock m-0">
        <div className="sipContentContainer m-0">
          <Row>
            <Col>
              <h3>Bưu tá nhận</h3>
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ và tên')}:
            </Col>
            <Col xs="12" sm="8">
              {t('Trần Trung Kiên')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              0977865635
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Bưu cục')}:
            </Col>
            <Col xs="12" sm="8">
              BNE
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Thông tin đơn hàng')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-barcode" />
            In mã vạch
          </Button>
          <Button>
            <i className="fa fa-print" />
            In mã phiếu
          </Button>
        </div>
      </Row>
      <Row className="sipContentContainer pt-4 pb-4">
        {renderOrderInformation()}
        {renderSenderCustomer()}
        {renderReceiveCustomer()}
      </Row>
      <Row>
        <Col xl="4" xs="12">
          {renderInformation1()}
          {renderInformation2()}
          {renderInformation3()}
        </Col>
        <Col xl="8" xs="12">
          <InformationSchedule />
        </Col>
      </Row>
    </div>
  );
};

export default OrderInformation;
