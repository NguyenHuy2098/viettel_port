import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import DonHopLe from './DonHopLe';

// eslint-disable-next-line max-lines-per-function
const InputRevenue: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Nhập từ file excel</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-file-excel-o" />
            Lấy file mẫu
          </Button>
          <Button>
            <i className="fa fa-file-archive-o" />
            Tải lên
          </Button>
          <Button>
            <i className="fa fa-download" />
            Hoàn thành
          </Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Đơn hợp lệ')}
              <Badge color="primary">01</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Đơn không hợp lệ')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Phiếu gửi chưa đóng BK')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
              onClick={React.useCallback((): void => handleChangeTab(4), [])}
            >
              {t('Lịch sử tải lên')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <DonHopLe />
          </TabPane>
          <TabPane tabId={2}>tab 2</TabPane>
          <TabPane tabId={3}>tab 3</TabPane>
          <TabPane tabId={4}>tab 4</TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default InputRevenue;
