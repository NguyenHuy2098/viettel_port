import React, { useCallback, useMemo } from 'react';
import { Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';

import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const TaiDaNhan: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const data = [
    {
      TOR_ID: 4545,
      FR_LOG_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      GRO_WEI_VAL: 1200,
      CREATED_ON: '12/12/2019',
      TYPE_OF: 'Kiện',
    },
    {
      TOR_ID: 42365,
      FR_LOG_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      GRO_WEI_VAL: 2500,
      CREATED_ON: '12/12/2019',
      TYPE_OF: 'Tải',
    },
  ];

  const handleControllerClick = useCallback(
    item => (): void => {
      // eslint-disable-next-line no-console
      console.log('clicked', item);
    },
    [],
  );

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

  return (
    <>
      <div className="mb-3"></div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default TaiDaNhan;
