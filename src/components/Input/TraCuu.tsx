import React, { useState } from 'react';
import { Input, InputProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { get, size } from 'lodash';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import routesMap from 'utils/routesMap';
import { SipDataType } from 'utils/enums';
import { toastError } from '../Toast';

// eslint-disable-next-line max-lines-per-function
const TraCuu = (props: InputProps): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const redirectToDetail = (id: string, type: string): void => {
    switch (type) {
      case SipDataType.CHUYEN_THU:
        dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu: id })));
        break;
      case SipDataType.KIEN:
      case SipDataType.TAI:
        dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: id })));
        break;
      case SipDataType.BANG_KE:
        dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: id })));
        break;
    }
  };

  const handleTraCuu = (): void => {
    if (size(value) >= 10) {
      dispatch(
        action_MIOA_ZTMI046(
          { IV_TOR_ID: value },
          {
            onBeginning: (): void => {
              setLoading(true);
            },
            onSuccess: (data: API.MIOAZTMI046Response) => {
              const id = get(data, 'MT_ZTMI046_OUT.Row[0].TOR_ID');
              const type = get(data, 'MT_ZTMI046_OUT.Row[0].TOR_TYPE');
              setLoading(false);
              redirectToDetail(id, type);
            },
            onFailure: (error: Error) => {
              setLoading(false);
              toastError(error.message);
            },
          },
        ),
      );
    } else {
      toastError(t('Vui lòng nhập đúng mã với ít nhất 10 ký tự.'));
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      handleTraCuu();
    }
  };

  return (
    <div className="sipTitleRightBlockInput">
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-search" onClick={handleTraCuu} />}
      <Input
        onChange={handleChangeValue}
        onKeyPress={handleKeyPress}
        placeholder={t('Tra cứu')}
        type="search"
        {...props}
      />
    </div>
  );
};

export default TraCuu;
