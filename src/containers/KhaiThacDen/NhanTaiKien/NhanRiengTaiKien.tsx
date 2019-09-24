import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DataTable from 'components/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router';
import { Cell } from 'react-table';
import moment from 'moment';
import { ceil, get } from 'lodash';
import { push } from 'connected-react-router';

import Pagination from 'components/Pagination';
import Scan from 'components/Input/Scan';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getTaiKienChuaNhan: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const NhanRiengTaiKien: React.FC<Props> = (props: Props): JSX.Element => {
  const { getTaiKienChuaNhan } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const maBP = useSelector(makeSelectorMaBP);
  const userId = useSelector(makeSelectorPreferredUsername);
  const listTaiKienChuaNhan = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const [idTaiKien, setIdTaiKien] = useState<string>('');

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getTaiKienChuaNhan(selectedItem.selected + 1);
  };

  const handleQuetTaiKienId = (): void => {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idTaiKien,
        },
        {
          onSuccess: (data: API.MIOAZTMI023Response) => {
            const infoTaiKien: API.RowResponseZTMI023OUT = get(data, 'MT_ZTMI023_OUT.row[0]');
            dispatch(
              action_MIOA_ZTMI022(
                {
                  row: {
                    CU_NO: '',
                    FU_NO: get(infoTaiKien, 'TOR_ID'),
                    LOC_ID: maBP,
                    STATUS_ID: '1',
                    USER_ID: userId,
                  },
                },
                // {
                //   onSuccess: (data: API.MIOAZTMI022Response) => {
                //     console.log(data);
                //   },
                // },
              ),
            );
          },
        },
      ),
    );
  };

  const handlePrintRowItem = useCallback(
    item => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.stopPropagation();
    },
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã tải/kiện'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.NET_WEI_VAL'), 2)} ${get(row, 'original.NET_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon" onClick={handlePrintRowItem(row.original)}>
              <i className="fa fa-print fa-lg color-green" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleOnChangeScanTorId = (event: React.FormEvent<HTMLInputElement>): void => {
    setIdTaiKien(event.currentTarget.value);
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowResponseZTMI023OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienChuaNhan],
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <Scan
              onChange={handleOnChangeScanTorId}
              onClick={handleQuetTaiKienId}
              placeholder={t('Quét mã tải/kiện')}
            />
          </div>
        </Row>
      </div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listTaiKienChuaNhan || []} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default NhanRiengTaiKien;
