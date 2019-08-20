import React from 'react';
import { Row, Col } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
function InformationSchedule(): JSX.Element {
  return (
    <div className="sipInputBlock h-100">
      <div className="sipContentContainer">
        <Row>
          <Col>
            <h3>Thông tin hành trình</h3>
          </Col>
        </Row>
        <div className="sipBoxSchedule">
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Shipper báo đã giao hàng
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime active">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Đã giao hàng/ Chưa đối soát
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Đã điều phối giao hàng / Đang giao hàng
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Đã lấy hàng / Đã nhập kho
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Đã tiếp nhận
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Thông tin đơn hàng đã gửi tới người bán
            </Col>
          </Row>
          <Row className="sipInputItem position-relative pt-2 pb-2">
            <Col md="4" sm="5" xs="12" className="pl-5 itemTime">
              23/02/2018 02:02:00
            </Col>
            <Col md="8" sm="7" xs="12" className="pl-5">
              Đã taọ đơn hàng
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default InformationSchedule;
