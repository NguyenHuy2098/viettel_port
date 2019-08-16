import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Row, Table } from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const DonHopLe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  function renderAction(): JSX.Element {
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

  function renderTable(): JSX.Element {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>Số vận đơn</th>
              <th>Bưu cục đến</th>
              <th>Số lượng</th>
              <th>Trọng lượng</th>
              <th>Ngày gửi</th>
              <th>Quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td></td>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Đã chọn')}: <span className="color-primary">02/03</span>
          </p>
        </Col>
      </Row>e
      <div className="mt-3" />
      <Row className="sipTableContainer">{renderTable()}</Row>
    </>
  );
};
export default DonHopLe;
