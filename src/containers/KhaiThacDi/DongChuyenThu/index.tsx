import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { noop, size, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import {
  makeSelectorCountChuyenThuChuaHoanThanh,
  makeSelectorCountTaiChuaHoanThanh,
  makeSelectorCountChuyenThuDaDong,
} from 'redux/MIOA_ZTMI047/selectors';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import routesMap from 'utils/routesMap';
import ChuyenThuChuaHoanThanh from './ChuyenThuChuaHoanThanh';
import TaiChuaDongChuyenThu from './TaiChuaDongChuyenThu';
import KienChuaDongChuyenThu from './KienChuaDongChuyenThu';
import ChuyenThuDaDong from './ChuyenThuDaDong';

// eslint-disable-next-line max-lines-per-function
const DongChuyenThu: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);
  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountChuyenThuChuaHoanThanh);
  const countChuyenThuDaDong = useSelector(makeSelectorCountChuyenThuDaDong);
  const countTaiChuaHoanThanh = useSelector(makeSelectorCountTaiChuaHoanThanh);

  const payloadGetPostOfficeList = {
    row: [
      {
        IV_LOCTYPE: 'V001',
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
      dispatch(push(`${routesMap.DANH_SACH_TAI_KIEN}/${thisValue}`));
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
            onSuccessCreated={noop}
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
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('CT chưa hoàn thành')}
              <Badge color="primary">{countChuyenThuChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải chưa đóng chuyến thư')}
              <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Kiện chưa đóng chuyến thư')}
              <Badge color="primary">0</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
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
