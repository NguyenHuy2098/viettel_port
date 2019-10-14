import React, { useEffect, useState } from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get, isEmpty, isString, join, noop, toString } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { IV_FLAG, SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { AppStateType } from 'redux/store';
import { toastError, toastSuccess } from '../Toast';
import ModalTwoTab from '../DanhSachPhieuGuiTrongBangKe/ModalTwoTab';

interface Props extends ButtonProps {
  diemDen: string;
  idChuyenThu?: string;
  listTaiKienCanGan?: API.TITEM[];
  listTaiKienCanRemove?: API.TITEM[];
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongChuyenThu = (props: Props): JSX.Element => {
  const { diemDen, idChuyenThu, listTaiKienCanGan, listTaiKienCanRemove, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);
  const [processing, setProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const listTaiCoSan = useSelector(
    (state: AppStateType) => get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', []),
    shallowEqual,
  );

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

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

  const saveSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  useEffect((): void => {
    getListChuyenThuCoSan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dongTaiKienVaoChuyenThuTaoMoi = (locNo: string, description: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: description,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            const maChuyenThuVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
            handleDongChuyenThuById(toString(maChuyenThuVuaTao));
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

  const removeTaiKien = (): Promise<API.MIOAZTMI016Response> => {
    return new Promise((resolve, reject): void => {
      if (!isEmpty(listTaiKienCanRemove)) {
        dispatch(
          action_MIOA_ZTMI016(
            {
              IV_FLAG: '4',
              IV_TOR_TYPE: SipDataType.CHUYEN_THU,
              IV_TOR_ID_CU: idChuyenThu,
              IV_DLOCATION: diemDen,
              T_ITEM: listTaiKienCanRemove,
            },
            {
              onSuccess: (data: API.MIOAZTMI016Response) => {
                resolve(data);
              },
              onFailure: (error: Error) => {
                reject(error);
              },
            },
          ),
        );
      } else {
        resolve();
      }
    });
  };

  const dongChuyenThu = (torId: string): Promise<API.MIOAZTMI022Response> => {
    return new Promise((resolve, reject): void => {
      dispatch(
        action_MIOA_ZTMI022(
          {
            FU_NO: torId,
            STATUS_ID: '1',
          },
          {
            onSuccess: (data: API.MIOAZTMI022Response) => {
              resolve(data);
            },
            onFailure: (error: Error) => {
              reject(error);
            },
          },
        ),
      );
    });
  };
  const dongTaiKienVaoChuyenThuCoSan = (): void => {
    handleDongChuyenThuById(get(selectedChuyenThu, 'TOR_ID', ''));
    toggleModal();
  };
  const handleDongChuyenThuById = async (torId: string): Promise<void> => {
    if (!isString(torId) || isEmpty(torId)) return;
    setProcessing(true);
    try {
      await removeTaiKien();
      await dongChuyenThu(torId);
      toastSuccess(t('Đóng chuyến thư thành công.'));
      onSuccess && onSuccess();
    } catch (error) {
      if (error) {
        toastError(join(error.messages, ' '));
      } else {
        toastError(t('Lỗi không xác định khi đóng chuyến thư.'));
      }
      onFailure && onFailure(error);
    }
    setProcessing(false);
  };

  const handleDongChuyenThu = async (): Promise<void> => {
    if (isString(idChuyenThu) && !isEmpty(idChuyenThu)) {
      await handleDongChuyenThuById(idChuyenThu);
    } else if (isEmpty(listTaiKienCanGan)) {
      toastError(t('Vui lòng chọn từ danh sách trước khi đóng.'));
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <Button color="primary" onClick={handleDongChuyenThu} {...rest}>
        {props.children || (
          <>
            {processing ? <i className="fa fa-spinner fa-spin mr-2" /> : <i className="fa fa-truck mr-2" />}
            {t('Đóng CT')}
          </>
        )}
      </Button>
      {/*<SelectForwardingItemModal*/}
      {/*  onSuccessSelected={handleDongChuyenThuById}*/}
      {/*  visible={showModal}*/}
      {/*  onHide={toggleModal}*/}
      {/*  modalTitle={t('Chọn chuyến thư')}*/}
      {/*  forwardingItemList={listTaiKienCanGan || []}*/}
      {/*  IV_TOR_TYPE={SipDataType.CHUYEN_THU}*/}
      {/*  IV_TO_LOC_ID={diemDen}*/}
      {/*  IV_CUST_STATUS={SipDataState.TAO_MOI}*/}
      {/*/>*/}
      <ModalTwoTab
        onHide={toggleModal}
        visible={showModal}
        modalTitle={t('Đóng chuyến thư')}
        firstTabTitle={t('Chọn chuyến thư')}
        secondTabTitle={t('Tạo mới chuyến thư')}
        onSubmitButton1={dongTaiKienVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiKienVaoChuyenThuTaoMoi}
        tab1Contents={listTaiCoSan}
        onChooseItemInFirstTab={saveSelectedChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
      />
    </>
  );
};

ButtonDongChuyenThu.defaultProps = {
  listTaiKienCanGan: [],
  listTaiKienCanRemove: [],
  onFailure: noop,
  onSuccess: noop,
};

export default ButtonDongChuyenThu;
