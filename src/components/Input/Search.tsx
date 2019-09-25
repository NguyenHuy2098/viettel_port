import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get } from 'lodash';

interface Props extends InputProps {
  buttonProps?: ButtonProps;
  containerProps?: RowProps;
  leftIcon?: React.ReactNode;
  onSubmitSearch?: (searchText: string) => void;
}

const Filter = (props: Props): JSX.Element => {
  const { buttonProps, containerProps, leftIcon, onSubmitSearch, ...rest } = props;
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');

  const submitSearch = (text = ''): void => {
    if (onSubmitSearch) {
      onSubmitSearch(text);
    }
  };

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.currentTarget.value);
  };

  const handleSubmitSearch = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      submitSearch(event.currentTarget.value);
    }
  };

  const handleClickSearch = (): void => {
    submitSearch(searchText);
  };

  return (
    <Row className={classNames('flex-fill', get(containerProps, 'className'))}>
      <Col lg={9}>
        <div className="sipTitleRightBlockInput">
          {leftIcon || <i className="fa fa-search" />}
          <Input
            className="bg-gray-100"
            onChange={handleChangeSearchText}
            onKeyPress={handleSubmitSearch}
            type="search"
            {...rest}
          />
        </div>
      </Col>
      <Col className="px-0" lg={3}>
        <Button color="primary" onClick={handleClickSearch} {...buttonProps}>
          {get(buttonProps, 'children') || t('Tìm kiếm')}
        </Button>
      </Col>
    </Row>
  );
};

export default Filter;
