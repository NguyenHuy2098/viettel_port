import React, { KeyboardEvent, useCallback } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import { get, isArray, isEmpty } from 'lodash';
import './styles.scss';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  leftIcon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchResult?: any[];
}

const Search = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, leftIcon, searchResult, ...rest } = props;
  const { t } = useTranslation();

  const handleClickButton = useCallback(() => {
    if (isArray(searchResult) && isEmpty(searchResult)) {
      toast(
        <>
          <i className="fa fa-info-circle mr-2" />
          {t('Không tìm thấy dữ liệu!')}
        </>,
        {
          type: 'info',
        },
      );
    }
  }, [searchResult]);

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      handleClickButton();
    }
  };

  return (
    <Row className={classNames('flex-fill', get(containerProps, 'className'))}>
      <Col xs={6}>
        <div className="sipTitleRightBlockInput">
          {leftIcon || <i className="fa fa-search" />}
          <Input className="bg-gray-100" onKeyPress={handleInputKeyPress} type="search" {...rest} />
        </div>
      </Col>
      <Col className="px-0">
        <Button color="primary" {...buttonProps} onClick={handleClickButton}>
          {get(buttonProps, 'children') || t('Tìm kiếm')}
        </Button>
        <ToastContainer />
      </Col>
    </Row>
  );
};

export default Search;
