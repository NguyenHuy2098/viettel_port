import * as React from 'react';
import { Button, Input, Table, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const FreightOrderReceive: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
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
              <th>{t('Mã chuyển thư')}</th>
              <th>{t('Bưu cục đi')}</th>
              <th>{t('Bưu cục đến')}</th>
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
              <td>CT_4587_KDV</td>
              <td>KDV</td>
              <td>NT2</td>
              <td>11:12 ∙ 19/05/2019</td>
              <td>Chuyển hỏa tốc về bưu cục gốc</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <h1 className="sipTitle">{t('Khai thác chuyển thư đến')}</h1>
      <div className="row mt-3" />
      <div className="mt-3" />
      <div className="sipTableSearch">
        <Row>
          <Col className="col-3">
            <Input type="text" placeholder={t('Mã chuyển thư')} />
          </Col>
          <Col className="col-1">
            <Button>{t('Tìm kiếm')}</Button>
          </Col>
          <Col className="col-8">
            <p className="text-right">
              Tổng số: <span>1</span>
            </p>
          </Col>
        </Row>
      </div>
      {renderTable()}
    </div>
  );
};

export default FreightOrderReceive;
