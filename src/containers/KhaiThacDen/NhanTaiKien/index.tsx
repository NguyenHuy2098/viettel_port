import React, { useEffect } from 'react';
import { Col, Row, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPageItems } from 'utils/common';

import TabView from 'components/Tab/TabView';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorCountChuyenThuChuaNhanTaiKien, makeSelectorRowSize } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import ChuyenThuChuaNhanTaiKien from './ChuyenThuChuaNhanTaiKien';
import TaiDaNhan from './TaiDaNhan';
import NhanRiengTaiKien from './NhanRiengTaiKien';

// eslint-disable-next-line max-lines-per-function
const NhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countChuyenThuChuaNhanTaiKien = useSelector(makeSelectorCountChuyenThuChuaNhanTaiKien);
  const countTaiDaNhan = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));
  const countNhanRiengTaiKien = useSelector(makeSelectorRowSize(SipDataType.TAI, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const pageItems = getPageItems();

  const getChuyenThuChuaNhanTaiKien = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getTaiDaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAI_KIEN_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  const getTaiKienChuaNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
          IV_NO_PER_PAGE: pageItems,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  useEffect((): void => {
    getChuyenThuChuaNhanTaiKien(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  useEffect((): void => {
    getTaiKienChuaNhan(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  useEffect((): void => {
    getTaiDaNhan(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <Col className="px-0" md={8}>
          <h3>{t('Nh???n t???i ki???n')}</h3>
        </Col>
      </Row>
      <TabView
        navs={[
          {
            children: (
              <>
                {t('Chuy???n th?? ch??a nh???n t???i/ki???n')}
                <Badge color="primary">{countChuyenThuChuaNhanTaiKien}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('T???i ???? nh???n')}
                <Badge color="primary">{countTaiDaNhan}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Nh???n ri??ng t???i/ki???n')}
                <Badge color="primary">{countNhanRiengTaiKien}</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <ChuyenThuChuaNhanTaiKien getChuyenThuChuaNhanTaiKien={getChuyenThuChuaNhanTaiKien} />,
          },
          {
            children: <TaiDaNhan getTaiDaNhan={getTaiDaNhan} />,
          },
          {
            children: <NhanRiengTaiKien getTaiKienChuaNhan={getTaiKienChuaNhan} />,
          },
        ]}
      />
    </>
  );
};

export default NhanTaiKien;
