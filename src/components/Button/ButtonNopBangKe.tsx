import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import { isFunction } from 'lodash';

import { action_ZFI006 } from 'redux/ZFI006/actions';
import { toastError, toastSuccess } from '../Toast';

interface Props extends ButtonProps {
  idBangKe: string;
  onFailure?: (error: Error) => void;
  onSuccess?: (data: API.ZFI006Response) => void;
}

const ButtonNopBangKe = (props: Props): JSX.Element => {
  const { idBangKe, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleFailure = (error: Error): void => {
    toastError(error.message);
    if (isFunction(onFailure)) onFailure(error);
  };

  const handleSuccess = (data: API.ZFI006Response): void => {
    toastSuccess(t('Nộp bảng kê thành công.'));
    if (isFunction(onSuccess)) onSuccess(data);
  };

  const handleNopBangKe = (): void => {
    dispatch(
      action_ZFI006(
        {
          BK_ID: idBangKe,
        },
        {
          onFailure: handleFailure,
          onSuccess: handleSuccess,
        },
        {},
      ),
    );
  };

  return (
    <Button color="primary" onClick={handleNopBangKe} {...rest}>
      <i className="fa fa-send mr-2" />
      {t('Nộp')}
    </Button>
  );
};

export default ButtonNopBangKe;
