import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Col, Row, Label } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const InternationalForwardingOrder: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Cước chính')}:</Col>
            <Col xs="7">12.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Điều chỉnh')}:</Col>
            <Col xs="7">
              <Input type="text" value="0.00 đ" />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Phụ phí khác')}:</Col>
            <Col xs="7">
              <Input type="text" value="0.00 đ" />
            </Col>
          </Row>
        </Row>
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Phí gia tăng')}:</Col>
            <Col xs="7">0.00 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Phí xăng dầu')}:</Col>
            <Col xs="7">5.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">VAT:</Col>
            <Col xs="7">0.00 đ</Col>
          </Row>
        </Row>
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="6">{t('Tổng cước')}</Col>
            <Col xs="6" className="color-orange">
              29.000 đ
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

  function renderReceiverInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người nhận')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập số điện thoại')} />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Họ tên
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nguyễn Văn Nam')} />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderSenderInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Người gửi</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khách hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập mã khách hàng')} />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập số điện thoại ')} />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Họ tên')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Họ tên')} />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Địa chỉ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')} />
            <p>
              {t('Nếu bạn không tìm thấy địa chỉ gợi ý')}
              <a className="color-bluegreen" href="/">
                &nbsp; {t('nhấn vào đây')}&nbsp;
              </a>
              {t('để tự nhập')}
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col md="6" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3>{t('Thông tin phiếu gửi')}</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="4">
                {t('Mã phiếu gửi')}
              </Label>
              <Col lg="8">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </div>
          {renderSenderInput()}
          {renderReceiverInput()}
        </div>
      </Col>
    );
  }

  function renderTransportService(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          Dịch vụ
          <a className="pull-right" href="/">
            Tất cả dịch vụ <span className="color-orange">></span>
          </a>
        </h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="6">
            <Label check>
              <Input type="radio" name="codPrice" /> <b>VQE Quốc tế chuyên tuyến</b>
            </Label>
          </Col>
          <Col lg="3" xs="6">
            Dự kiến giao: 30 giờ
          </Col>
          <Col lg="3" xs="6" className="color-orange">
            37.900
          </Col>
        </Row>
      </div>
    );
  }

  function renderRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Yêu cầu khi giao hàng</h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="6">
            <Label check>
              <Input type="radio" name="codPrice" /> <b>Cho khách xem hàng</b>
            </Label>
          </Col>
          <Col lg="6" xs="6">
            <Label check>
              <Input type="radio" name="codPrice" /> <b>Không cho khách xem hàng</b>
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="3">
            Ghi chú khác
          </Label>
          <Col lg="9">
            <Input type="text" placeholder="Nhập ghi chú" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderProductInfo(): JSX.Element {
    return (
      <Col md="6" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3>Thông tin hàng hóa</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="3">
                Tên hàng
                <span className="color-red"> *</span>
              </Label>
              <Col lg="9">
                <Input type="text" placeholder="Nội dung hoàng hóa" />
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Label xs="12" lg="3">
                Giá trị
              </Label>
              <Col lg="9">
                <Input type="text" placeholder="Nhập giá trị (đ)" />
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Label xs="12" lg="3">
                Số lượng
                <span className="color-red"> *</span>
              </Label>
              <Col lg="9">
                <Input type="text" placeholder="1" />
              </Col>
            </Row>
          </div>
          {renderTransportService()}
          {renderRequirement()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <div className="row mb-3 sipTitleContainer">
        <h1 className="sipTitle">Phiếu gửi quốc tế</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-refresh" />
            Làm mới
          </Button>
          <Button>
            <i className="fa fa-download" />
            Ghi lại
          </Button>
        </div>
      </div>
      {renderSendingCoupon()}
      <Row>
        {renderSendingCouponInfo()}
        {renderProductInfo()}
      </Row>
    </>
  );
};

export default InternationalForwardingOrder;
