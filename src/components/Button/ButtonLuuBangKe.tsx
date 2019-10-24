import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import moment from 'moment';
import { isFunction } from 'lodash';

import { action_ZFI003 } from 'redux/ZFI003/actions';
import { toastError } from '../Toast';

interface Props extends ButtonProps {
  date: Date;
  items: API.ITEMBK[];
  onFailure?: (error: Error) => void;
  onSuccess?: (data: API.ZFI003Response) => void;
}

const ButtonLuuBangKe = (props: Props): JSX.Element => {
  const { date, items, onFailure, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleFailure = (error: Error): void => {
    toastError(error.message);
    if (isFunction(onFailure)) onFailure(error);
  };

  const handleLuuBangKe = (): void => {
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
          onSuccess,
        },
        {},
      ),
    );
  };

  return (
    <Button color="primary" onClick={handleLuuBangKe} {...rest}>
      <i className="fa fa-save mr-2" />
      {t('Lưu')}
    </Button>
  );
};

export default ButtonLuuBangKe;
