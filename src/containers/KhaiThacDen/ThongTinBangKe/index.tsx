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
import PhieuGuiChuaNhan from './PhieuGuiChuaNhan';
import PhieuGuiDaNhan from './PhieuGuiDaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const idBangKe = get(props, 'match.params.idBangKe');
  const bangKe = useSelector(makeSelector046RowFirstChild);
  const countPhieuGui = useSelector(makeSelector046CountChildren);
  const countPhieuGuiChuaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle([
      SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_TTKT,
      SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );
  const countPhieuGuiDaNhan = useSelector(
    makeSelector046CountChildrenByLifecycle([
      SipDataState.BUU_GUI_DA_QUET_NHAN_TAI_TTKT,
      SipDataState.BUU_GUI_DA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );

  const getThongTinBangKe = (): void => {
    dispatch(
      action_MIOA_ZTMI046({
        IV_TOR_ID: idBangKe,
        IV_NO_PER_PAGE: '10',
        IV_PAGENO: '1',
      }),
    );
  };

  useEffect((): void => {
    if (!isEmpty(idBangKe)) {
      getThongTinBangKe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
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

      <TabView
        navs={[
          {
            children: (
              <>
                {t('Bưu gửi chưa nhận')}
                <Badge color="primary">{countPhieuGuiChuaNhan}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bưu gửi đã nhận')}
                <Badge color="primary">{countPhieuGuiDaNhan}</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <PhieuGuiChuaNhan getThongTinBangKe={getThongTinBangKe} />,
          },
          {
            children: <PhieuGuiDaNhan />,
          },
        ]}
      />
    </>
  );
};

export default ThongTinChuyenThu;
