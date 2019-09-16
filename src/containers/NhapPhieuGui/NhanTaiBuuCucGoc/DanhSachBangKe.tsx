import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { map, toString, trim } from 'lodash';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import moment from 'moment';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import DataTable from 'components/DataTable';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';

// eslint-disable-next-line max-lines-per-function
function DanhSachBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);
  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC3',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '104',
      IV_TO_LOC_ID: '',
      IV_FR_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
      IV_TO_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_MIOA_ZTMI047(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE}/${item.TOR_ID}`));
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
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onSuccess: (): void => {
            alert(t('Xóa thành công!'));
          },
          onFailure: (error: HttpRequestErrorType): void => {
            alert(error.messages);
          },
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
  const columns = useMemo(
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Người nhập'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày nhập'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={handleRedirectDetail(row.original)}>
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <ModalPopupConfirm handleDoSomething={handleDeleteManifest} />
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(listBangKeChuaDongTai, (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      countChuyenThu: 222,
      PERSONAL: item.ITEM_NO,
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: item.EXEC_CONT,
    };
  });
  return (
    <>
      {renderManifestIdSearch()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
}

export default DanhSachBangKe;
