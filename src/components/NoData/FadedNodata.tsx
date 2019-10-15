import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Fade, Row } from 'reactstrap';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const FadedNoData: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleBack = (): void => {
    dispatch(goBack());
  };

  return (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};

export default FadedNoData;
