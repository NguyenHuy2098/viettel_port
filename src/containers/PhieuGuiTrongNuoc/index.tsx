import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { AppState } from 'redux/store';

interface Props {
  text: string;
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC<Props> = (props): JSX.Element => {
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
              <Input type="text" defaultValue="0.00 đ" />
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Phụ phí khác:</Col>
            <Col xs="7">
              <Input type="text" defaultValue="0.00 đ" />
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
          {renderCodPriceInput()}
        </div>
      </Col>
    );
  }

  return (
    <div>
      <div className="row mb-3 sipTitleContainer">
        <h1 className="sipTitle">Phiếu gửi trong nước</h1>
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
        {renderSendingCouponInfo()}
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(PhieuGuiTrongNuoc);
