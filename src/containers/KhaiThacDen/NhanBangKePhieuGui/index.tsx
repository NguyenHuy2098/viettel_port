import React, { KeyboardEvent, useEffect } from 'react';
import {
  Row,
  TabContent,
  Col,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { generatePath, match } from 'react-router';
import { size, trim } from 'lodash';
import { push } from 'connected-react-router';

import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import {
  makeSelectorCountBangKeChuaNhanPhieuGui,
  makeSelectorCountTaiChuaNhanBangKePhieuGui,
} from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import TaiChuaNhanBKPhieuGui from './TaiChuaNhanBKPhieuGui';
import BangKeChuaNhanPhieuGui from './BangKeChuaNhanPhieuGui';
import NhanRiengBangKePhieuGui from './NhanRiengBangKePhieuGui';

interface Props {
  match: match;
}
// eslint-disable-next-line max-lines-per-function
const NhanBangKePhieuGui: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(
    Number(sessionStorage.getItem('tabNhanBangKePhieuGui') ? sessionStorage.getItem('tabNhanBangKePhieuGui') : 1),
  );
  const countTaiChuaNhanBangKePhieuGui = useSelector(makeSelectorCountTaiChuaNhanBangKePhieuGui);
  const countBangKeChuaNhanPhieuGui = useSelector(makeSelectorCountBangKeChuaNhanPhieuGui);

  function handleChangeTab(tab: number): void {
    sessionStorage.setItem('tabNhanBangKePhieuGui', tab.toString());
    setTab(tab);
  }

  const getTaiKienDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAI_KIEN_DA_QUET_NHAN,
          IV_PAGENO,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getBangKeDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_CUST_STATUS: SipDataState.BANG_KE_DA_QUET_NHAN,
          IV_PAGENO,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  useEffect((): void => {
    getTaiKienDaQuetNhan();
    getBangKeDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleForwardingSearch(event: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = trim(event.currentTarget.value);
    if (size(thisValue) && event.keyCode === 13) {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: thisValue })));
    }
  }

  const renderToolbar = (): JSX.Element => (
    <Row className="mb-3 sipTitleContainer">
      <Col className="px-0" md={8}>
        <h3>{t('Nhận bảng kê / phiếu gửi')}</h3>
      </Col>
      <Col className="px-0" md={4}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text">
              <i className="fa fa-search" />
            </span>
          </InputGroupAddon>
          <Input
            className="w-25"
            type="search"
            placeholder={t('Tra cứu bảng kê/phiếu gửi ')}
            onKeyUp={handleForwardingSearch}
          />
        </InputGroup>
      </Col>
    </Row>
  );

  return (
    <>
      {renderToolbar()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Tải chưa nhận bảng kê / phiếu gửi')}
              <Badge color="primary">{countTaiChuaNhanBangKePhieuGui}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê chưa nhận phiếu gửi')}
              <Badge color="primary">{countBangKeChuaNhanPhieuGui}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Nhận riêng bảng kê / phiếu gửi')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiChuaNhanBKPhieuGui getTaiKienDaQuetNhan={getTaiKienDaQuetNhan} />
          </TabPane>
          <TabPane tabId={2}>
            <BangKeChuaNhanPhieuGui getBangKeDaQuetNhan={getBangKeDaQuetNhan} />
          </TabPane>
          <TabPane tabId={3}>
            <NhanRiengBangKePhieuGui />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanBangKePhieuGui;
