/* eslint-disable max-lines */
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Row, Col, ButtonProps } from 'reactstrap';
import { get, size } from 'lodash';

import PrintTableBangKe from 'components/DataTable/PrintTableBangKe';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007_MT_DETAIL_RECEIVER, select_ZFI007_list } from 'redux/ZFI007/selectors';
import { formatNumber } from 'utils/common';

interface Props extends ButtonProps {
  ids: string[];
}

// eslint-disable-next-line max-lines-per-function
const PrintableBangKe = (props: Props): JSX.Element => {
  const { ids } = props;
  const dispatch = useDispatch();
  const data = useSelector(select_ZFI007_list);
  const MT_DETAIL_RECEIVER_ZFI007 = useSelector(select_ZFI007_MT_DETAIL_RECEIVER);
  const { t } = useTranslation();

  useEffect(() => {
    if (!size(ids)) return;
    const payload = {
      BK_ID: ids[0],
    };
    dispatch(action_ZFI007(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  // eslint-disable-next-line max-lines-per-function
  function renderHeader(): JSX.Element {
    return (
      <thead className="bang-ke-header">
        <tr className="text-center">
          <th rowSpan={3}>{t('STT')}</th>
          <th colSpan={11}>{t('Bưu cục kê khai')}</th>
          <th colSpan={4}>{t('Chờ phê duyệt')}</th>
          <th rowSpan={3}>{t('Không duyệt')}</th>
          <th rowSpan={3}>{t('Lý do')}</th>
        </tr>

        <tr className="text-center">
          <th colSpan={3}>{t('Hóa đơn mua hàng')}</th>
          <th rowSpan={2}>{t('Tên người bán')}</th>
          <th rowSpan={2}>{t('Mã số thuế người bán')}</th>
          <th rowSpan={2}>{t('Hàng hóa, Dịch vụ')}</th>
          <th rowSpan={2}>{t('Hàng hóa dịch vụ chưa thuế')}</th>
          <th rowSpan={2}>{t('Phụ phí')}</th>
          <th rowSpan={2}>{t('Thuế suất')}</th>
          <th rowSpan={2}>{t('thuế GTGT')}</th>
          <th rowSpan={2}>{t('Tổng cộng')}</th>
          <th rowSpan={2}>{t('hàng hóa dịch vụ chưa thuế')}</th>
          <th rowSpan={2}>{t('Phụ phí')} </th>
          <th rowSpan={2}>{t('Thuế GTGT')}</th>
          <th rowSpan={2}>{t('Cộng')} </th>
        </tr>

        <tr className="text-center">
          <th>{t('Ký hiệu')}</th>
          <th>{t('Ngày')}</th>
          <th>{t('Số')}</th>
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
            <i>{t('Số tiền đề nghị thanh toán: Một triệu hai trăm nghìn đồng')}</i>
          </div>
          <div>
            <i>{t('Số tiền được duyệt: Một triệu một trăm nghìn đồng')}</i>
          </div>
          <div>
            <i>{t('Số tiền không được duyệt: Một trăm nghìn đồng')}</i>
          </div>
        </Col>
      </Row>
    );
  }

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[], index: string): JSX.Element => {
    if (index === 'null') return <></>;
    return <div>{index}</div>;
  };

  return (
    <div className="in-bang-ke">
      <div className="page-break">
        <div className="row">
          <div className="col-4">
            <div>{t('Tổng công ty cổ phần Bưu chính Viettel')}</div>
            <div className="pl-5">{t('Bưu cục Đống Da')} </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4 text-right">
            {t('Số')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_ID', '')}
          </div>
        </div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
            <h5>{t('BẢNG KÊ DUYỆT CHỨNG TỪ GỐC THANH TOÁN CHI PHÍ')}</h5>
            <p>
              {t('Tháng')} {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_MONTH', '')} {t('năm')}{' '}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_YEAR', '')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="info pb-3">
            <div className="col-6 pl-0">{t('Về việc thanh toán chi phí theo ngân sách T04/2019')}</div>
            <div className="col-6 pl-0">
              {t('Họ và Tên')} {get(MT_DETAIL_RECEIVER_ZFI007, 'header.CRE_BY', '')}
            </div>
            <div className="col-6 pl-0">{t('Chức danh: Nhân viên chăm sóc khách hàng')}</div>
            <div className="col-6 pl-0">{t('Đề nghị thanh toán số tiền theo bảng kê như sau:')}</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="text-right">{t('ĐVT: VNĐ')}</div>
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
          <div className="col-4">{t('KẾ TOÁN CHUYÊN QUẢN')}</div>
          <div className="col-4">{t('TRƯỞNG PHÒNG TÀI CHÍNH')}</div>
          <div className="col-4">{t('TỔNG GIÁM ĐỐC')}</div>
        </Row>
      </div>
      <div className="page-break">
        <div className="row">
          <div className="col-4">
            <div>{t('Tổng công ty cổ phần Bưu chính Viettel')}</div>
            <div className="pl-5">{t('Bưu cục Đống Da')} </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4 text-right">
            {t('Số')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_ID', '')}
          </div>
        </div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
            <h5>{t('BẢNG KÊ DUYỆT CHỨNG TỪ GỐC THANH TOÁN CHI PHÍ')}</h5>
            <p>
              {t('Tháng')} {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_MONTH', '')} {t('năm')}{' '}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'header.BK_YEAR', '')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="info pb-3">
            <div className="col-6 pl-0">{t('Về việc thanh toán chi phí theo ngân sách T04/2019')}</div>
            <div className="col-6 pl-0">
              {t('Họ và Tên')} {get(MT_DETAIL_RECEIVER_ZFI007, 'header.CRE_BY', '')}
            </div>
            <div className="col-6 pl-0">{t('Chức danh: Nhân viên chăm sóc khách hàng')}</div>
            <div className="col-6 pl-0">{t('Đề nghị thanh toán số tiền theo bảng kê như sau:')}</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="text-right">{t('ĐVT: VNĐ')}</div>
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
          <div className="col-4">{t('KẾ TOÁN CHUYÊN QUẢN')}</div>
          <div className="col-4">{t('TRƯỞNG PHÒNG TÀI CHÍNH')}</div>
          <div className="col-4">{t('TỔNG GIÁM ĐỐC')}</div>
        </Row>
      </div>
    </div>
  );
};

export default PrintableBangKe;
