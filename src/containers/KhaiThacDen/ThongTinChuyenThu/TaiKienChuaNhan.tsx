import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { Col, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import Scan from 'components/Input/Scan';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState, SipDataTorType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getThongTinChuyenThu: () => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiKienChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { getThongTinChuyenThu } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listTaiKienChuaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.CHUYEN_THU_DA_QUET_NHAN));

  const redirectToThongTinTai = useCallback(
    (item: API.Child) => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bảng kê thuộc tải'),
      }}
    />
  );
  const inMaCoTaiButton = (idTai: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-barcode fa-lg color-blue" />,
      }}
      modalBodyProps={{
        children: <PrintableMaCoTai idTai={idTai} />,
      }}
      modalHeaderProps={{
        children: t('In mã cổ tải'),
      }}
    />
  );

  const handleSuccessQuetNhan = (): void => {
    getThongTinChuyenThu();
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
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
        accessor: 'child_count',
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const value = get(SipDataTorType, get(row, 'original.TOR_TYPE', ''), '');
          if (value) return value;
          return '';
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              {renderPrintButton(get(row, 'values.TOR_ID', ''))}
              {inMaCoTaiButton(get(row, 'values.TOR_ID', ''))}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienChuaNhan],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <Col className="btn-toolbar" md={6}>
          <Scan
            flow={SipFlowType.KHAI_THAC_DEN}
            onSuccess={handleSuccessQuetNhan}
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
        </Col>
        {/*<div className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận')}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listTaiKienChuaNhan} onRowClick={redirectToThongTinTai} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onThisPaginationChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default TaiKienChuaNhan;
