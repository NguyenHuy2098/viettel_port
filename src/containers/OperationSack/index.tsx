import * as React from 'react';
import { Button, Input, Label, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const OperationSack: React.FC = (): JSX.Element => {
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
              <th>{t('Mã tải')}</th>
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
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>TAI_4587_KDV</td>
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
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Khai thác tải')}</h1>
      </Row>

      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Mã tải" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>
      {renderTable()}
    </div>
  );
};

export default OperationSack;
