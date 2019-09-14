import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { forEach, map, get, isNil } from 'lodash';
import { push } from 'connected-react-router';

import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import routesMap from 'utils/routesMap';
import { generatePath } from 'react-router';

// eslint-disable-next-line max-lines-per-function
const NhanRiengTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [api023Record, setApi023Record] = useState<API.RowResponseZTMI023OUT[] | null>(null);
  const [showTaiKienDaDuocNhanMessage, setShowTaiKienDaDuocNhanMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const dispatch_Action_MIOA_ZTMI022 = useCallback(
    (torId: string, api023Row: API.RowResponseZTMI023OUT[] | null): void => {
      dispatch(
        action_MIOA_ZTMI022(
          {
            row: {
              CU_NO: '',
              FU_NO: torId,
              STATUS_ID: '1',
              USER_ID: 'KT1',
              LOC_ID: 'HUB1',
            },
          },
          {
            onSuccess: (data: API.MIOAZTMI022Response): void => {
              if ((data.MT_ZTMI022_OUT, 'EV_ERROR')) {
                setApi023Record(api023Row);
              }
            },
          },
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const dispatch_Action_MIOA_ZTMI023 = useCallback((): void => {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: torIdSearch,
        },
        {
          onSuccess: (data: API.MIOAZTMI023Response): void => {
            if (!isNil(data.MT_ZTMI023_OUT)) {
              forEach(get(data, 'MT_ZTMI023_OUT.row'), (row: API.RowResponseZTMI023OUT) => {
                if (
                  (row.TOR_TYPE === 'ZC2' || row.TOR_TYPE === 'ZBIG') &&
                  row.ZVTP_CUST_STATUS === 106 &&
                  row.TO_LOG_ID === 'HUB1'
                ) {
                  dispatch_Action_MIOA_ZTMI022(row.TOR_ID || '', get(data, 'MT_ZTMI023_OUT.row', null));
                } else {
                  if (row.ZVTP_CUST_STATUS === 107) {
                    setShowTaiKienDaDuocNhanMessage(true);
                  } else {
                    setShowErrorMessage(true);
                  }
                }
              });
            }
          },
          onFailure: (): void => {
            setShowErrorMessage(true);
          },
        },
      ),
    );
  }, [dispatch, torIdSearch, dispatch_Action_MIOA_ZTMI022]);

  const handleControllerClick = useCallback(
    item => (): void => {
      // eslint-disable-next-line no-console
      console.log('clicked', item);
    },
    [],
  );

  const data = map(api023Record, (item: API.RowResponseZTMI023OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      FR_LOG_ID: item.FR_LOG_ID,
      TO_LOG_ID: item.TO_LOG_ID,
      countChuyenThu: '',
      GRO_WEI_VAL: item.GRO_WEI_VAL,
      CREATED_ON: moment(item.CREATED_ON, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      TYPE_OF: item.TOR_TYPE,
    };
  });

  const columns = useMemo(
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
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
        accessor: 'TYPE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={handleControllerClick(row.original)}>
                <i className="fa fa-print fa-lg color-green" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, api023Record],
  );

  const handleOnChangeScanTorId = (event: React.FormEvent<HTMLInputElement>): void => {
    setTorIdSearch(event.currentTarget.value);
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowResponseZTMI023OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api023Record],
  );

  const sipTableContent = (): JSX.Element => {
    if (showTaiKienDaDuocNhanMessage) return <div>{t('Tải kiện đã được nhận')}</div>;
    if (showErrorMessage) return <div>{t('Có lỗi xảy ra')}</div>;
    return <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />;
  };

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-barcode" />
              <Input
                type="text"
                placeholder={t('Quét mã tải kiện')}
                onChange={handleOnChangeScanTorId}
                value={torIdSearch}
              />
            </div>
            <Button className="ml-2" color="primary" onClick={dispatch_Action_MIOA_ZTMI023}>
              {t('Quét mã')}
            </Button>
          </div>
        </Row>
      </div>
      <Row className="sipTableContainer">{sipTableContent()}</Row>
    </>
  );
};

export default NhanRiengTaiKien;
