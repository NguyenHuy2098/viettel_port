import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Table } from 'reactstrap';
import { getListBangKe } from 'redux/bangKe/actions';
import { AppStateType } from 'redux/store';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';

// eslint-disable-next-line max-lines-per-function
function OriginalPostOffice(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const listBangKe = useSelector((state: AppStateType): AppStateType => {
    return state.bangKe;
  }, shallowEqual);

  console.log(listBangKe);

  useEffect((): void => {
    const payload = {
      // IV_TOR_ID: '4700000500',
      IV_TOR_TYPE: 'ZC1',
      // IV_FR_LOC_ID: '3062',
      // IV_CUST_STATUS: '',
    };
    dispatch(
      getListBangKe(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          setError(error.message);
        },
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Row className="sipTableContainer">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Mã bảng kê')}</th>
              <th>{t('Điểm đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Người nhập')}</th>
              <th>{t('Ngày nhập')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BK-2683077-TTKT1</td>
              <td>TTKT1</td>
              <td>TTKT3</td>
              <td>25</td>
              <td>Nguyễn Văn An</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default OriginalPostOffice;
