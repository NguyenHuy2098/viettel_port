import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Search from 'components/Input/Search';
import Pagination from 'components/Pagination';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelectorRow, makeSelectorTotalItem, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

interface Props {
  getListChuyenThuTaoMoi: (IV_PAGENO?: number, IV_TOR_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaHoanThanh: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListChuyenThuTaoMoi } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listChuyenThuChuaHoanThanh = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH));
  const countChuyenThuChuaHoanThanh = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH),
  );
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.CHUYEN_THU, SipDataState.CHUA_HOAN_THANH));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }

  function handleDeleteItem(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      setDeleteTorId(torId);
      toggleDeleteConfirmModal();
    };
  }

  useEffect((): void => {
    getListChuyenThuTaoMoi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChuyenThu = (searchText: string): void => {
    getListChuyenThuTaoMoi(1, searchText);
  };

  const handleDeleteChuyenThu = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
      IV_TOR_TYPE: 'ZC3',
      IV_TOR_ID_CU: torId,
      IV_SLOCATION: '',
      IV_DLOCATION: '',
      IV_DESCRIPTION: '',
      T_ITEM: [
        {
          ITEM_ID: '',
          ITEM_TYPE: '',
        },
      ],
    };
    dispatch(
      action_MIOA_ZTMI016(payload, {
        onSuccess: (): void => {
          alert(t('Xóa thành công!'));
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.messages);
        },
        onFinish: (): void => getListChuyenThuTaoMoi(),
      }),
    );
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listChuyenThuChuaHoanThanh],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListChuyenThuTaoMoi(selectedItem.selected + 1);
  };

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.LOG_LOCID_TO', '');
        },
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Người nhập'),
        accessor: 'CREATED_BY',
      },
      {
        Header: t('Ngày nhập'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Ghi chú'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.Childs[0].DESCRIPTION', '') || '';
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <ButtonPrintable
                btnProps={{
                  className: 'SipTableFunctionIcon',
                  children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
                }}
                modalBodyProps={{
                  children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={get(row, 'original.TOR_ID')} />,
                }}
                modalHeaderProps={{
                  children: t('In thông tin chuyến thư'),
                }}
              />
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listChuyenThuChuaHoanThanh],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col lg={6} xl={4}>
        <Search onSubmitSearch={handleSearchChuyenThu} placeholder={t('Tìm kiếm chuyến thư')} />
      </Col>
      <Col lg={1}>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
      <Col>
        <p className="text-right mt-2 mb-0">
          {t('Tổng số')}: <span>{countChuyenThuChuaHoanThanh}</span>
        </p>
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listChuyenThuChuaHoanThanh} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteChuyenThu}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
    </>
  );
};

export default ChuyenThuChuaHoanThanh;
