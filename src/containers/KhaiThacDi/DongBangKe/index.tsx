import React, { ChangeEvent, useEffect, useState } from 'react';
import { Badge, Button, Input, Row, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { noop, size, toString, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { makeSelectorCountBangKeChuaHoanThanh, makeSelectorCountBangKeDaDong } from 'redux/MIOA_ZTMI047/selectors';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal/Index';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import moment from 'moment';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import BangKeChuaHoanThanh from './BangKeChuaHoanThanh';
import BuuGuiChuaDongBangKe from './BuuGuiChuaDongBangKe';
import BangKeDaDong from './BangKeDaDong';

// eslint-disable-next-line max-lines-per-function
const DongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tab, setTab] = useState<number>(1);
  const countBangKeChuaHoanThanh = useSelector(makeSelectorCountBangKeChuaHoanThanh);
  const countBangKeDaDong = useSelector(makeSelectorCountBangKeDaDong);
  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

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

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  function handleForwardingSearch(e: ChangeEvent<HTMLInputElement>): void {
    const thisValue = e.currentTarget.value;
    if (size(trim(thisValue))) {
      const searchPayload = {
        IV_TOR_ID: thisValue,
        IV_TOR_TYPE: 'ZC1',
        IV_FR_LOC_ID: 'BDH',
        IV_CUST_STATUS: '101',

        IV_FR_DATE: '20190828',
        IV_TO_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      };
      dispatch(
        action_MIOA_ZTMI047(searchPayload, {
          onSuccess: (data: MIOAZTMI047PayloadType): void => {
            // console.log(data);
          },
          onFailure: (): void => {
            // console.log('Loi!!!');
          },
        }),
      );
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
          onSuccessCreated={noop}
          visible={createForwardingItemModal}
          onHide={toggleCreateForwardingItemModal}
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
            <Input type="text" placeholder={t('Tra cứu bảng kê')} onChange={handleForwardingSearch} />
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
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê chưa hoàn thành')}
              <Badge color="primary">{countBangKeChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng BK')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
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
