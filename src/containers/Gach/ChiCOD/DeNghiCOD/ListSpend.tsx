/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import React, { useEffect, useMemo, useState } from 'react';
import NoData from 'components/NoData';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination';
import { Button } from 'reactstrap';
import { Cell } from 'react-table';

interface Props {
  btnClickDetail: () => void;
  handleBrowseItem: (torId: string) => void;
}

const ListSpend = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [colorButton, setColorButton] = useState<number>();

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

  function browsserToId(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      props.handleBrowseItem(`${bangKe.id}`);
    };
  }

  function printBangKe(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      props.btnClickDetail();
      setColorButton(Number(bangKe.id));
    };
  }
  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Mã bảng kê'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày giao dịch'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Người tạo'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Mô tả'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Tiền COD'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền cước'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền phải trả'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t(' '),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button color="primary" onClick={browsserToId(row.original)} id={row.original.id}>
                {t('gửi duyệt')}
              </Button>
            </>
          );
        },
      },
      {
        Header: t(' '),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button
                color={Number(row.original.id) === colorButton ? 'info' : 'primary'}
                onClick={printBangKe(row.original)}
                id={row.original.id}
              >
                {t('chi tiết')}
              </Button>
            </>
          );
        },
      },
    ],
    [colorButton],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    console.log(selectedItem);
  };

  return (
    <>
      {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
        <>
          <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
          <div style={{ float: 'right', paddingRight: '4px' }}>
            <Button color="primary">{t('Gửi duyệt')}</Button>
          </div>
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

export default ListSpend;
