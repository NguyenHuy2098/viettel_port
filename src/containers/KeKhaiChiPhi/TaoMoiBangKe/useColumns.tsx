import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { get, join, size, slice } from 'lodash';

import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import { numberFormat } from 'utils/common';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,max-lines-per-function
const useColumns = () => {
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
      accessor: 'NGAY_HD',
    },
    {
      Header: t('Trạng thái'),
      accessor: 'ITEM_NO',
      Cell: ({ row }: Cell<API.Child>): JSX.Element => {
        const thisStatus = get(row, 'original.ITEM_NO', 0);
        return <BadgeFicoBangKeStatus status={thisStatus} />;
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
      accessor: 'DESCR',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
        const thisDescr = get(row, 'original.DESCR', '0');
        const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
        return <span title={thisDescr}>{thisText}</span>;
      },
    },
    {
      Header: t('Giá chưa thuế (VND)'),
      accessor: 'AMOUNT',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.AMOUNT'));
      },
    },
    {
      Header: t('Phụ phí (VND)'),
      accessor: 'PHU_PHI',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.PHU_PHI'));
      },
    },
    {
      Header: t('TS'),
      accessor: 'TAX',
    },
    {
      Header: t('Thuế GTGT (VND)'),
      accessor: 'TAX_AMOUNT',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.TAX_AMOUNT'));
      },
    },
    {
      Header: t('Tổng (VND)'),
      accessor: 'SUM_AMOUNT',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
        return numberFormat(get(row, 'original.SUM_AMOUNT'));
      },
    },
    {
      Header: t('Link URL'),
      accessor: 'URL',
      Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
        const thisDescr = get(row, 'original.URL', '0');
        const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
        return <span title={thisDescr}>{thisText}</span>;
      },
    },
    {
      Header: t('Quản trị'),
    },
  ];
};

export default useColumns;
