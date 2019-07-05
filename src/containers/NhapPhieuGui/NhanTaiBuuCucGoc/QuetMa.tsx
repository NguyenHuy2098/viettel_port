import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row, Table } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const QuetMa: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderForwardingOrderCodeScan(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
        <p className="pull-right m-0">Tổng số: 50</p>
      </div>
    );
  }

  function renderForwardingOrderTableAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  function renderForwardingOrderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipBoxShadow">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Số vận đơn')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày gửi')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>00843186002</td>
              <td>BNE</td>
              <td>5</td>
              <td>250g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderForwardingOrderTableAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  return (
    <>
      {renderForwardingOrderCodeScan()}
      {renderForwardingOrderTable()}
    </>
  );
};

export default QuetMa;
