import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'reactstrap';
import noData from './no-data.svg';

const NoData = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="align-items-center flex-column mb-3">
        <img alt="no-data" className="w-auto" src={noData} />
      </Row>
      <Row className="align-items-center flex-column">
        <span className="text-bold text-uppercase">{t('Không tìm thấy dữ liệu')}</span>
      </Row>
    </Container>
  );
};

export default NoData;
