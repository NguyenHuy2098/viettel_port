import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Nav, NavLink, NavItem, Row, Table, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { map } from 'lodash';

const tempData = [
  {
    numberPos: '41100035876',
    destination: 'BNE',
    count: 10,
    weight: 250,
    date: '19/6/2019',
  },
  {
    numberPos: '41100035877',
    destination: 'BNE',
    count: 10,
    weight: 250,
    date: '19/6/2019',
  },
  {
    numberPos: '41100035878',
    destination: 'BNE',
    count: 10,
    weight: 250,
    date: '19/6/2019',
  },
  {
    numberPos: '41100035879',
    destination: 'BNE',
    count: 10,
    weight: 250,
    date: '19/6/2019',
  },
];

// eslint-disable-next-line max-lines-per-function
const CommunicateCustomer: React.FC = (props): JSX.Element => {
  const [isTab, setTab] = useState<number | string>('1');
  const handleClickTab = (value: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setTab(value);
  };

  const { t } = useTranslation();

  function renderTitle(): JSX.Element {
    return (
      <Row className="sipOrderShippingInformationTitle mb-2">
        <Col>
          <h1 className="sipTitle">{t('Tiếp xúc khách hàng')}</h1>
        </Col>
        <div className="sipTitleRightBlock">
          <Button>{t('Ghi lại')}</Button>
          <Button>{t('In bảng kê')}</Button>
          <Button>{t('Thoát')}</Button>
        </div>
      </Row>
    );
  }

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
      <div className="sipTableContainer">
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
            {map(tempData, item => (
              <tr key={item.numberPos}>
                <td>
                  <input type="checkbox" className="mr-2" />
                  {item.numberPos}
                </td>
                <td> {item.destination}</td>
                <td>{item.count}</td>
                <td>{item.weight} g</td>
                <td>{item.date}</td>
                <td className="SipTableFunctionIcon">{renderAction()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  return (
    <div>
      {renderTitle()}
      <Nav tabs className="tabOrderShippingInformation">
        <NavItem>
          <NavLink className={classnames({ active: isTab === '1' })} onClick={handleClickTab('1')}>
            Khách
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: isTab === '2' })} onClick={handleClickTab('2')}>
            THD (0)
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: isTab === '2' })} onClick={handleClickTab('3')}>
            HQM (11)
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames({ active: isTab === '2' })} onClick={handleClickTab('4')}>
            HPM (2)
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={isTab}>
        <TabPane tabId="1">{renderTable()}</TabPane>
        <TabPane tabId="2">{renderTable()}</TabPane>
        <TabPane tabId="3">{renderTable()}</TabPane>
        <TabPane tabId="4">{renderTable()}</TabPane>
      </TabContent>
    </div>
  );
};
export default CommunicateCustomer;
