import React, { useState } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { get, isEmpty, noop, size } from 'lodash';

import { actionQuetNhan } from 'redux/common/actions';
import { toastError, toastInfo, toastSuccess } from '../Toast';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  onSuccess?: (data: API.RowResponseZTMI023OUT) => void;
}

// eslint-disable-next-line max-lines-per-function
const Scan = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [torId, setTorId] = useState<string>('');
  const [shouldClear, setShouldClear] = useState<boolean>(false);

  const handleSuccessScan = (data: API.RowResponseZTMI023OUT): void => {
    onSuccess && onSuccess(data);
    toastSuccess('Quét nhận thành công.');
  };

  const handleQuetNhan = (): void => {
    if (!isEmpty(torId) && size(torId) >= 10) {
      dispatch(
        actionQuetNhan(
          { IV_ID: torId },
          {
            onFailure: (error: Error): void => {
              toastError(get(error, 'message', 'Đã có lỗi xảy ra.'));
            },
            onFinish: () => {
              setShouldClear(true);
            },
            onSuccess: handleSuccessScan,
          },
        ),
      );
    } else {
      toastInfo(t('Hãy sử dụng thiết bị quét hoặc nhập mã số thủ công.'));
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTorId(event.currentTarget.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      handleQuetNhan();
    } else if (shouldClear) {
      setShouldClear(false);
      setTorId('');
    }
  };

  return (
    <Row className={classNames('flex-fill', get(containerProps, 'className'))}>
      <Col lg={9}>
        <div className="sipTitleRightBlockInput">
          <i className="fa fa-barcode" />
          <Input
            className="bg-gray-100"
            onChange={handleChangeValue}
            onKeyPress={handleKeyPress}
            type="search"
            value={torId}
            {...rest}
          />
        </div>
      </Col>
      <Col className="px-0" lg={3}>
        <Button color="primary" onClick={handleQuetNhan} {...buttonProps}>
          {t('Quét mã')}
        </Button>
      </Col>
    </Row>
  );
};

Scan.defaultProps = {
  onSuccess: noop,
};

export default Scan;
