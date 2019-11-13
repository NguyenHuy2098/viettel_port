import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { get, join, size, slice, toNumber } from 'lodash';
import moment from 'moment';

import BadgeFicoChiPhiStatus from 'components/Badge/BadgeFicoChiPhiStatus';
import { numberFormat } from 'utils/common';

interface Props {
  status: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,max-lines-per-function
const useColumns = (props: Props) => {
  const { status } = props;
  const { t } = useTranslation();
  return [
    {
      Header: t('Mẫu hoá đơn'),
      accessor: 'MAU_HD',
    },
    {
      Header: t('Ký hiệu'),
      accessor: 'KIHIEU_HD',
    },
    {
      Header: t('Số'),
      accessor: 'SO_HD',
    },
    {
      Header: t('Ngày'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
        const thisDate = moment(get(row, 'original.NGAY_HD'), 'YYYYMMDD').format('DD/MM/YYYY');
        return <>{thisDate}</>;
      },
    },
    {
      Header: t('Trạng thái'),
      Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
        return <BadgeFicoChiPhiStatus status={toNumber(get(row, 'original.STATUS_ITEM', -1))} />;
      },
    },
    {
      Header: t('Người bán'),
      accessor: 'NGUOI_BAN',
    },
    {
      Header: t('MST'),
      accessor: 'MST',
    },
    {
      Header: t('Hàng hoá'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
        const thisDescr = get(row, 'original.DESCR', '0');
        const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
        return <span title={thisDescr}>{thisText}</span>;
      },
    },
    {
      Header: t('Giá chưa thuế (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.AMOUNT_INIT'));
      },
    },
    {
      Header: t('Phụ phí (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.PHU_PHI_INIT'));
      },
    },
    {
      Header: t('TS'),
      Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
        return <div>{get(row, 'original.TAX', '')}</div>;
      },
    },
    {
      Header: t('Thuế GTGT (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.TAX_AMOUNT_INIT'));
      },
    },
    {
      Header: t('Tổng (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.SUM_AMOUNT_INIT'));
      },
    },
    {
      Header: t('Giá trị HH, DV duyệt (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.AMOUNT'));
      },
      show: status === 3 || status === 2,
    },
    {
      Header: t('Phụ phí duyệt (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.PHU_PHI'));
      },
      show: status === 3 || status === 2,
    },
    {
      Header: t('Thuế GTGT duyệt'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.TAX_AMOUNT'));
      },
      show: status === 3 || status === 2,
    },
    {
      Header: t('Tổng cộng duyệt (VND)'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.SUM_AMOUNT'));
      },
      show: status === 3 || status === 2,
    },
    {
      Header: t('Link URL'),
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
        const thisDescr = get(row, 'original.URL', '0');
        const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
        return <span title={thisDescr}>{thisText}</span>;
      },
    },
    {
      Header: t('Lý do'),
      Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
        return get(row, 'original.NOTE') || '';
      },
      show: status === 3 || status === 2,
    },
    {
      Header: status === 0 ? t('Quản trị ') : t(' '),
    },
  ];
};

export default useColumns;
