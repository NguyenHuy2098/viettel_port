/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get, trim, toNumber, size } from 'lodash';

import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild } from 'redux/MIOA_ZTMI046/selectors';

interface Props {
  disabled: boolean;
  listUncheckForwardingItem: API.TITEM[];
  idBangKe: string;
  callBackAfterRemovePhieuGui: () => void;
  callBackAfterDongTai: () => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongTai: React.FC<Props> = ({
  callBackAfterRemovePhieuGui,
  callBackAfterDongTai,
  disabled,
  listUncheckForwardingItem,
  idBangKe,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenthu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const userMaBp = useSelector(makeSelectorBPOrg);
  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const dataBangKe = useSelector(makeSelector046RowFirstChild);

  const reset = (): void => {
    setSelectedChuyenthu(undefined);
    callBackAfterDongTai();
  };

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const handleChonChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenthu(chuyenThu);
  };

  const dongTaiVoiChuyenThuCoSanAfterRemovePhieuGui = (maTaiVuaTao: string): void => {
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
            // add bang ke hien tai vao tai moi tao
            addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
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
            // getListPhieuGui();
            callBackAfterRemovePhieuGui();
          },
        },
      ),
    );
  };

  const addTaiVaoChuyenThuDuocChon = (maTaiVuaTao: string): void => {
    const maChuyenThu = get(selectedChuyenThu, 'TOR_ID', '');
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: maChuyenThu,
          IV_SLOCATION: get(selectedChuyenThu, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maTaiVuaTao,
              ITEM_TYPE: SipDataType.TAI,
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
            reset();
          },
        },
      ),
    );
  };

  const addBangKeHienTaiVaoTaiMoiTao = (maTaiVuaTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
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
          onSuccess: (): void => {
            // add tai vao chuyen thu vua chon
            addTaiVaoChuyenThuDuocChon(maTaiVuaTao);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]')}
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

  // eslint-disable-next-line max-lines-per-function
  const handleDongTaiSauKhiChonChuyenThu = (): void => {
    const maChuyenThu = get(selectedChuyenThu, 'TOR_ID', '');

    if (size(trim(maChuyenThu)) > 0) {
      //tao tai moi
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.TAO,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: '',
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: '',
                ITEM_TYPE: '',
              },
            ],
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              if (get(data, 'MT_ZTMI016_OUT.ev_error') === 1) {
                const maTaiVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
                if (size(listUncheckForwardingItem) > 0) {
                  // Remove phieu gui khong duoc tick ngoai man hin danh sach phieu gui trong bang ke
                  dongTaiVoiChuyenThuCoSanAfterRemovePhieuGui(maTaiVuaTao);
                } else {
                  // add bang ke hien tai vao tai moi tao
                  addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
                }
              }
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
    }

    closeModal();
  };

  // eslint-disable-next-line max-lines-per-function
  const taoChuyenThuMoi = (locNo: string, ghiChu: string): void => {
    // tao ngam 1 tai
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
          IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          // eslint-disable-next-line max-lines-per-function
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error', '0')) === 1) {
              const maTaiVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              if (size(listUncheckForwardingItem) > 0) {
                // Remove cac phieu gui khong duoc tich o ben ngoi man hinh
                dongTaiVaoChuyenThuAfterRemovePhieuGui(maTaiVuaTao);
              } else {
                //add bang ke hien tai vao tai moi tao
                addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
              }
            }
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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const addTaiVaoChuyenThuVuaTao = (maTaiVuaTao: string, maChuyenThuMoiTao: string) => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
            IV_TOR_ID_CU: maChuyenThuMoiTao,
            IV_SLOCATION: userMaBp,
            IV_DLOCATION: locNo,
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: maTaiVuaTao,
                ITEM_TYPE: SipDataType.TAI,
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
              reset();
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
    };

    const taoChuyenThuMoiTheoThongTinTuPopup = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.TAO,
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
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
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error', '0')) === 1) {
                const maChuyenThuMoiTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU');
                // add tai vao chuyen thu vua tao
                addTaiVaoChuyenThuVuaTao(maTaiVuaTao, maChuyenThuMoiTao);
              }
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
    };

    const addBangKeHienTaiVaoTaiMoiTao = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: maTaiVuaTao,
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: idBangKe,
                ITEM_TYPE: SipDataType.BANG_KE,
              },
            ],
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (): void => {
              // Tao chuyen thu theo thong tin vua duoc chon tu popup
              taoChuyenThuMoiTheoThongTinTuPopup(maTaiVuaTao);
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
    };

    const dongTaiVaoChuyenThuAfterRemovePhieuGui = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.REMOVE,
            IV_TOR_TYPE: SipDataType.BANG_KE,
            IV_TOR_ID_CU: idBangKe,
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
            IV_DESCRIPTION: '',
            T_ITEM: listUncheckForwardingItem,
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (): void => {
              // Add bang ke hien tai vao tai moi tao
              addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
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
              callBackAfterDongTai();
            },
          },
        ),
      );
    };

    closeModal();
  };

  return (
    <>
      <Button color="primary" className="ml-2" disabled={disabled} onClick={openModal}>
        <img src={'../../assets/img/icon/iconDongTai.svg'} alt="VTPostek" />
        {t('Đóng tải')}
      </Button>
      <ModalTwoTab
        onHide={closeModal}
        visible={showModal}
        modalTitle={t('Gán tải vào chuyến thư')}
        firstTabTitle={t('CHỌN CHUYẾN THƯ')}
        secondTabTitle={t('TẠO CHUYẾN THƯ MỚI')}
        tab1Contents={listChuyenThu}
        onSubmitButton1={handleDongTaiSauKhiChonChuyenThu}
        onSubmitButton2={taoChuyenThuMoi}
        onChooseItemInFirstTab={handleChonChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
      />
    </>
  );
};

export default ButtonDongTai;
