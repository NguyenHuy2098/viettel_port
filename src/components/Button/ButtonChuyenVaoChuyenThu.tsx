import React from 'react';
import { Button, ButtonProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { toastError } from 'components/Toast';

interface Props extends ButtonProps {
  idChuyenThu: string;
  listTaiKienCanChuyen?: ForwardingItem[];
  onChuyenVaoChuyenThu?: Function;
}

const ButtonChuyenVaoChuyenThu = (props: Props): JSX.Element => {
  const { idChuyenThu, listTaiKienCanChuyen, onChuyenVaoChuyenThu, ...rest } = props;
  const { t } = useTranslation();

  const handleDongChuyenThu = (): void => {
    onChuyenVaoChuyenThu && onChuyenVaoChuyenThu();
    if (isEmpty(listTaiKienCanChuyen)) {
      toastError(t('Chưa chọn tải kiện'));
    }
  };

  return (
    <Button color="primary" onClick={handleDongChuyenThu} {...rest}>
      <i className="fa fa-download rotate-90 mr-2" />
      {props.children || t('Chuyển vào CT')}
    </Button>
  );
};

ButtonChuyenVaoChuyenThu.defaultProps = {
  listTaiKienCanChuyen: [],
};

export default ButtonChuyenVaoChuyenThu;
