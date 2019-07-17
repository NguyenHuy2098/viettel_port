/* eslint-disable max-lines */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Col, Row, Label } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const InternationalForwardingOrder: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon sipContentContainer no-padding">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Cước chính')}:</Col>
            <Col xs="7">12.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Điều chỉnh')}:</Col>
            <Col xs="7">
              <Input type="text" defaultValue="0.00 đ" />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Phụ phí khác')}:</Col>
            <Col xs="7">
              <Input type="text" defaultValue="0.00 đ" />
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
            Quốc gia
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập nước đến')} />
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
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
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

  function renderPackageSize(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Dài (cm)" />
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Rộng (cm)" />
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Cao (cm)" />
        </Col>
      </Row>
    );
  }

  function renderPackageInfo(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Thông tin hàng hóa</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nội dung hàng hóa" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Giá trị
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập giá trị (đ)" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Số lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số lượng" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Trọng lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập  trọng lượng (g)" />
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            Trọng lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">{renderPackageSize()}</Col>
        </Row>
      </div>
    );
  }

  function renderSendingServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          Dịch vụ
          <Button className="sipFlatBtn pull-right text-normal">
            Tất cả dịch vụ
            <i className="fa fa-angle-right ml-1 fa-lg"></i>
          </Button>
        </h3>
        <Row className="sipInputItem">
          <Label check xl="6" xs="12" className="pt-0 pb-0">
            <Input type="radio" name="transportMethod" /> VQE Quốc tế chuyên tuyến
          </Label>
          <Col xl="6" xs="12">
            <span className="font-xs">Dự kiến giao: 30 giờ</span>
            <span className="pull-right color-orange">37.900 đ</span>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label check xl="6" xs="12" className="pt-0 pb-0">
            <Input type="radio" name="transportMethod" /> VCN Chuyển phát nhanh
          </Label>
          <Col xl="6" xs="12">
            <span className="font-xs">Dự kiến giao: 30 giờ</span>
            <span className="pull-right color-orange">37.900 đ</span>
          </Col>
        </Row>
      </div>
    );
  }

  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Yêu cầu khi giao hàng</h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="deliveryRequirement" /> Cho khách xem hàng
            </Label>
          </Col>
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="deliveryRequirement" /> Không cho khách xem hàng
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Ghi chú khác
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập ghi chú" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderProductInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          {renderPackageInfo()}
          {renderSendingServices()}
          {renderDeliveryRequirement()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
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
      </Row>
      {renderSendingCoupon()}
      <Row>
        {renderSendingCouponInfo()}
        {renderProductInfo()}
      </Row>
    </>
  );
};

export default InternationalForwardingOrder;
