import * as React from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { match } from 'react-router';
import { goBack } from 'connected-react-router';
import { get } from 'lodash';
import moment from 'moment';
import {
  makeSelectorCountBangKeChuaNhan,
  makeSelectorCountBangKeDaNhan,
  makeSelectorCountMT_ZTMI046,
  useGet_MT_ZTMI046_OUT,
} from 'redux/MIOA_ZTMI046/selectors';
import BangKeDaNhan from './BangKeDaNhan';
import BangKeChuaNhan from './BangKeChuaNhan';

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
  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();
  const getInfoBangKe = get(manifestForwardingOrderList, 'Row[0]');
  const countBangKe = useSelector(makeSelectorCountMT_ZTMI046);
  const countBangKeChuaNhan = useSelector(makeSelectorCountBangKeChuaNhan);
  const countBangKeDaNhan = useSelector(makeSelectorCountBangKeDaNhan);
  const dispatch = useDispatch();
  const handleBackTaiKien = (): void => {
    dispatch(goBack());
  };
  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBackTaiKien}>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin tải')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
        </div>
      </Row>
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">{getInfoBangKe && getInfoBangKe.TOR_ID}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">
              {moment(getInfoBangKe && getInfoBangKe.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">{getInfoBangKe && getInfoBangKe.LOG_LOCID_SRC}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">
              {moment(getInfoBangKe && getInfoBangKe.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
            </Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {countBangKe}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin bảng kê / phiếu gửi')}</h1>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê / Phiếu gửi chưa nhận')}
              <Badge color="primary">{countBangKeChuaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê / Phiếu gửi đã nhận')}
              <Badge color="primary">{countBangKeDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <BangKeChuaNhan />
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
