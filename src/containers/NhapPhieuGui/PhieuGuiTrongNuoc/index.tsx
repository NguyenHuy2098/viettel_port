/* eslint-disable max-lines */
import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Label, Row } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC = (): JSX.Element => {
  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon sipContentContainer no-padding">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Cước chính:</Col>
            <Col xs="7" className="text-semibold">
              12.000 đ
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Cước cộng thêm:</Col>
            <Col xs="7" className="text-semibold">
              2.000 đ
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">Phụ phí khác:</Col>
            <Col xs="7">
              <Input type="text" defaultValue="0.00 đ" />
            </Col>
          </Row>
        </Row>
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="6">Tổng cước</Col>
            <Col xs="6" className="color-orange text-semibold">
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
            <Input type="text" placeholder="Nhập họ tên" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)" />
            <p className="sipInputItemDescription">
              (Nếu bạn không tìm thấy địa chỉ gợi ý, <Button className="sipFlatBtn">nhấn vào đây</Button> để tự nhập)
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  // function renderReceiverAddress(): JSX.Element {
  //   return (
  //     <Row className="sipInputItemGroup">
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>Tỉnh</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>Quận/huyện</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>Phường/xã</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //     </Row>
  //   );
  // }

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
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)" />
            <p className="sipInputItemDescription">
              (Nếu bạn không tìm thấy địa chỉ gợi ý, <Button className="sipFlatBtn">nhấn vào đây</Button> để tự nhập)
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  function renderSendingServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Dịch vụ</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Chọn dịch vụ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="select">
              <option value={1}>VCN Chuyển phát nhanh</option>
              <option value={2}>Chuyển phát chậm</option>
            </Input>
          </Col>
        </Row>
      </div>
    );
  }

  function renderAdditionalServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          Dịch vụ cộng thêm
          <Button className="sipFlatBtn pull-right text-normal">
            Xem bảng giá
            <i className="fa fa-angle-right ml-1 fa-lg" />
          </Button>
        </h3>
        <Row className="sipInputItem">
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" />
            <span className="font-xs">Bảo hiểm</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" defaultChecked />
            <span className="font-xs">Đồng kiểm</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" />
            <span className="font-xs">Giao hẹn giờ</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" />
            <span className="font-xs">Giá trị cao</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" />
            <span className="font-xs">Khác</span>
          </Label>
        </Row>
      </div>
    );
  }

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
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
          {renderSendingServices()}
          {renderAdditionalServices()}
        </div>
      </Col>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfoDetail(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Thông tin hàng hóa</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Loại hàng
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="packageType" defaultChecked /> Hàng hóa
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="packageType" /> Thư
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nội dung hàng hoá" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Số lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Số lượng" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Giá trị & thu hộ
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input type="text" placeholder="Nhập giá trị (đ)" />
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Input type="text" placeholder="Nhập tiền thu hộ (đ)" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Trọng lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập  trọng lượng (g)" />
            <p className="sipInputItemDescription text-right">
              Trọng lượng quy đổi: &nbsp;
              <span className="text-semibold color-bluegreen font-italic">500g</span>
            </p>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            Kích thước
          </Label>
          <Col lg="8">{renderPackageSize()}</Col>
        </Row>
      </div>
    );
  }

  function renderFeePayment(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Tiền phải thu & thanh toán cước</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tổng tiền phải thu
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số tiền phải thu (đ)" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Mã khuyến mãi
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Mã khuyến mãi" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Thanh toán cước
            <span className="color-red"> *</span>
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="payer" defaultChecked /> Người gửi
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="payer" /> Người nhận
            </Label>
          </Col>
        </Row>
      </div>
    );
  }

  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Yêu cầu giao bưu gửi</h3>
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
            Thời gian phát
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập thời gian" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Điểm giao nhận
          </Label>
          <Col lg="8">
            <Input type="select">
              <option value={0}>Giao, gửi hàng tại nhà</option>
              <option value={0}>Giao ở chùa</option>
            </Input>
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

  function renderSplitPackage(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Tách kiện</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Số lượng tách
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input type="text" />
              </Col>
              <Col xs="12" md="4" className="mb-2">
                <Button color="primary">Tách kiện</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  function renderPackageInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          {renderPackageInfoDetail()}
          {renderFeePayment()}
          {renderDeliveryRequirement()}
          {renderSplitPackage()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Phiếu gửi trong nước</h1>
      </Row>
      {renderSendingCoupon()}
      <Row className="mb-3">
        {renderSendingCouponInfo()}
        {renderPackageInfo()}
      </Row>
      <div className="sipBgWhiteContainer sipTitleRightBlock text-right">
        <Button>
          <i className="fa fa-refresh" />
          Làm mới
        </Button>
        <Button>
          <i className="fa fa-download" />
          Ghi lại
        </Button>
      </div>
    </>
  );
};

export default PhieuGuiTrongNuoc;
