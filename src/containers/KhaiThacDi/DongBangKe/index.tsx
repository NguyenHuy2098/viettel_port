import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { get, size, toString, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { push } from 'connected-react-router';
import moment from 'moment';
import routesMap from 'utils/routesMap';
import { generatePath } from 'react-router';
import { SipDataState, SipDataType } from 'utils/enums';
import queryString from 'query-string';
import { History } from 'history';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import BangKeChuaHoanThanh from './BangKeChuaHoanThanh';
import BuuGuiChuaDongBangKe from './BuuGuiChuaDongBangKe';
import BangKeDaDong from './BangKeDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabParams = queryString.parse(get(props, 'history.location.search', {}));
  const userMaBp = useSelector(makeSelectorMaBP);

  const getListBangKe = useCallback(
    function(): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: userMaBp,
          IV_CUST_STATUS: '101',
          IV_FR_DATE: moment().format('YYYYMMDD'),
          IV_TO_DATE: moment().format('YYYYMMDD'),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp],
  );

  const [tab, setTab] = useState<number>(1);
  const countBangKeChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH),
  );
  const countBangKeDaDong = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.DA_DONG));
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
    dispatch(action_MIOA_ZTMI045(payloadGetPostOfficeList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  useEffect((): void => {
    if (tabParams.tab) {
      setTab(parseInt(toString(tabParams.tab)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParams]);

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
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: thisValue })));
    }
  }

  // eslint-disable-next-line max-lines-per-function
  function TaoBangKe(): JSX.Element {
    return (
      <>
        <Button onClick={toggleCreateForwardingItemModal}>
          <i className="fa fa-plus" />
          {t('Tạo bảng kê')}
        </Button>
        <CreateForwardingItemModal
          onSuccessCreated={getListBangKe}
          visible={createForwardingItemModal}
          onHide={toggleCreateForwardingItemModal}
          modalTitle={t('Tạo bảng kê')}
          IV_TOR_TYPE="ZC1"
        />
      </>
    );
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu bảng kê')} onKeyUp={handleForwardingSearch} />
          </div>
          <TaoBangKe />
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
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê chưa hoàn thành')}
              <Badge color="primary">{countBangKeChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng BK')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              // eslint-disable-next-line react-hooks/exhaustive-deps
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Bảng Kê đã đóng')}
              <Badge color="primary">{countBangKeDaDong}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <BangKeChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <BuuGuiChuaDongBangKe />
          </TabPane>
          <TabPane tabId={3}>
            <BangKeDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongBangKe;
