import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Input, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { forEach, get, map, trim, toNumber, toLower } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { makeSelectorListChuyenThu } from 'redux/MIOA_ZTMI023/selectors';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';

interface Props {
  match: match;
  tableRows: API.RowMTZTMI047OUT[];
}
// eslint-disable-next-line max-lines-per-function
const NhanRiengBangKePhieuGui: React.FC<Props> = ({ tableRows }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listChuyenThu = useSelector(makeSelectorListChuyenThu);

  const [keySearch, setKeySearch] = useState<string>('');

  const [tableRecords, setTableRecords] = useState<API.RowResponseZTMI023OUT[]>([]);
  const [showReceivedMessage, setShowReceivedMessage] = useState<boolean>(false);
  const [showErrormessage, setShowErrorMessage] = useState<boolean>(false);

  const dispatchActionAPI_ZTMI023 = (): void => {
    dispatch(action_MIOA_ZTMI023({ IV_ID: keySearch }, {}));
  };

  const existInTableRecord = (el: API.RowResponseZTMI023OUT): boolean => {
    let exist = false;
    forEach(tableRecords, record => {
      if (record.TOR_ID === el.TOR_ID) {
        exist = true;
      }
    });
    return exist;
  };

  const dispatchactionApi_ZTMI022 = (torID: string, el: API.RowResponseZTMI023OUT): void => {
    dispatch(
      action_MIOA_ZTMI022(
        {
          row: {
            CU_NO: '',
            FU_NO: torID,
            STATUS_ID: '1',
            USER_ID: 'KT1',
            LOC_ID: 'HUB1',
          },
        },
        {
          onSuccess: (data: API.MIOAZTMI022Response): void => {
            if (data.MT_ZTMI022_OUT && get(data.MT_ZTMI022_OUT, 'EV_ERROR')) {
              setShowReceivedMessage(false);
              setShowErrorMessage(false);
              if (!existInTableRecord(el)) {
                setTableRecords([...tableRecords, el]);
              }
            }
          },
        },
      ),
    );
  };

  useEffect((): void => {
    forEach(listChuyenThu, el => {
      if (
        (el.TOR_TYPE === 'ZC1' && el.ZVTP_CUST_STATUS === 108) ||
        (el.TOR_TYPE === 'ZSML' && el.ZVTP_CUST_STATUS === 603 && el.TO_LOG_ID === 'HUB1')
      ) {
        dispatchactionApi_ZTMI022(el.TOR_ID || '', el);
      } else {
        if (el.ZVTP_CUST_STATUS === 109 || el.ZVTP_CUST_STATUS === 604) {
          setShowReceivedMessage(true);
          setShowErrorMessage(false);
        } else {
          setShowErrorMessage(true);
          setShowReceivedMessage(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listChuyenThu]);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('SL'),
        accessor: 'countChilds',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Loại'),
        accessor: 'TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const getTorTypeDisplayName = (torType: string): string => {
    switch (torType) {
      case 'ZC1':
        return 'Bảng kê';
      case 'ZC2':
        return 'Tải';
      case 'ZC3':
        return 'Chuyến thư';
      case 'ZBIG':
        return 'Kiện';
      case 'ZSML':
        return 'Phiếu gửi';
    }
    return '';
  };

  const data = map(tableRecords, item => {
    return {
      TOR_ID: item.TOR_TYPE === 'ZSML' ? item.PACKAGE_ID : item.TOR_ID,
      FR_LOG_ID: item.FR_LOG_ID,
      TO_LOG_ID: item.TO_LOG_ID,
      countChilds: 0,
      GRO_WEI_VAL: toNumber(item.GRO_WEI_VAL).toPrecision(2) + ' ' + toLower(item.GRO_WEI_UNI),
      TYPE: getTorTypeDisplayName(item.TOR_TYPE || ''),
      CREATED_ON: moment(trim(item.CREATED_ON), 'YYYYMMDDhhmmss').format('hh:mm DD/MM/YYYY'),
    };
  });
  const showMainContent = (): JSX.Element => {
    if (showErrormessage) return <div>{t('Đã có lỗi xảy ra')}</div>;
    if (showReceivedMessage) return <div>{t('Tải kiện đã được nhận')}</div>;
    return <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />;
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(`${routesMap.THONG_TIN_BANG_KE}`));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const handleSetKeySearch = (event: React.FormEvent<HTMLInputElement>): void => {
    setKeySearch(event.currentTarget.value);
  };
  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <div className="btn-toolbar col-12">
          <div className="sipTitleRightBlockInput m-0 col-4 p-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã bảng kê/phiếu gửi')} onChange={handleSetKeySearch} />
          </div>
          <Button color="primary" className="ml-2" onClick={dispatchActionAPI_ZTMI023}>
            {t('Quét mã')}
          </Button>
        </div>
      </div>
      <div className="row mt-3" />
      <Row className="sipTableContainer">{showMainContent()}</Row>
    </>
  );
};

export default NhanRiengBangKePhieuGui;
