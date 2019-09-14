import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row, Input, Label, InputGroupAddon, InputGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const PhieuGuiChuaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idPhieuGui, setIdPhieuGui] = useState<string>('');
  const listPhieuGuiChuaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.PHIEU_GUI_CHUA_QUET_NHAN));

  function handleQuetPhieuGui(): void {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idPhieuGui,
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
                    LOC_ID: 'HUB1',
                    STATUS_ID: '1',
                    USER_ID: 'KT1',
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
  }

  function handleChangeTaiKien(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdPhieuGui(event.target.value);
  }

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => (): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải kiện'),
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
        Cell: ({ row }: Cell): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
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
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                <i className="fa fa-barcode" />
              </span>
            </InputGroupAddon>
            <Input
              className="w-25 mr-2"
              onChange={handleChangeTaiKien}
              type="text"
              placeholder={t('Quét mã tải kiện')}
            />
          </InputGroup>
          <Button className="mr-2" color="primary" onClick={handleQuetPhieuGui}>
            {t('Quét mã')}
          </Button>
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-primary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
        </div>
        <div className="btn-toolbar col-2 align-items-end flex-column">
          <Button color="primary">{t('Nhận tải kiện')}</Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listPhieuGuiChuaNhan} onRowClick={handleRedirectDetail} />
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
