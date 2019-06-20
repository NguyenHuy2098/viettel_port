import * as React from 'react';
import { Button, Col, Input, Row, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const ComplainDetail: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const renderTopController = (): React.ReactElement => (
    <>
      <Button>
        <i className="fa fa-download" />
        {t('Ghi lại')}
      </Button>
    </>
  );

  function renderInternalRecordTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Chi tiết khiếu nại')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>
    );
  }
  // eslint-disable-next-line max-lines-per-function
  function renderRecordDetail(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Nội dung')}
          </Label>
          <Col lg="6" md="7">
            <Input type="textarea" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Gia hạn')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Chọn lý do gia hạn" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Loại khiếu nại')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Khiếu nại khâu nhận" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Chọn khiếu nại')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Cập nhận sai trạng thái đơn hàng" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Đơn vị mắc lỗi')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Chọn đơn vị mắc lỗi" />
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label lg="2" md="4">
            {t('Cá nhân mắc lỗi')}
          </Label>
          <Col lg="6" md="7">
            <Input type="text" placeholder="Nhập tên người mắc lỗi" />
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div>
      {renderInternalRecordTitle()}
      {renderRecordDetail()}
    </div>
  );
};

export default ComplainDetail;
