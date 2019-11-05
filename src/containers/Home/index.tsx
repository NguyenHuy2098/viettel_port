/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ExportExcelWithTemplate from 'components/Button/ExportExcelWithTemplate';

import Chart1 from './chart1';
import Chart2 from './chart2';

// eslint-disable-next-line max-lines-per-function
const Home: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function handleData(workbook: any): void {
    workbook
      .sheet(0)
      .cell('A1')
      .value('This was created in the browser!')
      .style('fontColor', 'ff0000');
  }

  const renderTopDashBoard = (): JSX.Element => {
    return (
      <Row className="topDashBroad mb-4">
        <ExportExcelWithTemplate
          handleData={handleData}
          urlTemplate={`${window.location.origin}/mau.xlsx`}
          fileName="out.xlsx"
        >
          <Button>Export excel</Button>
        </ExportExcelWithTemplate>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconBangKe1.svg'} alt="VTPostek" />
            {t('Bảng kê chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconTai1.svg'} alt="VTPostek" />
            {t('Tải chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">02</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconChuyenThu.svg'} alt="VTPostek" />
            {t('Chuyến thư chưa đóng')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">01</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconBangKe2.svg'} alt="VTPostek" />
            {t('Bảng kê chưa nhận')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
        <Col xs="12" className="col-sm itemCol pt-3">
          <span className="font-lg">
            <img src={'../../assets/img/icon/iconTai2.svg'} alt="VTPostek" />
            {t('Tải chưa nhận')}
          </span>
          <div className="font-2xl color-gray-dark pt-2 pb-2">20</div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {renderTopDashBoard()}
      <Chart1 />
      <Chart2 />
    </>
  );
};

export default Home;
