import React, { useEffect, useState } from 'react';
import { Badge, Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import { toString } from 'lodash';
import { default as NumberFormat } from 'react-number-format';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';
import { select_CountZTMI0240 } from 'redux/ZTMI240/selectors';
import TabView from 'components/Tab/TabView';
import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import BangKeChuaHoanThanh from './BangKeChuaHoanThanh';
import BuuGuiChuaDongBangKe from './BuuGuiChuaDongBangKe';
import BangKeDaDong from './BangKeDaDong';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countBuuGuiChuaDongBangKe = useSelector(select_CountZTMI0240);

  useEffect(() => {
    dispatch(
      action_ZTMI240({
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListBangKe = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  const countBangKeChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH),
  );
  const countBangKeDaDong = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.DA_DONG));
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

  const TaoBangKe = (): JSX.Element => {
    return (
      <>
        <Button className="ml-2" color="primary" onClick={toggleCreateForwardingItemModal}>
          <i className="fa fa-plus mr-2" />
          {t('Tạo bảng kê')}
        </Button>
        <CreateForwardingItemModal
          onSuccessCreated={getListBangKe}
          visible={createForwardingItemModal}
          onHide={toggleCreateForwardingItemModal}
          modalTitle={t('Tạo bảng kê')}
          IV_TOR_TYPE="ZC1"
        />
      </>
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê')}</h1>
        <div className="sipTitleRightBlock">
          <TaoBangKe />
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
                  {t('Bảng kê chưa hoàn thành')}
                  <Badge color="primary">
                    <NumberFormat
                      value={countBangKeChuaHoanThanh}
                      displayType={'text'}
                      thousandSeparator=","
                      decimalSeparator="."
                    />
                  </Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Bưu gửi chưa đóng BK')}
                  <Badge color="primary">
                    <NumberFormat
                      value={countBuuGuiChuaDongBangKe}
                      displayType={'text'}
                      thousandSeparator=","
                      decimalSeparator="."
                    />
                  </Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Bảng Kê đã đóng')}
                  <Badge color="primary">
                    <NumberFormat
                      value={countBangKeDaDong}
                      displayType={'text'}
                      thousandSeparator=","
                      decimalSeparator="."
                    />
                  </Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <BangKeChuaHoanThanh />,
            },
            {
              children: <BuuGuiChuaDongBangKe />,
            },
            {
              children: <BangKeDaDong />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default DongBangKe;
