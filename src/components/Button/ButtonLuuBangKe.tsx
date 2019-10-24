import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import moment from 'moment';

import { action_ZFI003 } from 'redux/ZFI003/actions';

interface Props extends ButtonProps {
  date: Date;
  items: API.ITEM[];
}

const ButtonLuuBangKe = (props: Props): JSX.Element => {
  const { date, items, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        {},
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
