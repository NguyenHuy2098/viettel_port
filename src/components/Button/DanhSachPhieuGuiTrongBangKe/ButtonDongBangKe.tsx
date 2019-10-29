import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get, toString, size } from 'lodash';

import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild } from 'redux/MIOA_ZTMI046/selectors';
import { IV_FLAG, SipDataState, SipDataType, SipFlowType } from 'utils/enums';

interface Props {
  disabled: boolean;
  listUncheckForwardingItem: API.TITEM[];
  idBangKe: string;
  callBackAfterDongBangKe: () => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongBangKe: React.FC<Props> = ({
  callBackAfterDongBangKe,
  disabled,
  listUncheckForwardingItem,
  idBangKe,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const listTai = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.TAO_MOI));
  const dataBangKe = useSelector(makeSelector046RowFirstChild);
  const userMaBp = useSelector(makeSelectorMaBP);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  useEffect((): void => {
    getListTai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetState = (): void => {
    setSelectedTai(undefined);
  };

  const openPopUpDongBangKeVaoTai = (): void => {
    setShowModal(true);
  };

  const closePopUpDongBangKeVaoTai = (): void => {
    setShowModal(false);
  };

  const getListTai = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.CHUA_HOAN_THANH,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKeAfterRemovePhieuGui = (taiID: string): void => {
    // remove các phiếu gửi không được tích
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.REMOVE,
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: idBangKe,
          IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
          IV_DESCRIPTION: '',
          T_ITEM: listUncheckForwardingItem,
        },
        {
          // eslint-disable-next-line max-lines-per-function
          onSuccess: (): void => {
            // gan bang ke vao tai
            dispatch(
              action_MIOA_ZTMI016(
                {
                  IV_FLAG: IV_FLAG.SUA,
                  IV_TOR_TYPE: SipDataType.TAI,
                  IV_TOR_ID_CU: toString(taiID),
                  IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
                  IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
                  IV_DESCRIPTION: '',
                  T_ITEM: [
                    {
                      ITEM_ID: idBangKe,
                      ITEM_TYPE: SipDataType.BANG_KE,
                    },
                  ],
                },
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
                    resetState();
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
                },
              ),
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
          // eslint-disable-next-line max-lines-per-function
          onFinish: (): void => {
            callBackAfterDongBangKe();
          },
        },
      ),
    );

    // closePopUpDongBangKeVaoTai();
  };
  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKeWithoutRemovePhieuGui = (taiID: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: toString(taiID),
          IV_SLOCATION: get(selectedTai, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedTai, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idBangKe,
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        },
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
            resetState();
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra ')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const handleActionDongBangKeVaoTaiCoSan = (): void => {
    handleActionDongBangKe(get(selectedTai, 'TOR_ID', ''));
    closePopUpDongBangKeVaoTai();
  };

  const handleActionDongBangKe = (taiID: string): void => {
    if (size(listUncheckForwardingItem) > 0) {
      handleActionDongBangKeAfterRemovePhieuGui(taiID);
    } else {
      handleActionDongBangKeWithoutRemovePhieuGui(taiID);
    }
    closePopUpDongBangKeVaoTai();
  };

  const handleChonTai = (tai: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedTai(tai);
  };

  const taoTaiMoi = (locNo: string, ghiChu: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: ghiChu,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            if (data && data.MT_ZTMI016_OUT) {
              const newTaiId = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              handleActionDongBangKe(newTaiId);
            }
          },

          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', t('Đã có lỗi xảy ra '))}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  return (
    <>
      <Button color="primary" className="ml-2" onClick={openPopUpDongBangKeVaoTai} disabled={disabled}>
        <img className="mr-2" src={'../../assets/img/icon/iconBangKe.svg'} alt="VTPostek" />
        {t('Đóng bảng kê')}
      </Button>
      <ModalTwoTab
        onHide={closePopUpDongBangKeVaoTai}
        visible={showModal}
        modalTitle={t('Gán bảng kê vào tải')}
        firstTabTitle={t('CHỌN TẢI')}
        secondTabTitle={t('TẠO TẢI MỚI')}
        tab1Contents={listTai}
        onSubmitButton1={handleActionDongBangKeVaoTaiCoSan}
        onSubmitButton2={taoTaiMoi}
        onChooseItemInFirstTab={handleChonTai}
        selectedChildInTab1={selectedTai}
      />
    </>
  );
};

export default ButtonDongBangKe;
