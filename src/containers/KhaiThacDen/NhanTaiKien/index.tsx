import React, { useCallback, useState } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import TaiKienChuaNhan from './ChuyenThuChuaNhanTaiKien';
import TaiDaNhan from './TaiDaNhan';
import NhanRiengTaiKien from './NhanRiengTaiKien';

// eslint-disable-next-line max-lines-per-function
const NhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  return (
    <>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Nhận tải kiện')}</h1>
        <div className="sipTitleRightBlockInput m-0">
          <i className="fa fa-search" />
          <Input type="text" placeholder={t('Tra cứu tải/kiện')} />
        </div>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs className="shadow-sm">
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Chuyến thư chưa nhận tải/kiện')}
              <Badge color="primary">01</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải đã nhận')}
              <Badge color="primary">05</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Nhận riêng tải/kiện')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiKienChuaNhan />
          </TabPane>
          <TabPane tabId={2}>
            <TaiDaNhan />
          </TabPane>
          <TabPane tabId={3}>
            <NhanRiengTaiKien />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanTaiKien;
