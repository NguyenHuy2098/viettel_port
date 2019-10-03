import React, { useMemo, useState } from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty, isString, join, map, noop } from 'lodash';

import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { SipDataState, SipDataType } from 'utils/enums';
import { toastError, toastSuccess } from '../Toast';

interface Props extends ButtonProps {
  idChuyenThu?: string;
  listTaiKienCanGan?: API.Child[];
  listTaiKienCanRemove?: API.Child[];
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongChuyenThu = (props: Props): JSX.Element => {
  const { idChuyenThu, listTaiKienCanGan, listTaiKienCanRemove, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [processing, setProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userMaBp = useSelector(makeSelectorMaBP);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const listTaiKienItemsCanGan = useMemo(
    () =>
      map(
        listTaiKienCanGan,
        (child: API.Child): API.TITEM => ({
          ITEM_ID: get(child, 'TOR_ID'),
          ITEM_TYPE: get(child, 'TOR_TYPE') === SipDataType.TAI ? SipDataType.TAI : '',
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienCanGan],
  );

  const listTaiKienItemsCanRemove = useMemo(
    () =>
      map(
        listTaiKienCanRemove,
        (child: API.Child): API.TITEM => ({
          ITEM_ID: get(child, 'TOR_ID'),
          ITEM_TYPE: get(child, 'TOR_TYPE') === SipDataType.TAI ? SipDataType.TAI : '',
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienCanRemove],
  );

  const removeTaiKien = (): Promise<API.MIOAZTMI016Response> => {
    return new Promise((resolve, reject): void => {
      if (!isEmpty(listTaiKienItemsCanRemove)) {
        dispatch(
          action_MIOA_ZTMI016(
            {
              IV_FLAG: '4',
              IV_TOR_TYPE: SipDataType.CHUYEN_THU,
              IV_TOR_ID_CU: idChuyenThu,
              IV_DLOCATION: 'HUB1',
              T_ITEM: listTaiKienItemsCanRemove,
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
      <SelectForwardingItemModal
        onSuccessSelected={handleDongChuyenThuById}
        visible={showModal}
        onHide={toggleModal}
        modalTitle={t('Chọn chuyến thư')}
        forwardingItemList={listTaiKienItemsCanGan || []}
        IV_TOR_TYPE={SipDataType.CHUYEN_THU}
        IV_FR_LOC_ID={userMaBp}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
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
