import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TabView from 'components/Tab/TabView';
import { select_CountZTMI0240 } from 'redux/ZTMI240/selectors';
import BuuGuiChuaDongBangKe from 'containers/KhaiThacDi/DongBangKe/BuuGuiChuaDongBangKe';
import QuetMa from './QuetMa';

// eslint-disable-next-line max-lines-per-function
function NhanTaiBuuCucGoc(): JSX.Element {
  const { t } = useTranslation();
  const listPhieuGuiChuaDongBangKeCount = useSelector(select_CountZTMI0240);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Quét mã bưu gửi')}</h1>
      </Row>
    );
  }

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <TabView
          navs={[
            {
              children: <>{t('Quét mã')}</>,
            },
            {
              children: (
                <>
                  {t('Phiếu gửi chưa đóng bảng kê')}
                  <Badge color="primary">{listPhieuGuiChuaDongBangKeCount}</Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <QuetMa />,
            },
            {
              children: <BuuGuiChuaDongBangKe />,
            },
          ]}
        />
      </div>
    </>
  );
}

export default NhanTaiBuuCucGoc;
