import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { generatePath } from 'react-router';
import { size, trim } from 'lodash';

import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorCountChuyenThuChuaNhanTaiKien, makeSelectorRowSize } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import ChuyenThuChuaNhanTaiKien from './ChuyenThuChuaNhanTaiKien';
import TaiDaNhan from './TaiDaNhan';
import NhanRiengTaiKien from './NhanRiengTaiKien';

// eslint-disable-next-line max-lines-per-function
const NhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(
    Number(sessionStorage.getItem('tabNhanTaiKien') ? sessionStorage.getItem('tabNhanTaiKien') : 1),
  );
  const dispatch = useDispatch();
  const countChuyenThuChuaNhanTaiKien = useSelector(makeSelectorCountChuyenThuChuaNhanTaiKien);
  const countTaiDaNhan = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));
  const countNhanRiengTaiKien = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.CHUYEN_THU_DA_QUET_NHAN));

  const getChuyenThuChuaNhanTaiKien = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getTaiDaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAI_KIEN_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getTaiKienChuaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  useEffect((): void => {
    getChuyenThuChuaNhanTaiKien(1);
    getTaiDaNhan(1);
    getTaiKienChuaNhan(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTab = (tab: number): void => {
    sessionStorage.setItem('tabNhanTaiKien', tab.toString());
    setTab(tab);
  };

  const handleTraCuuTaiKien = (event: KeyboardEvent<HTMLInputElement>): void => {
    const thisValue = event.currentTarget.value;
    if (size(trim(thisValue)) && event.keyCode === 13) {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: thisValue })));
    }
  };

  const renderToolbar = (): JSX.Element => (
    <Row className="mb-3 sipTitleContainer">
      <Col className="px-0" md={8}>
        <h3>{t('Nhận tải kiện')}</h3>
      </Col>
      <Col className="px-0" md={4}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text">
              <i className="fa fa-search" />
            </span>
          </InputGroupAddon>
          <Input type="text" placeholder={t('Tra cứu tải/kiện')} onKeyUp={handleTraCuuTaiKien} />
        </InputGroup>
      </Col>
    </Row>
  );

  return (
    <>
      {renderToolbar()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs className="shadow-sm">
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Chuyến thư chưa nhận tải/kiện')}
              <Badge color="primary">{countChuyenThuChuaNhanTaiKien}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải đã nhận')}
              <Badge color="primary">{countTaiDaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Nhận riêng tải/kiện')}
              <Badge color="primary">{countNhanRiengTaiKien}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <ChuyenThuChuaNhanTaiKien getChuyenThuChuaNhanTaiKien={getChuyenThuChuaNhanTaiKien} />
          </TabPane>
          <TabPane tabId={2}>
            <TaiDaNhan getTaiDaNhan={getTaiDaNhan} />
          </TabPane>
          <TabPane tabId={3}>
            <NhanRiengTaiKien getTaiKienChuaNhan={getTaiKienChuaNhan} />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanTaiKien;
