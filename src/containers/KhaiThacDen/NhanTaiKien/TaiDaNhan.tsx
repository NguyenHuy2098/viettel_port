import React, { useCallback, useMemo } from 'react';
import { Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { map, toLower } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { push } from 'connected-react-router';
import { generatePath } from 'react-router';
import routesMap from '../../../utils/routesMap';

interface Props {
  data: API.RowMTZTMI047OUT[];
  getTaiDaNhan: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiDaNhan: React.FC<Props> = ({ data, getTaiDaNhan }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const totalPage = useSelector(makeSelectorTotalPage('ZC2', 107));

  const handleControllerClick = useCallback(
    item => (): void => {
      // eslint-disable-next-line no-console
      console.log('clicked', item);
    },
    [],
  );
  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getTaiDaNhan(selectedItem.selected + 1);
  };

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
    [],
  );

  const rows = map(data, (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      FR_LOG_ID: item.LOG_LOCID_FR,
      TO_LOG_ID: item.LOG_LOCID_TO,
      countChuyenThu: '',
      GRO_WEI_VAL: parseFloat(item.NET_WEI_VAL || '0').toPrecision(3) + ' ' + toLower(item.NET_WEI_UNI),
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
    };
  });

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return (
    <>
      <div className="mb-3"></div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={rows} onRowClick={handleRedirectDetail} />
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

export default TaiDaNhan;
