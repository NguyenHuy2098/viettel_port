import * as React from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const ThongTinBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
      </>
    );
  }

  function renderTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>{t('Số vận đơn')}</th>
              <th>{t('Bưu cục đi')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày tạo')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>BK-2683077-TTKT1</td>
              <td>TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>Nguyễn Văn An</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <h1 className="sipTitle">
        <i className="fa fa-arrow-left"></i> {t('Thông tin bảng kê')}
      </h1>
      <div className="sipTitleRightBlock">
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-trash-o" />
        </Button>
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-print" />
        </Button>
      </div>
      <div className="row mt-3" />
      <div className="sipSummaryContent">
        <Row>
          <Col className="col-1">{t('Mã bảng kê')}: </Col>
          <Col className="col-3">BK_1209_BNH</Col>
          <Col className="col-1">{t('Bưu cục đến')}: </Col>
          <Col className="col-1">TQN</Col>
          <Col className="col-5" />
          <Col className="col-1">{t('Tổng số')}: 5</Col>
        </Row>
        <Row>
          <Col className="col-1">{t('Ngày tạo')}: </Col>
          <Col className="col-3">24/04/2019</Col>
          <Col className="col-1">{t('Ngày gửi')}: </Col>
          <Col className="col-1">24/04/2019</Col>
        </Row>
        <Row>
          <Col className="col-1">{t('Ghi chú')}: </Col>
          <Col className="col-3">{t('Chuyển hoàn về bưu cục gốc')}: </Col>
        </Row>
      </div>
      {renderTable()}
    </>
  );
};

export default ThongTinBangKe;
