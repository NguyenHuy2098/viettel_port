import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import moment from 'moment';
import { isFunction, isNil, isDate } from 'lodash';

import { action_ZFI003 } from 'redux/ZFI003/actions';
import { action_ZFI005 } from 'redux/ZFI005/actions';
import { toastError, toastSuccess } from '../Toast';

interface Props extends ButtonProps {
  date?: Date;
  idBangKe?: string;
  items: API.ITEMBK[];
  onFailure?: (error: Error) => void;
  onSuccess?: (data: API.ZFI003Response | API.ZFI005Response) => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonLuuBangKe = (props: Props): JSX.Element => {
  const { date, idBangKe, items, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  if (!isNil(date) && !isDate(date)) {
    throw new TypeError('"date" is wrong type');
  }

  const handleFailure = (error: Error): void => {
    toastError(error.message);
    if (isFunction(onFailure)) onFailure(error);
  };

  const handleFinish = (): void => {
    setLoading(false);
  };

  const handleTaoMoiSuccess = (data: API.ZFI003Response): void => {
    toastSuccess(t('Tạo mới bảng kê thành công. Bạn có thể nộp bảng kê.'));
    if (isFunction(onSuccess)) onSuccess(data);
  };

  const handleCapNhatSuccess = (data: API.ZFI005Response): void => {
    toastSuccess(t('Lưu bảng kê thành công. Bạn có thể nộp bảng kê.'));
    if (isFunction(onSuccess)) onSuccess(data);
  };

  const taoMoiBangKe = (): void => {
    dispatch(
      action_ZFI003(
        {
          header: {
            BK_MONTH: moment(date).format('MM'),
            BK_YEAR: moment(date).format('YYYY'),
          },
          item: items,
        },
        {
          onFailure: handleFailure,
          onFinish: handleFinish,
          onSuccess: handleTaoMoiSuccess,
        },
        {},
      ),
    );
  };

  const capNhatBangKe = (): void => {
    dispatch(
      action_ZFI005(
        {
          BK_ID: idBangKe,
          item: items,
        },
        {
          onFailure: handleFailure,
          onFinish: handleFinish,
          onSuccess: handleCapNhatSuccess,
        },
        {},
      ),
    );
  };

  const handleLuuBangKe = (): void => {
    setLoading(true);

    if (isNil(idBangKe) && isDate(date)) {
      taoMoiBangKe();
    }

    if (!isNil(idBangKe)) {
      capNhatBangKe();
    }
  };

  return (
    <Button color="primary" onClick={handleLuuBangKe} {...rest}>
      {loading ? <i className="fa fa-spinner fa-spin mr-2" /> : <i className="fa fa-save mr-2" />}
      {t('Lưu')}
    </Button>
  );
};

export default ButtonLuuBangKe;
