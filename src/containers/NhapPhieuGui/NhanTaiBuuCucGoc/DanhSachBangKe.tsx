import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row, Table } from 'reactstrap';
import { push } from 'connected-react-router';
import { map } from 'lodash';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
function DanhSachBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);
  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(
      action_MIOA_ZTMI047(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          console.log(error.messages);
        },
      }),
    );
  }, [dispatch]);

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.danhSachPhieuGuiTrongBangKe}/${item.TOR_ID}`));
    };
  };

  const handleDeleteManifest = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: item.TOR_ID,
        IV_SLOCATION: '',
        IV_DLOCATION: '',
        IV_DESCRIPTION: '',
        T_ITEM: [
          {
            ITEM_ID: '',
            ITEM_TYPE: '',
          },
        ],
      };
      if (!window.confirm('Bạn có chắc chắn?')) return;
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC1',
              IV_FR_LOC_ID: 'BDH',
              IV_CUST_STATUS: '101',
              IV_TO_LOC_ID: '',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  function renderManifestTableAction(item: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button onClick={handleRedirectDetail(item)}>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button onClick={handleDeleteManifest(item)}>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  function renderManifestTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipBoxShadow">
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
            {map(
              listBangKeChuaDongTai,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index}>
                    <td>{item.TOR_ID}</td>
                    <td>{item.LOG_LOCID_DES}</td>
                    <td>{item.ITEM_NO}</td>
                    <td></td>
                    <td>{item.DATETIME_CHLC}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderManifestTableAction(item)}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderManifestIdSearch(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Mã bảng kê" />
          <Button color="primary">Tìm kiếm</Button>
        </div>
        <p className="pull-right m-0">Tổng số: {countBangKeChuaDongTai}</p>
      </div>
    );
  }

  return (
    <>
      {renderManifestIdSearch()}
      {renderManifestTable()}
    </>
  );
}

export default DanhSachBangKe;
