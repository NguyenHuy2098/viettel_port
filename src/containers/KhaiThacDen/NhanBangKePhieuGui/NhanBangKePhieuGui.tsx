import React, { useEffect } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { match } from 'react-router';
import { forEach, size } from 'lodash';
import moment from 'moment';

import { checkChildsLifeCycle } from 'utils/helper';
import { makeSelectorCountBangKeDaNhan } from 'redux/MIOA_ZTMI046/selectors';
import { makeSelectorTaiChuaNhanBKPhieuGui } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import BangKeDaNhan from './BangKeDaNhan';
import TaiChuaNhanBKPhieuGui from './TaiChuaNhanBKPhieuGui';

interface Props {
  match: match;
}
// eslint-disable-next-line max-lines-per-function
const NhanBangKePhieuGui: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  const [tab, setTab] = useState<number>(1);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  const countBangKeDaNhan = useSelector(makeSelectorCountBangKeDaNhan);
  const dispatch = useDispatch();

  const taiChuaNhanBKPhieuGuiRecords = useSelector(makeSelectorTaiChuaNhanBKPhieuGui);

  const [tableRows, setTableRows] = useState<API.RowMTZTMI047OUT[]>([]);

  const dispatch_Action_MIOA_ZTMI047 = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC2',
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: 'HUB1',
        IV_CUST_STATUS: '108',
        IV_FR_DATE: '20100828',
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };
  useEffect((): void => {
    dispatch_Action_MIOA_ZTMI047();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    const tableRows: API.RowMTZTMI047OUT[] = [];
    forEach(taiChuaNhanBKPhieuGuiRecords, el => {
      if (checkChildsLifeCycle(el)) {
        tableRows.push(el);
      }
    });
    setTableRows(tableRows);
  }, [taiChuaNhanBKPhieuGuiRecords]);

  return (
    <>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Nhận bảng kê / phiếu gửi')}</h1>
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
              <Badge color="primary">{size(tableRows)}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê chưa nhận PG')}
              <Badge color="primary">{countBangKeDaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Nhân riêng bảng kê/phiếu gửi')}
              <Badge color="primary">{countBangKeDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiChuaNhanBKPhieuGui tableRows={tableRows} match={props.match} />
          </TabPane>
          <TabPane tabId={2}>
            <BangKeDaNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanBangKePhieuGui;
