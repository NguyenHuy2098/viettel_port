import React from 'react';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import logo from 'assets/img/logo.png';

const DefaultHeadline = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Row className="mb-4">
      <Col xs={3}>
        <img src={logo} alt="ViettelPost Logo" width="100%" />
      </Col>
      <Col xs={6} className="border-bottom">
        <h5 className="text-center font-weight-bold">{t('CHUYÊN NGHIỆP - NHANH - HIỆU QUẢ')}</h5>
      </Col>
      <Col xs={3}>
        <div className="font-weight-bold font-italic">
          {t('Ngày in')}
          {t('COLON', ':')}
          {t(' ')}
          {moment().format('DD/MM/YYYY')}
        </div>
        <div className="font-weight-bold font-italic">
          {t('Giờ')}
          {t('COLON', ':')}
          {t(' ')}
          {moment().format('HH:mm')}
        </div>
      </Col>
    </Row>
  );
};

export default DefaultHeadline;
