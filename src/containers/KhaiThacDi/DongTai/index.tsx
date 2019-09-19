import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { get, size, toString, trim } from 'lodash';
import classNames from 'classnames';

import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { push } from 'connected-react-router';
import moment from 'moment';
import { generatePath } from 'react-router';
import routesMap from 'utils/routesMap';
import { SipDataState, SipDataType } from 'utils/enums';
import queryString from 'query-string';
import { History } from 'history';
import BuuGuiChuaDongTai from './BuuGuiChuaDongTai';
import TaiChuaHoanThanh from './TaiChuaHoanThanh';
import BangKeChuaDongTai from './BangKeChuaDongTai';
import TaiDaDong from './TaiDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongTai: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabParams = queryString.parse(get(props, 'history.location.search', {}));

  const getListTai = useCallback(
    function(): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC2',
          IV_FR_LOC_ID: 'BDH',
          IV_CUST_STATUS: '101',
          IV_FR_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
          IV_TO_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const [tab, setTab] = useState<number>(1);
  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const countBangKeBuuGuiChuaDongTai = useSelector(
    makeSelectorTotalItem(SipDataType.BUU_GUI_CON, SipDataState.CHUA_HOAN_THANH),
  );
  const countTaiDaDong = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const countBangKeChuaDongTai = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));

  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

  const payloadGetPostOfficeList = {
    row: [
      {
        IV_LOCTYPE: 'V001',
      },
      {
        IV_LOCTYPE: 'V004',
      },
    ],
    IV_BP: '',
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '5000',
  };

  useEffect((): void => {
    if (tabParams.tab) {
      setTab(parseInt(toString(tabParams.tab)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParams]);

  useEffect((): void => {
    dispatch(action_MIOA_ZTMI045(payloadGetPostOfficeList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleChangeTab(tab: number): void {
    setTab(tab);
    props.history.push({
      pathname: props.history.location.pathname,
      search: queryString.stringify({
        tab,
      }),
    });
  }

  function handleForwardingSearch(e: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = e.currentTarget.value;
    if (size(trim(thisValue)) && e.keyCode === 13) {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: thisValue })));
    }
  }

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng tải')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu tải')} onKeyUp={handleForwardingSearch} />
          </div>
          <Button onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-plus" />
            {t('Tạo tải')}
          </Button>
          <CreateForwardingItemModal
            onSuccessCreated={getListTai}
            visible={createForwardingItemModal}
            onHide={toggleCreateForwardingItemModal}
            modalTitle={t('Tạo tải')}
            IV_TOR_TYPE="ZC2"
          />
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
              {t('Tải chưa hoàn thành')}
              <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng tải')}
              <Badge color="primary">{countBangKeBuuGuiChuaDongTai}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Bảng kê chưa đóng tải')}
              <Badge color="primary">{countBangKeChuaDongTai}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
              onClick={React.useCallback((): void => handleChangeTab(4), [])}
            >
              {t('Tải đã đóng')}
              <Badge color="primary">{countTaiDaDong}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <BuuGuiChuaDongTai />
          </TabPane>
          <TabPane tabId={3}>
            <BangKeChuaDongTai />
          </TabPane>
          <TabPane tabId={4}>
            <TaiDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongTai;
