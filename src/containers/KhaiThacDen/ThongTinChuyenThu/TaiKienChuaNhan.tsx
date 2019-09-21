import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

// import blackBag from 'assets/img/blackBag.png';
// import deliveryBox from 'assets/img/box.png';
import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';
import Pagination from '../../../components/Pagination';

// eslint-disable-next-line max-lines-per-function
const TaiKienChuaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idTaiKien, setIdTaiKien] = useState<string>('');
  const listTaiKienChuaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.CHUYEN_THU_DA_QUET_NHAN));

  function handleQuetBangKePhieuGuiId(): void {
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

  function handleChangeBangKePhieuGuiId(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdTaiKien(event.target.value);
  }

  const redirectToThongTinTai = useCallback(
    (item: API.Child) => {
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải/kiện'),
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
        <div className="btn-toolbar col-10">
          <Scan
            onChange={handleChangeBangKePhieuGuiId}
            onClick={handleQuetBangKePhieuGuiId}
            placeholder={t('Quét mã tải/kiện')}
          />

          {/*<Button className="sipButtonTypeC mr-2">*/}
          {/*  <img src={blackBag} alt="black-bag" className="mr-2" />*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</Button>*/}
          {/*<Button className="sipButtonTypeC">*/}
          {/*  <img src={deliveryBox} alt="delivery-box" className="mr-2" />*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</Button>*/}
        </div>
        <div className="btn-toolbar col-2 align-items-end flex-column">
          <Button color="primary">
            <i className="fa fa-cube mr-1" />
            {t('Nhận')}
          </Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listTaiKienChuaNhan} onRowClick={redirectToThongTinTai} />
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

export default withRouter(TaiKienChuaNhan);
