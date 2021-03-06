import React, { useEffect } from 'react';
import { Button, Row, Col, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import TabView from 'components/Tab/TabView';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046CountChildrenByLifecycle,
  makeSelector046CountChildren,
} from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import BangKePhieuGuiDaNhan from './BangKePhieuGuiDaNhan';
import BangKePhieuGuiChuaNhan from './BangKePhieuGuiChuaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinTai: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const idTaiKien = get(props, 'match.params.idTaiKien');
  const taiKien = useSelector(makeSelector046RowFirstChild);
  const countBangKePhieuGui = useSelector(makeSelector046CountChildren);
  const countBangKePhieuGuiChuaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN),
  );
  const countBangKePhieuGuiDaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle(SipDataState.BANG_KE_DA_QUET_NHAN),
  );

  const getThongTinTai = (): void => {
    dispatch(action_MIOA_ZTMI046({ IV_TOR_ID: idTaiKien }));
  };

  useEffect((): void => {
    if (!isEmpty(idTaiKien)) {
      getThongTinTai();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTaiKien]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
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
            <Col xs="7">{moment(get(taiKien, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
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

      <TabView
        navs={[
          {
            children: (
              <>
                {t('Bảng kê/Phiếu gửi chưa nhận')}
                <Badge color="primary">{countBangKePhieuGuiChuaNhan}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê/Phiếu gửi đã nhận')}
                <Badge color="primary">{countBangKePhieuGuiDaNhan}</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <BangKePhieuGuiChuaNhan getThongTinTai={getThongTinTai} />,
          },
          {
            children: <BangKePhieuGuiDaNhan />,
          },
        ]}
      />
    </>
  );
};

export default ThongTinTai;
