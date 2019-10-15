import React, { useEffect, useState } from 'react';
import { Badge, Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';

import TabView from 'components/Tab/TabView';
import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import TaiChuaHoanThanh from './TaiChuaHoanThanh';
import BangKeChuaDongTai from './BangKeChuaDongTai';
import TaiDaDong from './TaiDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongTai: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getListTai = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const countTaiDaDong = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const countBangKeChuaDongTai = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));

  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

  const payloadGetPostOfficeList = {
    row: [
      {
        IV_LOCTYPE: 'V001',
      },
      {
        IV_LOCTYPE: 'V004',
      },
    ],
    IV_BP: '',
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '5000',
  };

  useEffect((): void => {
    dispatch(action_MIOA_ZTMI045(payloadGetPostOfficeList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const toggleCreateForwardingItemModal = (): void => {
    setCreateForwardingItemModal(!createForwardingItemModal);
  };

  const renderTitle = (): JSX.Element => {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng tải')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-plus mr-2" />
            {t('Tạo tải')}
          </Button>
          <CreateForwardingItemModal
            onSuccessCreated={getListTai}
            visible={createForwardingItemModal}
            onHide={toggleCreateForwardingItemModal}
            modalTitle={t('Tạo tải')}
            IV_TOR_TYPE="ZC2"
          />
        </div>
      </Row>
    );
  };

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <TabView
          navs={[
            {
              children: (
                <>
                  {t('Tải chưa hoàn thành')}
                  <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
                </>
              ),
            },
            // {
            //   children: (
            //     <>
            //       {t('Bưu gửi chưa đóng tải')}
            //       <Badge color="primary">{countBangKeBuuGuiChuaDongTai}</Badge>
            //     </>
            //   ),
            // },
            {
              children: (
                <>
                  {t('Bảng kê chưa đóng tải')}
                  <Badge color="primary">{countBangKeChuaDongTai}</Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Tải đã đóng')}
                  <Badge color="primary">{countTaiDaDong}</Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <TaiChuaHoanThanh />,
            },
            // {
            //   children: <BuuGuiChuaDongTai />,
            // },
            {
              children: <BangKeChuaDongTai />,
            },
            {
              children: <TaiDaDong />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default DongTai;
