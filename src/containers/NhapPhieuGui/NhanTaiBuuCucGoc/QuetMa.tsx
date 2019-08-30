import React, { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Row } from 'reactstrap';
import { get } from 'lodash';
import { Cell } from 'react-table';
import moment from 'moment';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { makeSelectorNhanChuyenThu } from 'redux/MIOA_ZTMI023/selectors';

// eslint-disable-next-line max-lines-per-function
const QuetMa: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataNhanChuyenThu = useSelector(makeSelectorNhanChuyenThu);

  const [codeChuyenThu, setCodeChuyenThu] = useState<string>('4800000278');

  function handleChangeCodeChuyenThu(e: ChangeEvent<HTMLInputElement>): void {
    setCodeChuyenThu(e.target.value);
  }

  function handleSearchCodeChuyenThu(): void {
    dispatch(
      action_MIOA_ZTMI023({
        IV_ID: codeChuyenThu,
      }),
    );
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Số vận đơn'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
        Cell: ({ row }: Cell): JSX.Element => {
          const weight = parseFloat(get(row, 'values.GRO_WEI_VAL', '')).toFixed(2);
          return <>{weight}</>;
        },
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
        Cell: ({ row }: Cell): JSX.Element => {
          const date = get(row, 'values.CREATED_ON', '');
          return <>{moment(date, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY ')}</>;
        },
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

  function renderForwardingOrderCodeScan(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input
            value={codeChuyenThu}
            onChange={handleChangeCodeChuyenThu}
            type="text"
            placeholder="Quét mã phiếu gửi"
          />
          <Button onClick={handleSearchCodeChuyenThu} color="primary">
            Quét mã
          </Button>
        </div>
        <p className="pull-right m-0">Tổng số: 50</p>
      </div>
    );
  }
  return (
    <>
      {renderForwardingOrderCodeScan()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataNhanChuyenThu} />
      </Row>
    </>
  );
};

export default QuetMa;
