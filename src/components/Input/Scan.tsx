import React, { useState } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { get, isEmpty, noop } from 'lodash';

import { actionQuetNhan } from 'redux/common/actions';
import { toastError, toastInfo } from '../Toast';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  leftIcon?: React.ReactNode;
  onSuccess?: () => void;
}

const Scan = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, leftIcon, onSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [torId, setTorId] = useState<string>('');

  const handleSuccessScan = (): void => {
    onSuccess && onSuccess();
  };

  const handleQuetNhan = (): void => {
    if (!isEmpty(torId)) {
      dispatch(
        actionQuetNhan(
          { IV_ID: torId },
          {
            onFailure: (error: Error): void => {
              toastError(get(error, 'message', 'Đã có lỗi xảy ra.'));
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

  return (
    <Row className={classNames('flex-fill', get(containerProps, 'className'))}>
      <Col lg={9}>
        <div className="sipTitleRightBlockInput">
          {leftIcon || <i className="fa fa-barcode" />}
          <Input className="bg-gray-100" type="text" onChange={handleChangeValue} {...rest} />
        </div>
      </Col>
      <Col className="px-0" lg={3}>
        <Button color="primary" onClick={handleQuetNhan} {...buttonProps}>
          {get(buttonProps, 'children') || t('Quét mã')}
        </Button>
      </Col>
    </Row>
  );
};

Scan.defaultProps = {
  onSuccess: noop,
};

export default Scan;
