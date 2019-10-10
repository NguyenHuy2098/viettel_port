import React, { useMemo } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { ceil, get, split } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import PrintableThongTinDonHang from 'components/PrintableThongTinDonHang';
import Scan from 'components/Input/Scan';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState, SipFlowType } from 'utils/enums';

interface Props {
  getThongTinBangKe: () => void;
}

// eslint-disable-next-line max-lines-per-function
const PhieuGuiChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { getThongTinBangKe } = props;
  const { t } = useTranslation();
  const listPhieuGuiChuaNhan = useSelector(
    makeSelector046ChildrenByLifecycle([
      SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_TTKT,
      SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );

  const handleSuccessQuetNhan = (): void => {
    getThongTinBangKe();
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => {
    const thisIdChuyenThu = split(idChuyenThu, '_');
    return (
      <ButtonPrintable
        btnProps={{
          className: 'SipTableFunctionIcon',
          children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
        }}
        modalBodyProps={{
          children: <PrintableThongTinDonHang idDonHang={thisIdChuyenThu[0]} />,
        }}
        modalHeaderProps={{
          children: t('In danh sách bưu gửi của bảng kê'),
        }}
      />
    );
  };

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
        Header: t('Mã bưu gửi'),
        accessor: 'PACKAGE_ID',
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
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return renderPrintButton(get(row, 'values.PACKAGE_ID', ''));
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
          <Scan flow={SipFlowType.KHAI_THAC_DEN} onSuccess={handleSuccessQuetNhan} placeholder={t('Quét mã bưu gửi')} />
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-primary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
        </Col>
        {/*<div className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận bưu gửi')}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Row>
    );
  };

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listPhieuGuiChuaNhan} />
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

export default PhieuGuiChuaNhan;
