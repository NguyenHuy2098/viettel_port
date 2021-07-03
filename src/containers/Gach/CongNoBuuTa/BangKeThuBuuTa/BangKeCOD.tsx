/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ModalConfirmDelete from 'components/Modal/ModalConfirmDelete';
// import { action_DETAIL_THU_TIEN } from 'redux/ThuTien/actions';
import { Cell } from 'react-table';
import { Button, Modal, Row } from 'reactstrap';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import DetailBangKeCOD from './DetailBangKeCOD';
import ModalAddBangkeCod from './ModalAddBangkeCod';

// interface Props {
//   setHideDetailBangkeCod: () => void;
// }

const BangKeCOD = (): JSX.Element => {
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [hideDetail, setHideDetail] = useState<boolean>(false);
  const refDetaiBangKeCod = useRef<null | HTMLDivElement>(null);
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [colorButton, setColorButton] = useState<number>();
  const { t } = useTranslation();

  const setHideDetailBangkeCod = (): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect((): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  function printBangKe(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setHideDetail(!hideDetail);
      setHideDetailBangkeCod();
      setColorButton(Number(bangKe.id));
      // console.dir(event.currentTarget);
      // event.currentTarget.setAttribute('disabled', 'true');
      // dispatch(
      //   action_DETAIL_THU_TIEN({
      //     id: bangKe.id,
      //   }),
      // );
    };
  }

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Bưu tá'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Hình thức nộp tiền'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày hạch toán'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Tiền công nợ'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Giảm giá TK'),
        accessor: 'giam_gia_tk',
      },
      // {
      //   Header: t('Chênh lệch cước'),
      //   accessor: 'chenh_lech_cuoc',
      // },
      {
        Header: t('Tiền thực thu'),
        accessor: 'tie_thuc_thu',
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
                // title={t('Sửa')}
              >
                Chi tiết
              </Button>
            </>
          );
        },
      },
    ],
    [colorButton],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  const handleDeleteManifest = (torId: string): void => {
    console.log(torId);
  };

  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }

  const handleDeleteItem = (torId: string): void => {
    // event.stopPropagation();
    setDeleteTorId(torId);
    toggleDeleteConfirmModal();
  };

  return (
    <>
      <Row className="mb-3 sipTableContainer sipTableRowClickable">
        <Row className="mb-3 sipTableContainer sipTableRowClickable">
          {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
            <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
          ) : (
            ''
          )}
          {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
            <Pagination
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              pageCount={10}
              onThisPaginationChange={onPaginationChange}
            />
          ) : (
            ''
          )}
          {/* <DataTable columns={columns} data={listPhanCongNhan.response} /> */}
        </Row>
      </Row>
      {hideDetail === true ? (
        <div className="mb-3 sipTableContainer sipTableRowClickable row" ref={refDetaiBangKeCod}>
          <DetailBangKeCOD toggle={toggle} handleDeleteItem={handleDeleteItem} />
        </div>
      ) : (
        ''
      )}
      <Modal
        size="xl"
        isOpen={modalCreateNew}
        toggle={toggle}
        onClosed={modalCreateNew ? toggle : undefined}
        className="sipTitleModalCreateNew sipModalReportLookUp"
      >
        <ModalAddBangkeCod toggle={toggle} />
      </Modal>
      <ModalConfirmDelete
        visible={deleteConfirmModal}
        onDelete={handleDeleteManifest}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
    </>
  );
};

export default BangKeCOD;
