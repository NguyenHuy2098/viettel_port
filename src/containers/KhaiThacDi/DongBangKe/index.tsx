import React, { useEffect, useState } from 'react';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { History } from 'history';
import queryString from 'query-string';
import { get, toString } from 'lodash';

import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
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

  const getListBangKe = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

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

  const toggleCreateForwardingItemModal = (): void => {
    setCreateForwardingItemModal(!createForwardingItemModal);
  };

  useEffect((): void => {
    if (tabParams.tab) {
      setTab(parseInt(toString(tabParams.tab)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParams]);

  const handleChangeTab = (tab: number): void => {
    setTab(tab);
    props.history.push({
      pathname: props.history.location.pathname,
      search: queryString.stringify({
        tab,
      }),
    });
  };

  const TaoBangKe = (): JSX.Element => {
    return (
      <>
        <Button className="ml-2" color="primary" onClick={toggleCreateForwardingItemModal}>
          <i className="fa fa-plus mr-2" />
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
  };

  const renderTitle = (): JSX.Element => {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê')}</h1>
        <div className="sipTitleRightBlock">
          <TaoBangKe />
        </div>
      </Row>
    );
  };

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
          {tab === 1 && <BangKeChuaHoanThanh />}
          {tab === 2 && <BuuGuiChuaDongBangKe />}
          {tab === 3 && <BangKeDaDong />}
        </TabContent>
      </div>
    </>
  );
};

export default DongBangKe;
