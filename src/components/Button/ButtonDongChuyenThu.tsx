import React, { useMemo, useState } from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { get, isEmpty, join, map, noop } from 'lodash';

import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { SipDataType } from 'utils/enums';
import { toastError, toastSuccess } from '../Toast';

interface Props extends ButtonProps {
  idChuyenThu: string;
  listTaiKienCanRemove?: API.Child[];
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonDongChuyenThu = (props: Props): JSX.Element => {
  const { idChuyenThu, listTaiKienCanRemove, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [processing, setProcessing] = useState<boolean>(false);

  const listTaiKienItemsCanRemove = useMemo(
    () =>
      map(
        listTaiKienCanRemove,
        (child: API.Child): ForwardingItem => ({
          ITEM_ID: get(child, 'TOR_ID', ''),
          ITEM_TYPE: get(child, 'TOR_TYPE', '') === SipDataType.TAI ? SipDataType.TAI : '',
        }),
      ),
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

  const dongChuyenThu = (): Promise<API.MIOAZTMI022Response> => {
    return new Promise((resolve, reject): void => {
      dispatch(
        action_MIOA_ZTMI022(
          {
            FU_NO: idChuyenThu,
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

  const handleDongChuyenThu = async (): Promise<void> => {
    setProcessing(true);
    try {
      await removeTaiKien();
      await dongChuyenThu();
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

  return (
    <Button color="primary" onClick={handleDongChuyenThu} {...rest}>
      {props.children || (
        <>
          {processing ? <i className="fa fa-spinner fa-spin mr-2" /> : <i className="fa fa-truck mr-2" />}
          {t('Đóng CT')}
        </>
      )}
    </Button>
  );
};

ButtonDongChuyenThu.defaultProps = {
  listTaiKienCanRemove: [],
  onFailure: noop,
  onSuccess: noop,
};

export default ButtonDongChuyenThu;
