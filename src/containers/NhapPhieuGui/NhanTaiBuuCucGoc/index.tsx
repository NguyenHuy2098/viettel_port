import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { select_CountZTMI0240 } from 'redux/ZTMI240/selectors';
import BuuGuiChuaDongBangKe from 'containers/KhaiThacDi/DongBangKe/BuuGuiChuaDongBangKe';
import QuetMa from './QuetMa';
// import PhieuGuiChuaDongBangKe from './PhieuGuiChuaDongBangKe';

// eslint-disable-next-line max-lines-per-function
function NhanTaiBuuCucGoc(): JSX.Element {
  const { t } = useTranslation();
  const listPhieuGuiChuaDongBangKeCount = useSelector(select_CountZTMI0240);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Quét mã phiếu gửi')}</h1>
      </Row>
    );
  }

  const [tab, setTab] = useState<number>(2);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Quét mã')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Phiếu gửi chưa đóng bảng kê')}
              <Badge color="primary">{listPhieuGuiChuaDongBangKeCount}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <QuetMa handleChangeTab={handleChangeTab} />
          </TabPane>
          <TabPane tabId={2}>
            <BuuGuiChuaDongBangKe />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default NhanTaiBuuCucGoc;
