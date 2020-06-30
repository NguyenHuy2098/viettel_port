import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { actionDongBangKeVaoTaiMoiTao, actionDongBanKeVaoTaiCoSan } from 'redux/common/actions';
import { AppStateType } from 'redux/store';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import ModalTwoTab from '../../DanhSachPhieuGuiTrongBangKe/ModalTwoTab';

interface Props {
  disabled: boolean;
  des: string;
  forwardingItemListState: ForwardingItem[];
  callbackWhenDone: Function;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongBangKe = ({ callbackWhenDone, des, disabled, forwardingItemListState }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const listTaiCoSan = useSelector(
    (state: AppStateType) => get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', []),
    shallowEqual,
  );
  const getListTaiCoSan = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };
  useEffect((): void => {
    getListTaiCoSan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPopupDongBangKe = (): void => {
    setShowModal(true);
  };
  const handleHidePopupDongBangKe = (): void => {
    setShowModal(false);
  };
  const saveSelectedTai = (tai: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedTai(tai);
  };
  const dongBangKeVaoTaiCoSan = (): void => {
    if (!isEmpty(selectedTai)) {
      dispatch(
        actionDongBanKeVaoTaiCoSan(
          { selectedTai, des, forwardingItemListState },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              const Id_cu = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU');
              toast(
                <>
                  <i className="fa fa-check-square mr-2" />
                  {t('Bưu gửi được gán vào bảng kê')}
                  {Id_cu}
                  {t('thành công')}
                </>,
                {
                  type: 'success',
                },
              );
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
            onFinish: (): void => {
              callbackWhenDone();
            },
          },
        ),
      );
    }
    handleHidePopupDongBangKe();
  };
  const dongBangKeVaoTaiMoiTao = (locNo: string, description: string): void => {
    dispatch(
      actionDongBangKeVaoTaiMoiTao(
        { locNo, description, forwardingItemListState, des },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            const Id_cu = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU');
            toast(
              <>
                <i className="fa check mr-2" />
                {t('Bưu gửi được gán vào bảng kê')}
                {Id_cu}
                {t('thành công')}
              </>,
              {
                type: 'success',
              },
            );
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
          onFinish: (): void => {
            callbackWhenDone();
          },
        },
      ),
    );
    handleHidePopupDongBangKe();
  };

  return (
    <>
      <Button onClick={handleShowPopupDongBangKe} color="primary" className="ml-2" disabled={disabled}>
        <i className="fa fa-download mr-2" />
        {t('Đóng bảng kê')}
      </Button>
      <ModalTwoTab
        visible={showModal}
        onHide={handleHidePopupDongBangKe}
        modalTitle={'Gán bảng kê vào tải'}
        firstTabTitle={'CHỌN TẢI'}
        secondTabTitle={'TẠO TẢI MỚI'}
        onSubmitButton1={dongBangKeVaoTaiCoSan}
        onSubmitButton2={dongBangKeVaoTaiMoiTao}
        tab1Contents={listTaiCoSan}
        onChooseItemInFirstTab={saveSelectedTai}
        selectedChildInTab1={selectedTai}
      />
    </>
  );
};

export default ButtonDongBangKe;
