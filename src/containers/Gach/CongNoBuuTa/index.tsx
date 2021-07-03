/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import TabView from 'components/Tab/TabView';
// import action_CHECK_THU_TIEN from 'redux/CongNoBuuTa/actions';

import BangKeThuBuuTa from './BangKeThuBuuTa';
import DanhSachThuCOD from './DanhSachCODChuaChot';
import BangKeChiemDungCongNo from './BangKeChiemDungCongNo';

const Index: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

  useEffect((): void => {
    // dispatch(action_CHECK_THU_TIEN());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TabView
        navs={[
          {
            children: (
              <>
                {t('Danh sách thu COD chưa chốt')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê thu bưu tá')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Bảng kê chiếm dụng công nợ')}
                <Badge color="primary">0</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <DanhSachThuCOD />,
          },
          { children: <BangKeThuBuuTa /> },
          { children: <BangKeChiemDungCongNo /> },
        ]}
      />
    </>
  );
};

export default Index;
