import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const PrintablePhieuGiaoNhanChuyenThu = (): JSX.Element => {
  const { t } = useTranslation();

  const renderTable = (): JSX.Element => (
    <table className="table-bordered">
      <thead>
        <th>{t('MÃ SỐ')}</th>
        <th>{t('SMS ID')}</th>
        <th>{t('SỐ HIỆU TẢI KIỆN')}</th>
        <th>{t('MÃ SỐ BẢNG KÊ')}</th>
        <th>{t('S.L (bp)')}</th>
        <th>{t('T.Lượng NET')}</th>
        <th>{t('T.Lượng CƯỚC')}</th>
        <th>{t('DOANH SỐ')}</th>
        <th>{t('DỊCH VỤ')}</th>
        <th>{t('BC GỐC')}</th>
        <th>{t('NƠI ĐI')}</th>
        <th>{t('NƠI ĐẾN')}</th>
        <th>{t('BC PHÁT')}</th>
      </thead>
      <tbody>
        <tr className="font-weight-bold">
          <td colSpan={4}>{t('Tổng số')}</td>
          <td>{t('')}</td>
          <td>{t('404')}</td>
          <td>{t('171,480')}</td>
          <td>{t('11,677,485')}</td>
          <td colSpan={5}>{t('')}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={9}>
          <div className="text-center font-weight-bold">{t('CHUYÊN NGHIỆP - NHANH - HIỆU QUẢ')}</div>
        </Col>
        <Col xs={3}>
          <div className="font-weight-bold">
            {t('Ngày in')}
            {t('COLON', ':')}
          </div>
          <div className="font-weight-bold">
            {t('Giờ')}
            {t('COLON', ':')}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <div className="text-center font-weight-bold">{t('PHIẾU GIAO NHẬN CHUYẾN THƯ')}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <div className="font-weight-bold">
            {t('Từ')}
            {t('COLON', ':')}
          </div>
          <div className="font-weight-bold">
            {t('Chuyến thư')}
            {t('COLON', ':')}
          </div>
          <div>
            {t('Dự định đi')}
            {t('COLON', ':')}
          </div>
        </Col>
        <Col xs={4}>
          <div className="font-weight-bold">
            {t('Đến')}
            {t('COLON', ':')}
          </div>
          <div className="font-weight-bold">
            {t('Trọng lượng')}
            {t('COLON', ':')}
          </div>
          <div>
            {t('Dự định đến')}
            {t('COLON', ':')}
          </div>
        </Col>
        <Col xs={4}>
          <div>bar_code</div>
          <div>
            {t('ID chuyến thư')}
            {t('COLON', ':')}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="font-italic" xs={12}>
          {t('Ghi chú')}
          {t('COLON', ':')}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>{renderTable()}</Col>
      </Row>
      <Row className="mb-4">
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên đóng chuyến thư')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Kiểm soát viên')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Hộ tống lái xe')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên nhận chuyến thư')}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrintablePhieuGiaoNhanChuyenThu;
