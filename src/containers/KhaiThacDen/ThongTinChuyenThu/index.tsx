import React, { useEffect } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import TabView from 'components/Tab/TabView';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046ChildrenTaiKienCount,
  makeSelector046ChildrenTaiKienDaNhanCount,
  makeSelector046ChildrenTaiKienChuaNhanCount,
} from 'redux/MIOA_ZTMI046/selectors';
import TaiKienDaNhan from './TaiKienDaNhan';
import TaiKienChuaNhan from './TaiKienChuaNhan';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const ThongTinChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const idChuyenThu = get(props, 'match.params.idChuyenThu');
  const chuyenThu = useSelector(makeSelector046RowFirstChild);
  const countTaiKien = useSelector(makeSelector046ChildrenTaiKienCount);
  const countKienChuaNhan = useSelector(makeSelector046ChildrenTaiKienChuaNhanCount);
  const countKienDaNhan = useSelector(makeSelector046ChildrenTaiKienDaNhanCount);

  const getThongTinChuyenThu = (): void => {
    dispatch(action_MIOA_ZTMI046({ IV_TOR_ID: idChuyenThu }));
  };

  useEffect((): void => {
    if (!isEmpty(idChuyenThu)) {
      getThongTinChuyenThu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const renderPrintButton = (): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'sipTitleRightBlockBtnIcon',
        children: <i className="fa fa-print" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In th??ng tin chuy???n th??'),
      }}
    />
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Th??ng tin chuy???n th??')}
        </h1>
        <div className="sipTitleRightBlock">{renderPrintButton()}</div>
      </Row>
      <Row id="samplePrint" className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('M?? chuy???n th??')}: </Col>
            <Col xs="7">{get(chuyenThu, 'TOR_ID')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ng??y t???o')}: </Col>
            <Col xs="7">{moment(get(chuyenThu, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('B??u c???c ??i')}: </Col>
            <Col xs="7">{get(chuyenThu, 'LOG_LOCID_SRC')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ng??y g???i')}:&nbsp;</Col>
            <Col xs="7">{moment(get(chuyenThu, 'DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('T???ng s???')}: {countTaiKien}
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Th??ng tin t???i ki???n')}</h1>
      </Row>
      <div className="row mt-3" />

      <TabView
        navs={[
          {
            children: (
              <>
                {t('T???i ki???n ch??a nh???n')}
                <Badge color="primary">{countKienChuaNhan}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('T???i ki???n ???? nh???n')}
                <Badge color="primary">{countKienDaNhan}</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <TaiKienChuaNhan getThongTinChuyenThu={getThongTinChuyenThu} />,
          },
          {
            children: <TaiKienDaNhan />,
          },
        ]}
      />
    </>
  );
};

export default ThongTinChuyenThu;
