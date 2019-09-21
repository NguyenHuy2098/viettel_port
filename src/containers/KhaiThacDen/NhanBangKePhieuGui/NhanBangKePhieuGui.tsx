import React, { KeyboardEvent, useEffect } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { generatePath, match } from 'react-router';
import { forEach, size, trim } from 'lodash';
import { push } from 'connected-react-router';
import moment from 'moment';

import { makeSelector046CountChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { makeSelectorBangKeChuaNhanPhieuGui, makeSelectorTaiChuaNhanBKPhieuGui } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import routesMap from 'utils/routesMap';
import { SipDataState } from 'utils/enums';
import { recordHasAtLeastOneChildHaveLifeCycle108, recordHaveAtLeastOneChildHaveLifeCycle603Or403 } from 'utils/helper';
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
  const [tab, setTab] = useState<number>(1);
  const countBangKeDaNhan = useSelector(makeSelector046CountChildrenByLifecycle(SipDataState.BANG_KE_DA_QUET_NHAN));
  const taiChuaNhanBKPhieuGuiRawRecords = useSelector(makeSelectorTaiChuaNhanBKPhieuGui);
  const bangKeChuaNhanPhieuGuiRawRecords = useSelector(makeSelectorBangKeChuaNhanPhieuGui);
  const [taiChuaNhanBKPhieuGuiRecords, setTaiChuaNhanBKPhieuGuiRecords] = useState<API.RowMTZTMI047OUT[]>([]);
  const [bangKeChuaNhanPhieuGuiRecords, setBangKeChuaNhanPhieuGuiRecords] = useState<API.RowMTZTMI047OUT[]>([]);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const getTaiChuaNhanBKPhieuGuiRawRecords = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC2',
        IV_FR_LOC_ID: 'BDH',
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: '108',
        IV_FR_DATE: '20190701',
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '100',
      }),
    );
  };

  const getBangKeChuaNhanPgRawRecords = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC1',
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: 'BDH',
        IV_CUST_STATUS: '109',
        IV_FR_DATE: '20190701',
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '100',
      }),
    );
  };
  useEffect((): void => {
    getTaiChuaNhanBKPhieuGuiRawRecords();
    getBangKeChuaNhanPgRawRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    const tempArray: API.RowMTZTMI047OUT[] = [];
    forEach(taiChuaNhanBKPhieuGuiRawRecords, el => {
      if (recordHasAtLeastOneChildHaveLifeCycle108(el)) {
        tempArray.push(el);
      }
    });
    setTaiChuaNhanBKPhieuGuiRecords(tempArray);
  }, [taiChuaNhanBKPhieuGuiRawRecords]);

  useEffect((): void => {
    const tempArray: API.RowMTZTMI047OUT[] = [];
    forEach(bangKeChuaNhanPhieuGuiRawRecords, el => {
      if (recordHaveAtLeastOneChildHaveLifeCycle603Or403(el)) {
        tempArray.push(el);
      }
    });
    setBangKeChuaNhanPhieuGuiRecords(tempArray);
  }, [bangKeChuaNhanPhieuGuiRawRecords]);

  function handleForwardingSearch(e: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = e.currentTarget.value;
    if (size(trim(thisValue)) && e.keyCode === 13) {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: thisValue })));
    }
  }

  return (
    <>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Nhận bảng kê / phiếu gửi')}</h1>
        <div className="sipTitleRightBlockInput m-0">
          <i className="fa fa-search" />
          <Input type="text" placeholder={t('Tra cứu bảng kê/phiếu gửi ')} onKeyUp={handleForwardingSearch} />
        </div>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Tải chưa nhận BK/phiếu gửi')}
              <Badge color="primary">{size(taiChuaNhanBKPhieuGuiRecords)}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê chưa nhận PG')}
              <Badge color="primary">{size(bangKeChuaNhanPhieuGuiRecords)}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Nhận riêng bảng kê/phiếu gửi')}
              <Badge color="primary">{countBangKeDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiChuaNhanBKPhieuGui tableRows={taiChuaNhanBKPhieuGuiRecords} match={props.match} />
          </TabPane>
          <TabPane tabId={2}>
            <BangKeChuaNhanPhieuGui tableRows={bangKeChuaNhanPhieuGuiRecords} match={props.match} />
          </TabPane>
          <TabPane tabId={3}>
            <NhanRiengBangKePhieuGui tableRows={bangKeChuaNhanPhieuGuiRecords} match={props.match} />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanBangKePhieuGui;
