import React, { useCallback, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import Pagination from 'components/Pagination';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { useSipDataType } from 'hooks/useTranslations';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getThongTinTai: () => void;
}

// eslint-disable-next-line max-lines-per-function
const BangKePhieuGuiChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { getThongTinTai } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listBangKePhieuGuiChuaNhan = useSelector(
    makeSelector046ChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN),
  );

  const redirectToThongTinBangKe = useCallback((item: API.Child): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_BANG_KE_PHIEU_GUI, { idBangKe: item.TOR_ID })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccessQuetNhan = (): void => {
    getThongTinTai();
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bưu gửi của bảng kê'),
      }}
    />
  );

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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{useSipDataType(get(row, 'original.TOR_TYPE'))}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{renderPrintButton(get(row, 'values.TOR_ID', ''))}</>;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderToolbar = (): JSX.Element => {
    return (
      <Row>
        <Col className="btn-toolbar" md={6}>
          <Scan flow={SipFlowType.KHAI_THAC_DEN} onSuccess={handleSuccessQuetNhan} placeholder={t('Quét mã bảng kê')} />
        </Col>
        {/*<Col className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận')}*/}
        {/*  </Button>*/}
        {/*</Col>*/}
      </Row>
    );
  };

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listBangKePhieuGuiChuaNhan} onRowClick={redirectToThongTinBangKe} />
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

export default BangKePhieuGuiChuaNhan;
