import React, { useMemo, useState } from 'react';
import { Button, Row, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { ceil, get, isEmpty } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import Scan from 'components/Input/Scan';
import { actionQuetNhan } from 'redux/common/actions';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';

// eslint-disable-next-line max-lines-per-function
const PhieuGuiChuaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idPhieuGui, setIdPhieuGui] = useState<string>('');
  const listPhieuGuiChuaNhan = useSelector(
    makeSelector046ChildrenByLifecycle([
      SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_TTKT,
      SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );

  function handleQuetPhieuGuiId(): void {
    if (!isEmpty(idPhieuGui)) {
      dispatch(actionQuetNhan({ IV_ID: idPhieuGui }));
    }
  }

  function handleChangePhieuGuiId(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdPhieuGui(event.target.value);
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
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
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'count',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <i className="fa fa-print fa-lg color-green" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <Scan
            buttonProps={{
              onClick: handleQuetPhieuGuiId,
            }}
            onChange={handleChangePhieuGuiId}
            placeholder={t('Quét mã phiếu gửi')}
          />
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-primary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
        </div>
        {/*<div className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận phiếu gửi')}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listPhieuGuiChuaNhan} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(PhieuGuiChuaNhan);
