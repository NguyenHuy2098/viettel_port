import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Button, Input, FormGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { action_CHECK_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';

const HeaderSearch: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //________hook to trigger input focus validating
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeTextboxValue = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchValue(event.currentTarget.value);
  };

  const payloadOrder = {
    FWO_ID: searchValue,
    BUYER_REFERENCE_NUMBER: '',
  };

  const handleOrderSearch = (): void => {
    dispatch(
      action_CHECK_MIOA_ZTMI031(payloadOrder, {
        onSuccess: (data: API.MIOAZTMI031Response): void => {
          if (data) {
            dispatch(push(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang: searchValue })));
          } else {
            alert('No data!');
          }
        },
      }),
    );
  };

  return (
    <>
      <FormGroup className="sipHeaderSearch">
        <Input
          type="text"
          placeholder={t('Tra cứu đơn hàng')}
          value={searchValue}
          onChange={handleChangeTextboxValue}
        />
        <Button onClick={handleOrderSearch}>
          <i className="fa fa-search fa-lg" />
        </Button>
      </FormGroup>
    </>
  );
};
export default HeaderSearch;
