import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
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
const BangKePhieuGuiChuaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idBangKePhieuGui, setIdBangKePhieuGui] = useState<string>('');
  const listBangKePhieuGuiChuaNhan = useSelector(
    makeSelector046ChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN),
  );

  function handleScanTaiKien(): void {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idBangKePhieuGui,
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
    setIdBangKePhieuGui(event.target.value);
  }

  const redirectToThongTinBangKe = useCallback((item: API.Child): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_BANG_KE_PHIEU_GUI, { idBangKe: item.TOR_ID })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã BK/PG'),
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
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
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
        <Col className="btn-toolbar col-10">
          <div className="sipTitleRightBlockInput w-50 mr-2">
            <i className="fa fa-barcode" />
            <Input
              type="text"
              placeholder={t('Quét mã bảng kê/phiếu gửi')}
              onChange={handleChangeTaiKien}
              className="backgroundColorNeural6"
            />
          </div>
          <Button color="primary" onClick={handleScanTaiKien}>
            {t('Quét mã')}
          </Button>
        </Col>
        {/*<Col className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận')}*/}
        {/*  </Button>*/}
        {/*</Col>*/}
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listBangKePhieuGuiChuaNhan} onRowClick={redirectToThongTinBangKe} />
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

export default withRouter(BangKePhieuGuiChuaNhan);
