/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import Typeahead from 'components/Input/Typeahead';
import DataTable from 'components/DataTable';
import React, { useEffect, useMemo, useState } from 'react';
import NoData from 'components/NoData';
import { get, isEmpty, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination';
import { Button, Col, Modal, Row } from 'reactstrap';
import ModalConfirmDelete from 'components/Modal/ModalConfirmDelete';
import ModalAddKhach from './ModalAddKhach';
import options from './data';

const DetailCODKhachHangTab1 = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [selected, setSelected] = useState<TypeaheadOption[]>();

  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

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
        Header: t('Ngày phát TC'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Dịch vụ Viettel'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Tiền COD'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Phải trả'),
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

  const filterByFields = ['label'];
  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }
  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  const handleDeleteManifest = (torId: string): void => {
    console.log(torId);
  };
  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }
  const handleDeleteItem = (): void => {
    // event.stopPropagation();
    const torId = '1';
    setDeleteTorId(torId);
    toggleDeleteConfirmModal();
  };

  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết vận đơn thu bưu tá : BKCPN-TN2-2104-1</h1>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
        <div style={{ float: 'right' }}>
          <Button color="success" className="ml-2" onClick={toggle}>
            {t('Thêm mới vẫn đơn +')}
          </Button>
          <Button color="warning" className="ml-2">
            {t('Loại bỏ bill chọn')}
          </Button>
          <Button color="danger" className="ml-2" onClick={handleDeleteItem}>
            {t('Xoá bảng kê')}
          </Button>
        </div>
      </Row>
      <Row xs="4" className="sipContentContainer sipTableRowClickable">
        <Col lg={4} xs={12}>
          <div>
            <Typeahead
              id="selectService"
              filterBy={filterByFields}
              labelKey={renderLabelKey}
              onChange={setSelects}
              options={map(options)}
              placeholder="Khách hàng cần tim"
              selected={selected}
            />
          </div>
        </Col>
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
      </Row>
      <Modal
        size="xl"
        isOpen={modalCreateNew}
        toggle={toggle}
        onClosed={modalCreateNew ? toggle : undefined}
        className="sipTitleModalCreateNew sipModalReportLookUp"
      >
        <ModalAddKhach toggle={toggle} />
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

export default DetailCODKhachHangTab1;
