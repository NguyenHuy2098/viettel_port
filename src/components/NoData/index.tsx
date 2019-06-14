import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'reactstrap';
import pngNoData from 'assets/img/no-data.png';

const NoData: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Row className="flex-column align-items-center mt-5">
      <div className="mt-5">
        <img src={pngNoData} alt="no-data" />
      </div>
      <div className="mt-3 font-xl">{t('Chưa có dữ liệu')}</div>
    </Row>
  );
};

export default NoData;
