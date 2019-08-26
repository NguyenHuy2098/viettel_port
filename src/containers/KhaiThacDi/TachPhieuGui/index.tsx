import React from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const SplitCoupon: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Tách phiếu gửi')}
        </h1>
      </Row>
    );
  }

  function renderListCouponTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Danh sách phiếu gửi')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            {t('In mã vạch')}
          </Button>
          <Button>
            <i className="fa fa-print" />
            {t(' In mã phiếu')}
          </Button>
        </div>
      </Row>
    );
  }

  function renderCouponInformation(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="4" xs="12">
          <Row>
            <Col xs="6">{t('Mã phiếu')}: </Col>
            <Col xs="6">V00596290</Col>
          </Row>
          <Row>
            <Col xs="6">{t('Mã phiếu')}: </Col>
            <Col xs="6">V00596290</Col>
          </Row>
          <Row>
            <Col xs="6">{t('Trọng lượng')}: </Col>
          </Row>
        </Col>
        <Col lg="4" xs="12">
          <Row>
            <Col xs="6">{t('Ngày gửi')}: </Col>
            <Col xs="6">24/04/2019</Col>
          </Row>
          <Row>
            <Col xs="6">{t('Ngày gửi')}: </Col>
            <Col xs="6">24/04/2019</Col>
          </Row>
          <Row>
            <Col xs="6">{t('Trọng lượng')}: </Col>
            <Col xs="6">750 g</Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-3">
          <Label className="mr-3">
            {t('Mã phiếu gửi')}
            <span className="color-red"> *</span>
          </Label>
          <div className="sipScanCodeContainer">
            <Input type="text" />
            <Button color="primary">Tách phiếu</Button>
          </div>
        </Col>
      </Row>
    );
  }

  function renderFindCoupon(): JSX.Element {
    return (
      <Row className="sipBgWhiteContainer">
        <Label className="mr-3">
          {t('Mã phiếu gửi')}
          <span className="color-red"> *</span>
        </Label>
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Nhập mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>
    );
  }

  function renderListCoupon(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="8" xs="12">
          <Row className="color-bluegreen mb-3">
            <Col xs="6" lg="5">
              {t('Mã phiếu gửi')}
            </Col>
            <Col xs="6" lg="7">
              {t('Trọng lượng')}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="6" lg="5">
              <Label check>
                <Input type="checkbox" />
                V00596290_01
              </Label>
            </Col>
            <Col xs="6" lg="7">
              <Input className="text-center" type="text" defaultValue="250 g" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="6" lg="5">
              <Label check>
                <Input type="checkbox" />
                V00596290_01
              </Label>
            </Col>
            <Col xs="6" lg="7">
              <Input className="text-center" type="text" defaultValue="50 g" />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs="6" lg="5">
              <Label check>
                <Input type="checkbox" />
                V00596290_01
              </Label>
            </Col>
            <Col xs="6" lg="7">
              <Input className="text-center" type="text" defaultValue="400 g" />
            </Col>
          </Row>
        </Col>
      </Row>
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
