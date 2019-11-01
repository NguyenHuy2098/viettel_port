import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import { get, isArray, isEmpty, isFunction, isString } from 'lodash';
import moment from 'moment';

import { action_ZFI003 } from 'redux/ZFI003/actions';
import { action_ZFI006 } from 'redux/ZFI006/actions';
import { toastError, toastSuccess } from '../Toast';

interface Props extends ButtonProps {
  date?: Date;
  idBangKe?: string;
  items?: API.ITEMBK[];
  onFailure?: (error: Error) => void;
  onSuccess?: (data: API.ZFI006Response) => void;
}

// eslint-disable-next-line max-lines-per-function
const ButtonNopBangKe = (props: Props): JSX.Element => {
  const { date, idBangKe, items, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFailure = (error: Error): void => {
    toastError(error.message);
    if (isFunction(onFailure)) onFailure(error);
  };

  const handleFinish = (): void => {
    setLoading(false);
  };

  const handleSuccess = (data: API.ZFI006Response): void => {
    toastSuccess(t('Nộp bảng kê thành công.'));
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
          onSuccess: (data: API.ZFI003Response): void => {
            nopBangKeCu(get(data, 'MT_CRBK_RECEIVER.BK_ID'));
          },
        },
        {},
      ),
    );
  };

  const nopBangKeCu = (idBangKe: string): void => {
    dispatch(
      action_ZFI006(
        {
          BK_ID: idBangKe,
        },
        {
          onFailure: handleFailure,
          onFinish: handleFinish,
          onSuccess: handleSuccess,
        },
        {},
      ),
    );
  };

  const nopBangKeMoi = (): void => {
    taoMoiBangKe();
  };

  const handleNopBangKe = (): void => {
    setLoading(true);
    if (isString(idBangKe) && !isEmpty(idBangKe)) {
      nopBangKeCu(idBangKe);
    } else if (isArray(items) && !isEmpty(items)) {
      nopBangKeMoi();
    }
  };

  return (
    <Button color="primary" onClick={handleNopBangKe} {...rest}>
      {loading ? <i className="fa fa-spinner fa-spin mr-2" /> : <i className="fa fa-send mr-2" />}
      {t('Nộp')}
    </Button>
  );
};

export default ButtonNopBangKe;
