import React, { useCallback } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Nav, NavLink, NavItem, Row, Table, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

interface ItemType {
  numberPos: string;
  destination: string;
  count: number;
  weight: number;
  date: string;
}

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
  const { t } = useTranslation();

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Tiếp xúc khách hàng')}</h1>
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
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Số vận đơn')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày gửi')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            {tempData.map(
              (item: ItemType): JSX.Element => {
                return (
                  <tr key={item.numberPos}>
                    <td>
                      <Label check>
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.numberPos}</td>
                    <td> {item.destination}</td>
                    <td>{item.count}</td>
                    <td>{item.weight} g</td>
                    <td>{item.date}</td>
                    <td className="SipTableFunctionIcon">{renderAction()}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
      </Row>
    );
  }

  const [tab, setTab] = useState<number>(1);
  function handleClickTab(tab: number): void {
    setTab(tab);
  }

  return (
    <div>
      {renderTitle()}
      <div className="sipTabContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 1 })}
              onClick={useCallback((): void => handleClickTab(1), [])}
            >
              Khách
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 2 })}
              onClick={useCallback((): void => handleClickTab(2), [])}
            >
              THD (0)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 3 })}
              onClick={useCallback((): void => handleClickTab(3), [])}
            >
              HQM (11)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 4 })}
              onClick={useCallback((): void => handleClickTab(4), [])}
            >
              HPM (2)
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab}>
          <TabPane tabId={1}>{renderTable()}</TabPane>
          <TabPane tabId={2}>{renderTable()}</TabPane>
          <TabPane tabId={3}>{renderTable()}</TabPane>
          <TabPane tabId={4}>{renderTable()}</TabPane>
        </TabContent>
      </div>
    </div>
  );
};
export default CommunicateCustomer;
