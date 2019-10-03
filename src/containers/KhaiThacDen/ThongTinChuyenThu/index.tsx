import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { goBack } from 'connected-react-router';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import PrintableModal from 'components/Button/ButtonPrintable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046CountChildrenByLifecycle,
  makeSelector046CountChildren,
} from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import PrintablePhieuGiaoNhanChuyenThu from './PrintablePhieuGiaoNhanChuyenThu';
import TaiKienDaNhan from './TaiKienDaNhan';
import TaiKienChuaNhan from './TaiKienChuaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const idChuyenThu = get(props, 'match.params.idChuyenThu');
  const chuyenThu = useSelector(makeSelector046RowFirstChild);
  const countTaiKien = useSelector(makeSelector046CountChildren);
  const countKienChuaNhan = useSelector(makeSelector046CountChildrenByLifecycle(SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const countKienDaNhan = useSelector(makeSelector046CountChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN));

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  useEffect((): void => {
    if (!isEmpty(idChuyenThu)) {
      dispatch(
        action_MIOA_ZTMI046({
          IV_TOR_ID: idChuyenThu,
          IV_NO_PER_PAGE: '10',
          IV_PAGENO: '1',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const handleGoBack = (): void => {
    dispatch(goBack());
  };

  const renderPrintButton = (): JSX.Element => (
    <PrintableModal
      btnProps={{
        className: 'sipTitleRightBlockBtnIcon',
        children: <i className="fa fa-print" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In thông tin chuyến thư'),
      }}
    />
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleGoBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin chuyến thư')}
        </h1>
        <div className="sipTitleRightBlock">{renderPrintButton()}</div>
      </Row>
      <Row id="samplePrint" className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã chuyến thư')}: </Col>
            <Col xs="7">{get(chuyenThu, 'TOR_ID')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">{moment(get(chuyenThu, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">{get(chuyenThu, 'LOG_LOCID_SRC')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}:&nbsp;</Col>
            <Col xs="7">-/-/-</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {countTaiKien}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin tải kiện')}</h1>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Tải kiện chưa nhận')}
              <Badge color="primary">{countKienChuaNhan}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
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

export default ThongTinChuyenThu;
