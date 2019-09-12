import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import { forEach, size } from 'lodash';

import { makeSelectorNhanRiengTaiKien, makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import ChuyenThuChuaNhanTaiKien from './ChuyenThuChuaNhanTaiKien';
import TaiDaNhan from './TaiDaNhan';
import NhanRiengTaiKien from './NhanRiengTaiKien';

// eslint-disable-next-line max-lines-per-function
const NhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const dispatch = useDispatch();

  const nhanRiengTaiKien = useSelector(makeSelectorNhanRiengTaiKien);
  const chuyenThuChuaNhanTaiKien = useSelector(makeSelectorRow('ZC3', 106));

  const [chuyenThuChuaNhanTaiKienFiltered, setChuyenThuChuaNhanTaiKienFiltered] = useState<API.RowMTZTMI047OUT[]>([]);

  const getNhanRiengTaiKienData = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC2',
        IV_FR_LOC_ID: '',

        IV_TO_LOC_ID: 'HUB1',
        IV_CUST_STATUS: '106',
        IV_FR_DATE: '20000101',
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  const getChuyenThuChuaNhanTaiKien = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC3',
        IV_FR_LOC_ID: '',

        IV_TO_LOC_ID: 'HUB1',
        IV_CUST_STATUS: '106',
        IV_FR_DATE: '20000101',
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      }),
    );
  };
  useEffect((): void => {
    getNhanRiengTaiKienData();
    getChuyenThuChuaNhanTaiKien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const childLifeCycleIsNot107 = (el: API.RowMTZTMI047OUT): boolean => {
    let isNot107 = true;
    forEach(el.Childs, child => {
      if (child.LIFECYCLE === '107') {
        isNot107 = false;
      }
    });

    return isNot107;
  };

  useEffect((): void => {
    const newChuyenThuChuaNhanTaiKienFiltered: API.RowMTZTMI047OUT[] = [];
    forEach(chuyenThuChuaNhanTaiKien, el => {
      if (childLifeCycleIsNot107(el)) {
        newChuyenThuChuaNhanTaiKienFiltered.push(el);
      }
    });
    setChuyenThuChuaNhanTaiKienFiltered(newChuyenThuChuaNhanTaiKienFiltered);
  }, [chuyenThuChuaNhanTaiKien]);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const getNumberOfNhanRiengTaiKien = useMemo((): number => {
    return size(nhanRiengTaiKien);
  }, [nhanRiengTaiKien]);

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
              <Badge color="primary">{size(chuyenThuChuaNhanTaiKienFiltered)}</Badge>
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
              <Badge color="primary">{getNumberOfNhanRiengTaiKien}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <ChuyenThuChuaNhanTaiKien data={chuyenThuChuaNhanTaiKienFiltered} />
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
