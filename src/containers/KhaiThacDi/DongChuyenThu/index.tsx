import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { History } from 'history';
import { get, size, toString, trim } from 'lodash';
import moment from 'moment';
import queryString from 'query-string';

import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import { action_ZTMI236 } from 'redux/ZTMI236/actions';
import { makeSelectorZTMI236OUTRowCount } from 'redux/ZTMI236/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import ChuyenThuChuaHoanThanh from './ChuyenThuChuaHoanThanh';
import TaiChuaDongChuyenThu from './TaiChuaDongChuyenThu';
import KienChuaDongChuyenThu from './KienChuaDongChuyenThu';
import ChuyenThuDaDong from './ChuyenThuDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState<number>(1);
  const tabParams = queryString.parse(get(props, 'history.location.search', {}));
  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);
  const maBP = useSelector(makeSelectorMaBP);
  const countChuyenThuChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH),
  );
  const countChuyenThuDaDong = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU),
  );
  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const countKienChuaDongChuyenThu = useSelector(makeSelectorZTMI236OUTRowCount);

  function handleChangeTab(tab: number): void {
    setTab(tab);
    dispatch(
      push({
        pathname: routesMap.DONG_CHUYEN_THU,
        search: queryString.stringify({ tab }),
      }),
    );
  }

  useEffect((): void => {
    if (tabParams.tab) {
      setTab(parseInt(toString(tabParams.tab)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParams]);

  const getListChuyenThuTaoMoi = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.CHUYEN_THU,
        IV_FR_LOC_ID: maBP,
        IV_CUST_STATUS: SipDataState.TAO_MOI,
        IV_FR_DATE: moment().format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO,
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  const getListTaiChuaDongChuyenThu = (IV_PAGENO = 1, IV_TOR_ID = ''): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID,
        IV_TOR_TYPE: SipDataType.TAI,
        IV_FR_LOC_ID: maBP,
        IV_CUST_STATUS: SipDataState.TAO_MOI,
        IV_FR_DATE: moment().format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO,
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  const getListKienChuaDongChuyenThu = (IV_PAGE_NO = 1, IV_PACKAGE_ID = ''): void => {
    dispatch(
      action_ZTMI236({
        IV_PACKAGE_ID,
        IV_FREIGHT_UNIT_TYPE: SipDataType.KIEN,
        IV_FREIGHT_UNIT_STATUS: ['306', '402'],
        IV_LOC_ID: maBP,
        IV_FR_DATE: moment().format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGE_NO,
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  useEffect((): void => {
    getListKienChuaDongChuyenThu();
    dispatch(
      action_MIOA_ZTMI045({
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
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  function handleForwardingSearch(event: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = event.currentTarget.value;
    if (size(trim(thisValue)) && event.keyCode === 13) {
      dispatch(push(generatePath(routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU, { idChuyenThu: thisValue })));
    }
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng chuyến thư')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu chuyến thư')} onKeyUp={handleForwardingSearch} />
          </div>
          <Button onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-plus" />
            {t('Tạo chuyến thư')}
          </Button>
          <CreateForwardingItemModal
            onSuccessCreated={getListChuyenThuTaoMoi}
            visible={createForwardingItemModal}
            onHide={toggleCreateForwardingItemModal}
            modalTitle={t('Tạo chuyến thư')}
            IV_TOR_TYPE="ZC3"
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
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('CT chưa hoàn thành')}
              <Badge color="primary">{countChuyenThuChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải chưa đóng chuyến thư')}
              <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Kiện chưa đóng chuyến thư')}
              <Badge color="primary">{countKienChuaDongChuyenThu}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={useCallback((): void => handleChangeTab(4), [])}
            >
              {t('Chuyến Thư đã đóng')}
              <Badge color="primary">{countChuyenThuDaDong}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <ChuyenThuChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <TaiChuaDongChuyenThu getListTaiChuaDongChuyenThu={getListTaiChuaDongChuyenThu} />
          </TabPane>
          <TabPane tabId={3}>
            <KienChuaDongChuyenThu getListKienChuaDongChuyenThu={getListKienChuaDongChuyenThu} />
          </TabPane>
          <TabPane tabId={4}>
            <ChuyenThuDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongChuyenThu;
