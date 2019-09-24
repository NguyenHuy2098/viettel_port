import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import moment from 'moment';
import { generatePath } from 'react-router';
import { size, trim } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorCountChuyenThuChuaNhanTaiKien, makeSelectorRowSize } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import ChuyenThuChuaNhanTaiKien from './ChuyenThuChuaNhanTaiKien';
import TaiDaNhan from './TaiDaNhan';
import NhanRiengTaiKien from './NhanRiengTaiKien';

// eslint-disable-next-line max-lines-per-function
const NhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const dispatch = useDispatch();
  const maBP = useSelector(makeSelectorMaBP);
  const countChuyenThuChuaNhanTaiKien = useSelector(makeSelectorCountChuyenThuChuaNhanTaiKien);
  const countTaiDaNhan = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));
  const countNhanRiengTaiKien = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.CHUYEN_THU_DA_QUET_NHAN));

  const getChuyenThuChuaNhanTaiKien = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.CHUYEN_THU,
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: maBP,
        IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: IV_PAGENO,
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  const getTaiDaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.TAI,
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: maBP,
        IV_CUST_STATUS: SipDataState.TAI_KIEN_DA_QUET_NHAN,
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: IV_PAGENO,
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  const getTaiKienChuaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.TAI,
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: maBP,
        IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: IV_PAGENO,
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  useEffect((): void => {
    getChuyenThuChuaNhanTaiKien(1);
    getTaiDaNhan(1);
    getTaiKienChuaNhan(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  function handleTraCuuTaiKien(e: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = e.currentTarget.value;
    if (size(trim(thisValue)) && e.keyCode === 13) {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: thisValue })));
    }
  }

  return (
    <>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Nhận tải kiện')}</h1>
        <div className="sipTitleRightBlockInput m-0">
          <i className="fa fa-search" />
          <Input type="text" placeholder={t('Tra cứu tải/kiện')} onKeyUp={handleTraCuuTaiKien} />
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
