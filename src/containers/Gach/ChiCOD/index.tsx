/* eslint-disable max-lines-per-function */
import TabView from 'components/Tab/TabView';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Badge } from 'reactstrap';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';

import CODChuaChot from './CODChuaChot';
import CODKhachHang from './CODKhachHang';
import DeNghiCOD from './DeNghiCOD';
import DuyetTKNganHang from './DuyetTKNganHang';

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(action_CHECK_COD_CHUA_CHOT());
  }, []);
  return (
    <>
      <TabView
        navs={[
          {
            children: (
              <>
                {t('Chi COD khách hàng chưa chốt')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê chi COD khách hàng')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Đề nghị chi COD')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Duyệt tài khoản ngân hàng')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          { children: <CODChuaChot /> },
          { children: <CODKhachHang /> },
          { children: <DeNghiCOD /> },
          { children: <DuyetTKNganHang /> },
        ]}
      />
    </>
  );
};

export default Index;
