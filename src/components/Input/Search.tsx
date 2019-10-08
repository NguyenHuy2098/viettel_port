import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, ButtonProps, Col, Input, InputProps, Row, RowProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get, trim } from 'lodash';

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
      onSubmitSearch(trim(text));
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
      <Col lg={8} xl={9}>
        <div className="sipTitleRightBlockInput">
          {leftIcon || <i className="fa fa-search" />}
          <Input
            className="bg-gray-100"
            onChange={handleChangeSearchText}
            onEmptied={handleClickSearch}
            onKeyPress={handleSubmitSearch}
            type="search"
            {...rest}
          />
        </div>
      </Col>
      <Col className="px-0">
        <Button className="w-100" color="primary" onClick={handleClickSearch} {...buttonProps}>
          {get(buttonProps, 'children') || t('Tìm kiếm')}
        </Button>
      </Col>
    </Row>
  );
};

export default Filter;
