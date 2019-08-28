import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row } from 'reactstrap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const QuetMa: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderForwardingOrderCodeScan(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
        <p className="pull-right m-0">Tổng số: 50</p>
      </div>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: t('Số vận đơn'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = [
    {
      TOR_ID: 4545,
      FR_LOG_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      PERSONAL: 'Nguyen Thu Thuy',
      CREATED_ON: '12/12/2019',
      NOTE_OF: 'Note',
    },
    {
      TOR_ID: 4545,
      FR_LOG_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      PERSONAL: 'Nguyen Thu Thuy',
      CREATED_ON: '12/12/2019',
      NOTE_OF: 'Note',
    },
  ];
  return (
    <>
      {renderForwardingOrderCodeScan()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default QuetMa;
