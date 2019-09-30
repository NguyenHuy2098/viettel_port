import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { goBack } from 'connected-react-router';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046CountChildrenByLifecycle,
  makeSelector046CountChildren,
} from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import PhieuGuiChuaNhan from './PhieuGuiChuaNhan';
import PhieuGuiDaNhan from './PhieuGuiDaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const idBangKe = get(props, 'match.params.idBangKe');
  const bangKe = useSelector(makeSelector046RowFirstChild);
  const countPhieuGui = useSelector(makeSelector046CountChildren);
  const countPhieuGuiChuaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle([
      SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_TTKT,
      SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );
  const countPhieuGuiDaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle([
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_TTKT,
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  useEffect((): void => {
    if (!isEmpty(idBangKe)) {
      dispatch(
        action_MIOA_ZTMI046({
          IV_TOR_ID: idBangKe,
          IV_NO_PER_PAGE: '10',
          IV_PAGENO: '1',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  const handleBackChuyenThu = (): void => {
    dispatch(goBack());
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBackChuyenThu} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin bảng kê')}
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
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">{get(bangKe, 'TOR_ID')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">{moment(get(bangKe, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">{get(bangKe, 'LOG_LOCID_SRC')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}:&nbsp;</Col>
            <Col xs="7">{moment(get(bangKe, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {countPhieuGui}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin bưu gửi')}</h1>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bưu gửi chưa nhận')}
              <Badge color="primary">{countPhieuGuiChuaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi đã nhận')}
              <Badge color="primary">{countPhieuGuiDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={2}>
            <PhieuGuiDaNhan />
          </TabPane>
          <TabPane tabId={1}>
            <PhieuGuiChuaNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default ThongTinChuyenThu;
