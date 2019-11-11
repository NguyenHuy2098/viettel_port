import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { actionDongTaiVaoChuyenThuCoSan, actionDongTaiVaoChuyenThuTaoMoi } from 'redux/common/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import ModalTwoTab from '../../DanhSachPhieuGuiTrongBangKe/ModalTwoTab';

interface Props {
  disabled: boolean;
  des: string;
  forwardingItemListState: ForwardingItem[];
  callbackWhenDone: Function;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongTai = ({ callbackWhenDone, des, disabled, forwardingItemListState }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listChuyenThuCoSan = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const getListChuyenThuCoSan = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  useEffect((): void => {
    getListChuyenThuCoSan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPopupDongTai = (): void => {
    setShowModal(true);
  };
  const handleClosePopupDongTai = (): void => {
    setShowModal(false);
  };

  const dongTaiVaoChuyenThuCoSan = (): void => {
    if (!isEmpty(selectedChuyenThu)) {
      dispatch(
        actionDongTaiVaoChuyenThuCoSan(
          { selectedChuyenThu, forwardingItemListState, des },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              toast(
                <>
                  <i className="fa check mr-2" />
                  {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
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
    handleClosePopupDongTai();
  };
  const saveSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  const dongTaiVaoChuyenThuTaoMoi = (locNo: string, description: string): void => {
    dispatch(
      actionDongTaiVaoChuyenThuTaoMoi(
        { locNo, description, forwardingItemListState, des },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
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
    handleClosePopupDongTai();
  };
  return (
    <>
      <Button onClick={handleShowPopupDongTai} color="primary" className="ml-2" disabled={disabled}>
        <i className="fa fa-download mr-2" />
        {t('Đóng tải')}
      </Button>
      <ModalTwoTab
        onHide={handleClosePopupDongTai}
        visible={showModal}
        modalTitle={'Gán tải vào chuyến thư'}
        firstTabTitle={'CHỌN CHUYẾN THƯ'}
        secondTabTitle={'TẠO CHUYẾN THƯ MỚI'}
        onSubmitButton1={dongTaiVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiVaoChuyenThuTaoMoi}
        tab1Contents={listChuyenThuCoSan}
        onChooseItemInFirstTab={saveSelectedChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
      />
    </>
  );
};

export default ButtonDongTai;
