import * as React from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const SplitCoupon: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="sipOrderShippingInformationTitle">
        <i className="fa fa-arrow-left backIcon" />
        <h1 className="sipTitle">Tách phiếu gửi</h1>
      </Row>
    );
  }

  function renderListCouponTitle(): JSX.Element {
    return (
      <Row className="sipOrderShippingInformationTitle">
        <Col>
          <h1 className="sipTitle">Danh sách phiếu gửi</h1>
        </Col>
        <div className="sipTitleRightBlock">
          <div className="sipSplitCouponTrashButton">
            <Button>
              <i className="fa fa-trash-o fa-lg color-white" />
            </Button>
          </div>
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
    );
  }

  function renderCouponInformation(): JSX.Element {
    return (
      <div className="sipSummaryContent">
        <Row className="couponInformation">
          <Col lg="4" md="5" xs="12">
            <Row>
              <Col xs="5">{t('Mã phiếu')}: </Col>
              <Col xs="7">V00596290</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Mã phiếu')}: </Col>
              <Col xs="7">V00596290</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Trọng lượng')}: </Col>
            </Row>
          </Col>
          <Col lg="4" md="3" xs="12">
            <Row>
              <Col xs="5">{t('Ngày gửi')}: </Col>
              <Col xs="7">24/04/2019</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Ngày gửi')}: </Col>
              <Col xs="7">24/04/2019</Col>
            </Row>
            <Row>
              <Col xs="5">{t('Trọng lượng')}: </Col>
              <Col xs="7">750 g</Col>
            </Row>
          </Col>
        </Row>
        <Row className="sipSplitCoupon">
          <Label>Số lượng tách</Label>
          <Col xs="6" sm="4">
            <Input type="text" />
          </Col>
          <Col className="scanCodeButton">
            <Button>Tách phiếu</Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderFindCoupon(): JSX.Element {
    return (
      <Row className="sipFindCoupon">
        <Label>
          Mã phiếu gửi
          <span className="color-red"> *</span>
        </Label>
        <Col xs="6" sm="4">
          <Input type="text" placeholder="Nhập mã phiếu gửi" />
        </Col>
        <Col className="scanCodeButton">
          <Button>Tìm kiếm</Button>
        </Col>
      </Row>
    );
  }

  function renderCheckbox(): JSX.Element {
    return (
      <Label check>
        <Input type="checkbox" />
      </Label>
    );
  }

  function renderListCoupon(): JSX.Element {
    return (
      <div className="sipSummaryContent">
        <Row className="couponInformation">
          <Col lg="8" md="5" xs="12">
            <Row className="couponTitle">
              <Col xs="5">Mã phiếu gửi</Col>
              <Col xs="7">Trọng lượng</Col>
            </Row>
            <Row className="couponContent">
              <Col xs="5">
                {renderCheckbox()}
                V00596290_01
              </Col>
              <Col xs="4">
                <Input />
              </Col>
            </Row>
            <Row className="couponContent">
              <Col xs="5">
                {renderCheckbox()}
                V00596290_01
              </Col>
              <Col xs="4">
                <Input />
              </Col>
            </Row>
            <Row className="couponContent">
              <Col xs="5">
                {renderCheckbox()}
                V00596290_01
              </Col>
              <Col xs="4">
                <Input />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      {renderShippingInformationTitle()}
      {renderFindCoupon()}
      {renderCouponInformation()}
      {renderListCouponTitle()}
      {renderListCoupon()}
    </div>
  );
};
export default SplitCoupon;
