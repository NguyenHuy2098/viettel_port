import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Col, Row } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const VerificationRecord: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  const renderTopController = (): React.ReactElement => (
    <>
      <Button>
        <i className="fa fa-refresh" />
        {t('Cập nhật')}
      </Button>
    </>
  );

  const renderCheckbox = (): React.ReactElement => (
    <Row className="pl-3 pt-3">
      <Col lg={4} md={6} xs="12">
        <Label check>
          <Input type="checkbox" />
          {t('Biên bản lập đúng')}
        </Label>
      </Col>
      <Col lg={4} md={6} xs="12">
        <Label check>
          <Input type="checkbox" />
          {t('Biên bản lập sai')}
        </Label>
      </Col>
    </Row>
  );

  const renderContentRecord = (): React.ReactElement => (
    <div className="pl-3">
      <Col xl={5} md="8" xs="12" className="no-padding">
        <Row className="mb-3">
          <Label xs="12" lg="5">
            {t('Loại lỗi vi phạm')}
          </Label>
          <Col lg="7">
            <Input type="select">
              <option>Chọn lỗi</option>
              <option>1</option>
              <option>2</option>
            </Input>
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="5">
            {t('Chọn lỗi vi phạm')}
          </Label>
          <Col lg="7">
            <Input type="select">
              <option>Chọn lỗi</option>
              <option>1</option>
              <option>2</option>
            </Input>
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="7">
            {t('Mã biên bản lập lại')}
            <p className="no-margin">
              <small>{t('(Dành cho trường hợp lập lại biên bản)')}</small>
            </p>
          </Label>
          <Col lg="5">
            <Input type="text" />
          </Col>
        </Row>
      </Col>
    </div>
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Xác minh biên bản')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>

      <Row className="sipSummaryContent">
        <Col xl="5" md="6" xs="12">
          <Row>
            <Col xs="5">{t('Mã biên bản')}: </Col>
            <Col xs="7">{'13955485'}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Mã chuyến thư')}: </Col>
            <Col xs="7">2{'CT_47122'}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{'Chuyển hoàn về bưu cục gốc '}</Col>
          </Row>
        </Col>
        <Col xl="5" md="6" xs="12">
          <Row>
            <Col xs="5">{t('Mã phiếu gửi')}: </Col>
            <Col xs="7">13900014</Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Biện pháp xử lý')}</h1>
      </Row>

      <div className="sipContentContainer no-padding">
        {renderCheckbox()}
        <div className="sipLine mb-3 pb-3" />
        {renderContentRecord()}
      </div>
    </>
  );
};

export default VerificationRecord;
