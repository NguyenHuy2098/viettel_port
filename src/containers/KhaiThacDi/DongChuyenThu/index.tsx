import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { get, size, toString, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import routesMap from 'utils/routesMap';
import { push } from 'connected-react-router';
import moment from 'moment';
import { SipDataState, SipDataType } from 'utils/enums';
import queryString from 'query-string';
import { History } from 'history';
import { makeSelectorMaBP } from 'redux/auth/selectors';
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
  const tabParams = queryString.parse(get(props, 'history.location.search', {}));
  const userMaBp = useSelector(makeSelectorMaBP);

  const getListChuyenThu = useCallback(
    function(): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC3',
          IV_FR_LOC_ID: userMaBp,
          IV_CUST_STATUS: '101',
          IV_FR_DATE: trim(toString(moment().format(' YYYYMMDD'))),
          IV_TO_DATE: trim(toString(moment().format(' YYYYMMDD'))),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp],
  );

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
    props.history.push({
      pathname: props.history.location.pathname,
      search: queryString.stringify({
        tab,
      }),
    });
  }

  useEffect((): void => {
    if (tabParams.tab) {
      setTab(parseInt(toString(tabParams.tab)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParams]);

  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

  const countChuyenThuChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH),
  );
  const countChuyenThuDaDong = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU),
  );
  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));

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
    dispatch(action_MIOA_ZTMI045(payloadGetPostOfficeList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  function handleForwardingSearch(e: KeyboardEvent<HTMLInputElement>): void {
    const thisValue = e.currentTarget.value;
    if (size(trim(thisValue)) && e.keyCode === 13) {
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
            onSuccessCreated={getListChuyenThu}
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
              <Badge color="primary">0</Badge>
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
            <TaiChuaDongChuyenThu />
          </TabPane>
          <TabPane tabId={3}>
            <KienChuaDongChuyenThu />
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
