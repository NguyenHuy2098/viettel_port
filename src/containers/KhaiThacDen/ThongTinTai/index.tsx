import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046CountChildrenByLifecycle,
  makeSelector046CountChildren,
} from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';
import BangKePhieuGuiDaNhan from './BangKePhieuGuiDaNhan';
import BangKePhieuGuiChuaNhan from './BangKePhieuGuiChuaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinTai: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const idChuyenThu = get(props, 'match.params.idChuyenThu');
  const idTaiKien = get(props, 'match.params.idTaiKien');
  const taiKien = useSelector(makeSelector046RowFirstChild);
  const countBangKePhieuGui = useSelector(makeSelector046CountChildren);
  const countBangKePhieuGuiChuaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN),
  );
  const countBangKePhieuGuiDaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle(SipDataState.BANG_KE_DA_QUET_NHAN),
  );

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  useEffect((): void => {
    if (!isEmpty(idChuyenThu) && !isEmpty(idTaiKien)) {
      dispatch(
        action_MIOA_ZTMI046({
          IV_TOR_ID: idTaiKien,
          IV_NO_PER_PAGE: '10',
          IV_PAGENO: '1',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu, idTaiKien]);

  const handleBackChuyenThu = (): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu })));
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBackChuyenThu} className="sipTitleBtnBack">
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
            <Col xs="7">{get(taiKien, 'TOR_ID')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">{moment(get(taiKien, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">{get(taiKien, 'LOG_LOCID_SRC')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}:&nbsp;</Col>
            <Col xs="7">-/-/-</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {countBangKePhieuGui}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin bảng kê/phiếu gửi')}</h1>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê/Phiếu gửi chưa nhận')}
              <Badge color="primary">{countBangKePhieuGuiChuaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê/Phiếu gửi đã nhận')}
              <Badge color="primary">{countBangKePhieuGuiDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={2}>
            <BangKePhieuGuiDaNhan />
          </TabPane>
          <TabPane tabId={1}>
            <BangKePhieuGuiChuaNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default ThongTinTai;
