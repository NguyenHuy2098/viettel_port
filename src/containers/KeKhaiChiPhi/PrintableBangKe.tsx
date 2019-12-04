/* eslint-disable max-lines */
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Row, Col, ButtonProps } from 'reactstrap';
import { get, size, sumBy, toNumber, map } from 'lodash';
import moment from 'moment';

import PrintTableBangKe from 'components/DataTable/PrintTableBangKe';
import { numberFormat, getValueOfNumberFormat } from 'utils/common';
import convertMoneyToString from 'utils/convertMoneyToString';
import { action_ZFI007M } from 'redux/ZFI007M/actions';
import { select_ZFI007M_collection } from 'redux/ZFI007M/selectors';
import useLoggedInUser from 'hooks/useLoggedInUser';

interface Props extends ButtonProps {
  ids: string[];
}

const PrintableBangKe = (props: Props): JSX.Element => {
  const { ids } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!size(ids)) return;
    const payload = {
      BK_INPUT: map(ids, (id: string) => ({ ID: id })),
    };
    dispatch(action_ZFI007M(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const lists = useSelector(select_ZFI007M_collection);

  return (
    <div>
      {lists.map(
        (item: API.Collection, index: number): JSX.Element => {
          return <Item key={index} MT_DETAIL_RECEIVER_ZFI007={item.header} data={item.list} />;
        },
      )}
    </div>
  );
};

interface PropsPrintTableBangKe extends ButtonProps {
  data: API.LISTMTDETAILRECEIVERM[] | undefined;
  MT_DETAIL_RECEIVER_ZFI007: API.HEADERMTDETAILRECEIVERM | undefined;
}

// eslint-disable-next-line max-lines-per-function
const Item = (props: PropsPrintTableBangKe): JSX.Element => {
  const { data, MT_DETAIL_RECEIVER_ZFI007 } = props;
  const { t } = useTranslation();

  const isPheDuyet = React.useMemo(() => {
    const status = get(MT_DETAIL_RECEIVER_ZFI007, 'BK_STATUS', -1);
    return status === 2 || status === 3;
  }, [MT_DETAIL_RECEIVER_ZFI007]);

  // eslint-disable-next-line max-lines-per-function
  function renderHeader(): JSX.Element {
    if (!isPheDuyet) {
      return (
        <thead className="bang-ke-header">
          <tr className="text-center">
            <th rowSpan={3}>{t('STT')}</th>
            <th colSpan={11}>{t('Bưu cục kê khai')}</th>
            {/* <th colSpan={4}>{t('Công ty phê duyệt')}</th>
            <th rowSpan={3}>{t('Không duyệt')}</th>
            <th rowSpan={3}>{t('Lý do')}</th> */}
          </tr>

          <tr className="text-center">
            <th colSpan={3}>{t('Hóa đơn mua hàng')}</th>
            <th rowSpan={2}>{t('Tên người bán')}</th>
            <th rowSpan={2}>{t('Mã số thuế người bán')}</th>
            <th rowSpan={2}>{t('Hàng hóa, Dịch vụ')}</th>
            <th rowSpan={2}>{t('Hàng hóa dịch vụ chưa thuế')}</th>
            <th rowSpan={2}>{t('Phụ phí')}</th>
            <th rowSpan={2}>{t('Thuế suất')}</th>
            <th rowSpan={2}>{t('Thuế GTGT')}</th>
            <th rowSpan={2}>{t('Tổng cộng')}</th>
            {/* <th rowSpan={2}>{t('Hàng hóa dịch vụ chưa thuế')}</th>
            <th rowSpan={2}>{t('Phụ phí')} </th>
            <th rowSpan={2}>{t('Thuế GTGT')}</th>
            <th rowSpan={2}>{t('Cộng')} </th> */}
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
            {/* <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th> */}
          </tr>
        </thead>
      );
    }
    return (
      <thead className="bang-ke-header">
        <tr className="text-center">
          <th rowSpan={3}>{t('STT')}</th>
          <th colSpan={11}>{t('Bưu cục kê khai')}</th>
          <th colSpan={4}>{t('Công ty phê duyệt')}</th>
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
          <th rowSpan={2}>{t('Thuế GTGT')}</th>
          <th rowSpan={2}>{t('Tổng cộng')}</th>
          <th rowSpan={2}>{t('Hàng hóa dịch vụ chưa thuế')}</th>
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
          return get(row, 'original.LINE_ITEM', '');
        },
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'KIHIEU_HD',
      },
      {
        Header: t('Ngày'),
        accessor: 'NGAY_HD',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return moment(get(row, 'original.NGAY_HD')).format('DD/MM/YYYY');
        },
      },
      {
        Header: t('Số'),
        accessor: 'SO_HD',
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
        // accessor: 'AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.AMOUNT_INIT'));
        },
      },
      {
        Header: t('Phụ phí'),
        // accessor: 'PHU_PHI',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.PHU_PHI'))
            : '0';
        },
      },
      {
        Header: t('Thuế suất'),
        // accessor: 'TAX',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <div className="text-right">{get(row, 'original.TAX')}</div>;
        },
      },
      {
        Header: t('Thuế giá trị gia tăng'),
        // accessor: 'TAX_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.TAX_AMOUNT'));
        },
      },
      {
        Header: t('Tổng cộng'),
        // accessor: 'SUM_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.SUM_AMOUNT_INIT'));
        },
      },
      {
        Header: t('Hàng hóa dịch vụ chưa thuế (1)'),
        // accessor: 'AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.AMOUNT_INIT'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Phụ phí (1)'),
        // accessor: 'PHU_PHI_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.PHU_PHI_INIT'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Thuế giá trị gia tăng (1)'),
        // accessor: 'TAX_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.TAX_AMOUNT_INIT'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Tổng cộng(1)'),
        // accessor: 'SUM_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.SUM_AMOUNT'))
            : '';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Không duyệt'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          let value =
            toNumber(getValueOfNumberFormat(get(row, 'original.SUM_AMOUNT_INIT'))) -
            toNumber(getValueOfNumberFormat(get(row, 'original.SUM_AMOUNT')));
          if (value < 0) {
            value = 0;
          }
          return numberFormat(value.toString());
        },
        show: isPheDuyet,
      },
      {
        Header: t('Lý do'),
        // accessor: 'NOTE',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.NOTE', '');
        },
        show: isPheDuyet,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  function renderTotal(): JSX.Element {
    const SUM_AMOUNT = sumBy(data, item => toNumber(item.SUM_AMOUNT));
    const SUM_AMOUNT_INIT = !isPheDuyet ? 0 : sumBy(data, item => toNumber(item.SUM_AMOUNT_INIT));
    const NOT_SUM_AMOUNT = !isPheDuyet ? 0 : SUM_AMOUNT - SUM_AMOUNT_INIT;

    return (
      <Row>
        <Col className="pl-5">
          <div>
            <i>{t('Số tiền đề nghị thanh toán') + ': ' + convertMoneyToString(SUM_AMOUNT)}</i>
          </div>
          {isPheDuyet && (
            <>
              <div>
                <i>{t('Số tiền được duyệt') + ': ' + convertMoneyToString(SUM_AMOUNT_INIT)}</i>
              </div>
              <div>
                <i>{t('Số tiền không được duyệt') + ': ' + convertMoneyToString(NOT_SUM_AMOUNT)}</i>
              </div>
            </>
          )}
        </Col>
      </Row>
    );
  }

  const userLogin = useLoggedInUser();

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[], index: string): JSX.Element => {
    const row = rows.filter(item => get(item, 'original.KHOAN_MUC') === index)[0];
    const ten_km = get(row, 'original.TEN_KM', '');
    if (index === 'null') return <></>;
    return <div>{`${index} - ${ten_km}`}</div>;
  };

  if (!data || !MT_DETAIL_RECEIVER_ZFI007) return <div></div>;

  return (
    <div className="in-bang-ke">
      <div className="page-break">
        <div className="row">
          <div className="col-4">
            <div>
              <strong>{t('Tổng công ty cổ phần Bưu chính Viettel')}</strong>
            </div>
            <div className="pl-5">
              <strong>{get(userLogin, 'user.profile.bp_org_unit', '')} </strong>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4 text-right">
            {t('Số')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_ID', '')}
          </div>
        </div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
            <h5>
              <strong>{t('BẢNG KÊ DUYỆT CHỨNG TỪ GỐC THANH TOÁN CHI PHÍ')}</strong>
            </h5>
            <p>
              {t('Tháng')} {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_MONTH', '')} {t('năm')}{' '}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_YEAR', '')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="info pb-3">
            <div className="col-6 pl-0">
              {t('Về việc')}: {t('Thanh toán chi phí theo ngân sách ')}
              {t('T')}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_MONTH', '')}/{get(MT_DETAIL_RECEIVER_ZFI007, 'BK_YEAR', '')}
            </div>
            <div className="col-6 pl-0">
              {t('Họ và tên')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'CRE_BY', '')}
            </div>
            <div className="col-6 pl-0">
              {t('Chức danh')}: {t('Nhân viên chăm sóc khách hàng')}
            </div>
            <div className="col-6 pl-0">{t('Đề nghị thanh toán số tiền theo bảng kê như sau')}:</div>
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
          groupKey="KHOAN_MUC"
          renderGroupedRow={renderGroupedRow}
          isPheDuyet={isPheDuyet}
        />
        {renderTotal()}
        <Row className="text-center pt-5 pb-5">
          <div className="col-4">
            <strong>{t('KẾ TOÁN CHUYÊN QUẢN')}</strong>
          </div>
          <div className="col-4">
            <strong>{t('TRƯỞNG PHÒNG TÀI CHÍNH')}</strong>
          </div>
          <div className="col-4">
            <strong>{t('TỔNG GIÁM ĐỐC')}</strong>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default PrintableBangKe;
