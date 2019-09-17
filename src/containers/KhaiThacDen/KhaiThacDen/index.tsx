import React, { useCallback, useMemo } from 'react';
import { Button, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const OperationSack: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const data = [
    {
      TOR_ID: 4545,
      FR_LOG_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      GRO_WEI_VAL: 1200,
      CREATED_ON: '12/12/2019',
      NOTE: 'Chả có gì',
    },
    {
      TOR_ID: 42365,
      FR_LOG_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      GRO_WEI_VAL: 2500,
      CREATED_ON: '12/12/2019',
      NOTE: 'Chả có gì',
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
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
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
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon" onClick={handleControllerClick(row.original)}>
              <i className="fa fa-pencil fa-lg color-blue" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Khai thác tải')}</h1>
      </Row>

      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Mã tải" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </div>
  );
};

export default OperationSack;
