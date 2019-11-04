import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { find, get, size, isEmpty } from 'lodash';

import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { actionDongTaiVaoChuyenThuCoSan, actionDongTaiVaoChuyenThuTaoMoi } from 'redux/common/secondaryActions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';

interface Props {
  disableButtonDongTai: boolean;
  forwardingItemListState: API.TITEM[];
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongTai: React.FC<Props> = ({ disableButtonDongTai, forwardingItemListState }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const listBangKeChuaDongTai = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const getListChuyenThu = (): void => {
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
    getListChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowModalDongTai = (): void => {
    setShowModal(true);
  };

  const handleCloseModalDongTai = (): void => {
    setShowModal(false);
  };

  const saveSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  //eslint-disable-next-line max-lines-per-function
  const handleDongTaiVaoChuyenThuCoSan = (): void => {
    if (size(forwardingItemListState) > 0 && !isEmpty(selectedChuyenThu)) {
      const firstSelectedBangKe = find(listBangKeChuaDongTai, ['TOR_ID', forwardingItemListState[0].ITEM_ID]);
      dispatch(
        actionDongTaiVaoChuyenThuCoSan(
          {
            firstSelectedBangKe,
            forwardingItemListState,
            selectedChuyenThu,
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
          },
        ),
      );
    }
    handleCloseModalDongTai();
  };

  // eslint-disable-next-line max-lines-per-function
  const dongTaiVaoChuyenThuMoiTao = (locNo: string, ghiChu: string): void => {
    const firstSelectedBangKe = find(listBangKeChuaDongTai, ['TOR_ID', forwardingItemListState[0].ITEM_ID]);
    dispatch(
      actionDongTaiVaoChuyenThuTaoMoi(
        {
          firstSelectedBangKe,
          locNo,
          description: ghiChu,
          forwardingItemListState,
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
        },
      ),
    );
    handleCloseModalDongTai();
  };

  return (
    <>
      <Button color="primary" className="ml-2" onClick={handleShowModalDongTai} disabled={disableButtonDongTai}>
        <img src={'../../assets/img/icon/iconDongTai.svg'} alt="VTPostek" />
        {t('Đóng tải')}
      </Button>
      <ModalTwoTab
        onHide={handleCloseModalDongTai}
        visible={showModal}
        modalTitle={t('Gán tải vào chuyến thư')}
        firstTabTitle={t('CHỌN CHUYẾN THƯ')}
        secondTabTitle={t('TẠO CHUYẾN THƯ MỚI')}
        onSubmitButton1={handleDongTaiVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiVaoChuyenThuMoiTao}
        tab1Contents={listChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
        onChooseItemInFirstTab={saveSelectedChuyenThu}
      />
    </>
  );
};

export default ButtonDongTai;
