import React, { useEffect } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPageItems } from 'utils/common';

import TabView from 'components/Tab/TabView';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import {
  makeSelectorCountBangKeChuaNhanPhieuGui,
  makeSelectorCountTaiChuaNhanBangKePhieuGui,
} from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import TaiChuaNhanBKPhieuGui from './TaiChuaNhanBKPhieuGui';
import BangKeChuaNhanPhieuGui from './BangKeChuaNhanPhieuGui';
import NhanRiengBangKePhieuGui from './NhanRiengBangKePhieuGui';

// eslint-disable-next-line max-lines-per-function
const NhanBangKePhieuGui: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const countTaiChuaNhanBangKePhieuGui = useSelector(makeSelectorCountTaiChuaNhanBangKePhieuGui);
  const countBangKeChuaNhanPhieuGui = useSelector(makeSelectorCountBangKeChuaNhanPhieuGui);
  const pageItems = getPageItems();

  const getTaiKienDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAI_KIEN_DA_QUET_NHAN,
          IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getBangKeDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_CUST_STATUS: SipDataState.BANG_KE_DA_QUET_NHAN,
          IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  useEffect((): void => {
    getTaiKienDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  useEffect((): void => {
    getBangKeDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <Col className="px-0" md={8}>
          <h3>{t('Nhận bảng kê / phiếu gửi')}</h3>
        </Col>
      </Row>
      <TabView
        navs={[
          {
            children: (
              <>
                {t('Tải chưa nhận bảng kê / phiếu gửi')}
                <Badge color="primary">{countTaiChuaNhanBangKePhieuGui}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê chưa nhận phiếu gửi')}
                <Badge color="primary">{countBangKeChuaNhanPhieuGui}</Badge>
              </>
            ),
          },
          {
            children: t('Nhận riêng bảng kê / phiếu gửi'),
          },
        ]}
        tabs={[
          {
            children: <TaiChuaNhanBKPhieuGui getTaiKienDaQuetNhan={getTaiKienDaQuetNhan} />,
          },
          {
            children: <BangKeChuaNhanPhieuGui getBangKeDaQuetNhan={getBangKeDaQuetNhan} />,
          },
          {
            children: <NhanRiengBangKePhieuGui />,
          },
        ]}
      />
    </>
  );
};

export default NhanBangKePhieuGui;
