import React, { useState } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { get, has, isEmpty, join, noop, size } from 'lodash';

import { actionQuetDi, actionQuetNhan } from 'redux/common/actions';
import { SipFlowType } from 'utils/enums';
import { toastError, toastInfo, toastSuccess } from '../Toast';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  flow: SipFlowType;
  onSuccess?: (data: API.RowResponseZTMI023OUT) => void;
  targetItemId?: string;
}

// eslint-disable-next-line max-lines-per-function
const Scan = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, flow, onSuccess, targetItemId, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [torId, setTorId] = useState<string>('');
  const [shouldClear, setShouldClear] = useState<boolean>(false);

  const quetDi = (): void => {
    dispatch(
      actionQuetDi(
        { IV_ID: torId, targetItemId },
        {
          onFailure: (error: Error): void => {
            if (has(error, 'messages')) {
              toastError(join(get(error, 'messages'), ' '));
            } else {
              toastError(get(error, 'message', 'Đã có lỗi xảy ra.'));
            }
          },
          onFinish: () => {
            setShouldClear(true);
          },
          onSuccess: (data: API.RowResponseZTMI023OUT) => {
            onSuccess && onSuccess(data);
            toastSuccess('Quét nhận thành công.');
          },
        },
      ),
    );
  };

  const quetNhan = (): void => {
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
          onSuccess: (data: API.RowResponseZTMI023OUT) => {
            onSuccess && onSuccess(data);
            toastSuccess('Quét nhận thành công.');
          },
        },
      ),
    );
  };

  const handleScan = (): void => {
    if (!isEmpty(torId) && size(torId) >= 10) {
      if (flow === SipFlowType.KHAI_THAC_DI) {
        quetDi();
      } else if (flow === SipFlowType.KHAI_THAC_DEN) {
        quetNhan();
      }
    } else {
      toastInfo(t('Hãy sử dụng thiết bị quét hoặc nhập mã số thủ công.'));
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTorId(event.currentTarget.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      handleScan();
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
        <Button color="primary" onClick={handleScan} {...buttonProps}>
          {t('Quét mã')}
        </Button>
      </Col>
    </Row>
  );
};

Scan.defaultProps = {
  buttonProps: {},
  containerProps: {},
  onSuccess: noop,
  targetItemId: '',
};

export default Scan;
