import React, { useState, FormEvent, KeyboardEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { includes, size, trim } from 'lodash';
import { Button, Input, FormGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { action_CHECK_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { push, replace } from 'connected-react-router';
import routesMap from 'utils/routesMap';

interface Props {
  url: string;
}

// eslint-disable-next-line max-lines-per-function
const HeaderSearch: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //________hook to trigger input focus validating
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect((): void => {
    if (
      !includes(props.url, routesMap.THONG_TIN_DON_HANG_ORIGIN) &&
      !includes(props.url, routesMap.THONG_TIN_KIEN_HANG_ORIGIN)
    ) {
      setSearchValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url]);

  const handleChangeTextboxValue = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchValue(event.currentTarget.value);
  };

  const payloadOrder = {
    FWO_ID: searchValue,
    BUYER_REFERENCE_NUMBER: '',
  };

  const handleOrderSearch = (): void => {
    if (size(trim(searchValue))) {
      if (includes(props.url, routesMap.THONG_TIN_DON_HANG_ORIGIN)) {
        dispatch(replace(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang: searchValue })));
      } else {
        dispatch(push(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang: searchValue })));
      }
      dispatch(action_CHECK_MIOA_ZTMI031(payloadOrder));
    }
  };

  function handleEnterSearch(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.keyCode === 13) handleOrderSearch();
  }

  return (
    <>
      <FormGroup className="sipHeaderSearch">
        <Input
          type="text"
          placeholder={t('Tra cứu đơn hàng')}
          value={searchValue}
          onChange={handleChangeTextboxValue}
          onKeyUp={handleEnterSearch}
        />
        <Button onClick={handleOrderSearch}>
          <i className="fa fa-search fa-lg" />
        </Button>
      </FormGroup>
    </>
  );
};
export default HeaderSearch;
