/* eslint-disable max-lines */
import React, { useMemo } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Cell, Row as TableRow } from 'react-table';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_MT_DETAIL_RECEIVER_ZFI007, select_ZFI007 } from 'redux/ZFI007/selectors';
// import DataTable from 'components/DataTable';
import printJS from 'print-js';
import { useDispatch, useSelector } from 'react-redux';
import PrintTableBangKe from 'components/DataTable/PrintTableBangKe';
import { formatNumber } from '../../utils/common';

// eslint-disable-next-line max-lines-per-function
const InBangKe = (): JSX.Element => {
  const { t } = useTranslation();
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();

  function toggle(): void {
    setModal(!modal);
  }

  React.useEffect(() => {
    const payload = {
      MA_BUU_CUC: 'BDH',
      BK_ID: 'CPTX_2019_0001',
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZFI007(payload));
  }, [dispatch]);

  const data = useSelector(select_ZFI007);

  const MT_DETAIL_RECEIVER_ZFI007 = useSelector(select_MT_DETAIL_RECEIVER_ZFI007);

  // eslint-disable-next-line max-lines-per-function
  function renderHeader(): JSX.Element {
    return (
      <thead className="bang-ke-header">
        <tr className="text-center">
          <th rowSpan={3}>STT</th>
          <th colSpan={11}>Bưu cục kê khai</th>
          <th colSpan={4}>Chờ phê duyệt</th>
          <th rowSpan={3}>Không duyệt</th>
          <th rowSpan={3}>Lý do</th>
        </tr>

        <tr className="text-center">
          <th colSpan={3}>Hóa đơn mua hàng</th>
          <th rowSpan={2}>Tên người bán</th>
          <th rowSpan={2}>Mã số thuế người bán</th>
          <th rowSpan={2}>Hàng hóa, Dịch vụ</th>
          <th rowSpan={2}>Hàng hóa dịch vụ chưa thuế</th>
          <th rowSpan={2}>Phụ phí</th>
          <th rowSpan={2}>Thuế suất</th>
          <th rowSpan={2}>thuế GTGT</th>
          <th rowSpan={2}>Tổng cộng</th>
          <th rowSpan={2}>hàng hóa dịch vụ chưa thuế</th>
          <th rowSpan={2}>Phụ phí </th>
          <th rowSpan={2}>Thuế GTGT</th>
          <th rowSpan={2}>Cộng </th>
        </tr>

        <tr className="text-center">
          <th>Ký hiệu</th>
          <th>Ngày</th>
          <th>Số</th>
        </tr>
        <tr className="text-center">
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
          <th>11</th>
          <th>12</th>
          <th>13</th>
          <th>14</th>
          <th>15</th>
          <th>16</th>
          <th>17</th>
          <th>18</th>
        </tr>
      </thead>
    );
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('STT'),
        accessor: 'LINE_ITEM',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.LINE_ITEM', ''));
        },
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'KIHIEU_HD',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.KIHIEU_HD', ''));
        },
      },
      {
        Header: t('Ngày'),
        accessor: 'NGAY_HD',
      },
      {
        Header: t('Số'),
        accessor: 'SO_HD',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.SO_HD', ''));
        },
      },
      {
        Header: t('Tên người bán'),
        accessor: 'NGUOI_BAN',
      },
      {
        Header: t('Mã số thuế'),
        accessor: 'MST',
      },
      {
        Header: t('Hàng hóa dịch vụ'),
        accessor: 'DESCR',
      },
      {
        Header: t('Hàng hóa dịch vụ chưa thuế'),
        accessor: 'AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.AMOUNT', ''));
        },
      },
      {
        Header: t('Phụ phí'),
        accessor: 'PHU_PHI',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.PHU_PHI', ''));
        },
      },
      {
        Header: t('Thuế suất'),
        accessor: 'TAX',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.TAX', ''));
        },
      },
      {
        Header: t('Thuế giá trị gia tăng'),
        accessor: 'TAX_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.TAX_AMOUNT', ''));
        },
      },
      {
        Header: t('Tổng cộng'),
        accessor: 'SUM_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.SUM_AMOUNT', ''));
        },
      },
      {
        Header: t('Hàng hóa dịch vụ chưa thuế (1)'),
        accessor: 'AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.AMOUNT_INIT', ''));
        },
      },
      {
        Header: t('Phụ phí (1)'),
        accessor: 'PHU_PHI_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.PHU_PHI_INIT', ''));
        },
      },
      {
        Header: t('Thuế giá trị gia tăng (1)'),
        accessor: 'TAX_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.TAX_AMOUNT_INIT', ''));
        },
      },
      {
        Header: t('Tổng cộng(1)'),
        accessor: 'SUM_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return formatNumber(get(row, 'original.SUM_AMOUNT_INIT', ''));
        },
      },
      {
        Header: t('Không duyệt'),
      },
      {
        Header: t('Lý do'),
        accessor: 'NOTE',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.NOTE', '');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  function renderTotal(): JSX.Element {
    return (
      <Row>
        <Col className="pl-5">
          <div>
            <i>Số tiền đề nghị thanh toán: Một triệu hai trăm nghìn đồng</i>
          </div>
          <div>
            <i>Số tiền được duyệt: Một triệu một trăm nghìn đồng</i>
          </div>
          <div>
            <i>Số tiền không được duyệt: Một trăm nghìn đồng</i>
          </div>
        </Col>
      </Row>
    );
  }

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[], index: string): JSX.Element => {
    return <div>{index}</div>;
  };

  function handlePrint(): void {
    printJS({
      css: ['https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'],
      printable: 'in-bang-ke',
      scanStyles: false,
      type: 'html',
      style: '@page { size: Letter landscape; margin: 0 }',
    });
  }

  return (
    <div>
      <Button color="primary" className="ml-2" onClick={toggle}>
        <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
        {t('In bảng kê')}
      </Button>
      <Modal isOpen={modal} size="xl" toggle={toggle} className="bang-ke">
        <ModalHeader toggle={toggle} charCode="x">
          {t('In bảng kê')}
        </ModalHeader>

        <ModalBody id="in-bang-ke">
          <div className="row">
            <div className="col-4">
              <div>Tổng công ty cổ phần Bưu chính Viettel</div>
              <div className="pl-5">Bưu cục Đống Da </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4 text-right">Số: {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_ID', '')}</div>
          </div>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
              <h5>BẢNG KÊ DUYỆT CHỨNG TỪ GỐC THANH TOÁN CHI PHÍ</h5>
              <p>
                Tháng {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_MONTH', '')} năm{' '}
                {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_YEAR', '')}
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="info pb-3">
              <div className="col-6 pl-0">Về việc thanh toán chi phí theo ngân sách T04/2019</div>
              <div className="col-6 pl-0">Họ và Tên: {get(MT_DETAIL_RECEIVER_ZFI007, 'header.CRE_BY', '')}</div>
              <div className="col-6 pl-0">Chức danh: Nhân viên chăm sóc khách hàng</div>
              <div className="col-6 pl-0">Đề nghị thanh toán số tiền theo bảng kê như sau:</div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <div className="text-right">ĐVT: VNĐ</div>
            </Col>
          </Row>
          <PrintTableBangKe
            columns={columns}
            header={renderHeader}
            data={data}
            groupKey="TEN_KM"
            renderGroupedRow={renderGroupedRow}
          />
          {renderTotal()}
          <Row className="text-center pt-5 pb-5">
            <div className="col-4">KẾ TOÁN CHUYÊN QUẢN</div>
            <div className="col-4">TRƯỞNG PHÒNG TÀI CHÍNH</div>
            <div className="col-4">TỔNG GIÁM ĐỐC</div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-primary btn-lg" onClick={handlePrint}>
            <i className="fa fa-print"></i> In
          </button>
          <button type="button" className="btn btn-secondary btn-lg">
            <i className="fa fa-remove"></i> Huỷ
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InBangKe;