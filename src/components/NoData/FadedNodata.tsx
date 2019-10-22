import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fade, Row } from 'reactstrap';
import ButtonGoBack from '../Button/ButtonGoBack';

const FadedNoData: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};

export default FadedNoData;
