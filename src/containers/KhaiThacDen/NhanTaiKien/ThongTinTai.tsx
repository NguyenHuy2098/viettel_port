import * as React from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { match } from 'react-router-dom';
import { get } from 'lodash';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { push } from 'connected-react-router';
import moment from 'moment';
import {
  makeSelectorCountMT_ZTMI046,
  useGet_MT_ZTMI046_OUT,
  makeSelectorCountKienChuaNhan,
  makeSelectorCountKienDaNhan,
} from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import TaiKienDaNhan from './TaiKienDaNhan';
import TaiKienChuaNhan from './TaiKienChuaNhan';

interface Props {
  match: match;
}
// eslint-disable-next-line max-lines-per-function
const ThongTinTai: React.FC<Props> = (props: Props): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();
  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }

  const [tab, setTab] = useState<number>(1);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  const dispatch = useDispatch();

  const idChuyenThu = get(props, 'match.params.idChuyenThu');

  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();
  // console.log(manifestForwardingOrderList)
  const getInfoTaiKien = get(manifestForwardingOrderList, 'Row[0]');
  // console.log(getInfoTaiKien && getInfoTaiKien.TOR_ID);
  const countTaiKien = useSelector(makeSelectorCountMT_ZTMI046);
  const countKienChuaNhan = useSelector(makeSelectorCountKienChuaNhan);
  const countKienDaNhan = useSelector(makeSelectorCountKienDaNhan);

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: idChuyenThu,
    };
    dispatch(action_MIOA_ZTMI046(payload));
  }, [dispatch, idChuyenThu]);

  const handleBackChuyenThu = (): void => {
    dispatch(push(routesMap.NHAN_CHUYEN_THU));
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBackChuyenThu}>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin chuyến thư')}
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
            <Col xs="5">{t('Mã chuyến thư')}: </Col>
            <Col xs="7">{getInfoTaiKien && getInfoTaiKien.TOR_ID}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">
              {moment(getInfoTaiKien && getInfoTaiKien.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">{getInfoTaiKien && getInfoTaiKien.LOG_LOCID_SRC}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {countTaiKien}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin tải kiện')}</h1>
        <div className="sipTitleRightBlock sipTitleRightBlock2">
          <Button onClick={toggle}>
            <i className="fa fa-gift fa-lg"></i>
            {t('Nhận tải kiện')}
          </Button>
        </div>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Tải kiện chưa nhận')}
              <Badge color="primary">{countKienChuaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải kiện đã nhận')}
              <Badge color="primary">{countKienDaNhan}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={2}>
            <TaiKienDaNhan />
          </TabPane>
          <TabPane tabId={1}>
            <TaiKienChuaNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default ThongTinTai;
