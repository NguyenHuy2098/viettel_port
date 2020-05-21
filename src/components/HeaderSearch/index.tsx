import React, { useState, useEffect } from 'react';
import { Button, Input, FormGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { push, replace } from 'connected-react-router';
import { includes, size, trim } from 'lodash';

import { toastError } from 'components/Toast';
import { action_CHECK_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import routesMap from 'utils/routesMap';

interface Props {
  url: string;
}

// eslint-disable-next-line max-lines-per-function
const HeaderSearch: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    setSearchValue(trim(event.currentTarget.value));
  };

  const handleOrderSearch = (): void => {
    if (size(searchValue)) {
      const payload = {
        FWO_ID: searchValue,
        BUYER_REFERENCE_NUMBER: '',
      };
      dispatch(
        action_CHECK_MIOA_ZTMI031(payload, {
          onSuccess: (): void => {
            if (includes(props.url, routesMap.THONG_TIN_DON_HANG_ORIGIN)) {
              dispatch(replace(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang: searchValue })));
              //  window.location.reload();
            } else {
              dispatch(push(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang: searchValue })));
            }
          },
          onFailure: (): void => {
            toastError(t('Không tìm thấy đơn hàng!'));
          },
        }),
      );
    }
  };

  const handleEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) handleOrderSearch();
  };

  return (
    <>
      <FormGroup className="sipHeaderSearch">
        <Input
          type="text"
          placeholder={t('Tra cứu đơn hàng')}
          value={searchValue}
          onChange={handleChangeTextboxValue}
          onKeyPress={handleEnterSearch}
        />
        <Button color="primary" onClick={handleOrderSearch}>
          <i className="fa fa-search fa-lg" />
        </Button>
      </FormGroup>
    </>
  );
};
export default HeaderSearch;
