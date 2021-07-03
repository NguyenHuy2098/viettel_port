/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import React, { useEffect, useMemo, useState } from 'react';
import NoData from 'components/NoData';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination';

const DetailCODChuaChotTab2 = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Mã vận đơn'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Kiểu thanh toán'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Dịch vụ'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Tiền công nợ'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Giảm giá TK'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Chênh lệch cước'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền thực thu'),
        accessor: 'chenh_lech_cuoc',
      },
      // {
      //   Header: t(' '),
      //   Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
      //     return (
      //       <>
      //         <Button color="link" onClick={printBangKe(row.original)} id={row.original.id}>
      //           Loại bỏ
      //         </Button>
      //       </>
      //     );
      //   },
      // },
    ],
    [],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  return (
    <>
      {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
        <>
          <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
          <Pagination
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
            initialPage={10}
            pageCount={1}
            onThisPaginationChange={onPaginationChange}
          />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default DetailCODChuaChotTab2;
