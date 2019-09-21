import React from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get } from 'lodash';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  leftIcon?: React.ReactNode;
}

const Scan = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, leftIcon, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Row className={classNames('flex-fill', get(containerProps, 'className'))}>
      <Col xs={6}>
        <div className="sipTitleRightBlockInput">
          {leftIcon || <i className="fa fa-barcode" />}
          <Input className="bg-gray-100" type="text" {...rest} />
        </div>
      </Col>
      <Col className="px-0">
        <Button color="primary" {...buttonProps}>
          {get(buttonProps, 'children') || t('Quét mã')}
        </Button>
      </Col>
    </Row>
  );
};

export default Scan;
