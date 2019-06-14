import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, InputGroup, InputGroupText, Col, Row, Table, Label } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const InternationalForwardingOrder: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Cước chính:</Col>
            <Col xs="7">12.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Điều chỉnh:</Col>
            <Col xs="7">
              <Input type="text" value="0.00 đ" />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Phụ phí khác:</Col>
            <Col xs="7">
              <Input type="text" value="0.00 đ" />
            </Col>
          </Row>
        </Row>
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Phí gia tăng:</Col>
            <Col xs="7">0.00 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Phí xăng dầu:</Col>
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
            <Col xs="6">Tổng cước</Col>
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
        <h3>Người nhận</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Điện thoại
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số điện thoại " />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Họ tên
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nguyễn Văn Nam" />
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
            Mã khách hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập mã khách hàng" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Điện thoại
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số điện thoại " />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Họ tên
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Họ tên" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderCodPriceInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Tiền thu hộ & giá cước</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tiền thu hộ
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số tiền thu hộ (đ)" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Người trả cước
            <span className="color-red"> *</span>
          </Label>
          <Col lg="4" xs="6">
            <Label check>
              <Input type="radio" name="codPrice" /> Người gửi
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check>
              <Input type="radio" name="codPrice" /> Người nhận
            </Label>
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
            <h3>Thông tin phiếu gửi</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="4">
                Mã phiếu gửi
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
        <h3>Dịch vụ</h3>
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
