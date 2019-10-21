import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import produce from 'immer';
import { concat, find, get, includes, map, pull } from 'lodash';
import moment from 'moment';

import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Pagination from 'components/Pagination';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import Search from 'components/Input/Search';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';

interface Props {
  getListTaiChuaDongChuyenThu: (IV_PAGENO?: number, IV_TOR_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiChuaDongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListTaiChuaDongChuyenThu } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listTaiChuaDongChuyenThu = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const [selectedTaiIds, setSelectedTaiIds] = useState<string[]>([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  const selectedTaiItems = useMemo(
    () => map(selectedTaiIds, (id: string): API.TITEM => ({ ITEM_ID: id, ITEM_TYPE: SipDataType.TAI })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTaiIds],
  );

  const diemDen = useMemo(() => {
    return get(find(listTaiChuaDongChuyenThu, ['FREIGHT_UNIT', selectedTaiIds[0]]), 'NEXT_LOC', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTaiChuaDongChuyenThu, selectedTaiIds]);

  function toggleDeleteConfirmModal(): void {
    setShowDeleteConfirmModal(!showDeleteConfirmModal);
  }

  function handleDeleteItem(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      setDeleteTorId(torId);
      toggleDeleteConfirmModal();
    };
  }

  useEffect((): void => {
    getListTaiChuaDongChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchTai = (torId: string): void => {
    getListTaiChuaDongChuyenThu(1, torId);
  };

  const editTai = (tai: API.RowMTZTMI047OUT) => {
    return (event: React.MouseEvent): void => {
      event.stopPropagation();
    };
  };

  const handleDeleteTai = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
      IV_TOR_TYPE: 'ZC2',
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
        onFinish: (): void => {
          getListTaiChuaDongChuyenThu();
        },
      }),
    );
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiChuaDongChuyenThu],
  );

  const handleSelectKien = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const selectedKienId = event.currentTarget.value;
    if (includes(selectedTaiIds, selectedKienId)) {
      setSelectedTaiIds(produce(selectedTaiIds, draftState => pull(draftState, selectedKienId)));
    } else {
      setSelectedTaiIds(produce(selectedTaiIds, draftState => concat(draftState, selectedKienId)));
    }
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListTaiChuaDongChuyenThu(selectedItem.selected + 1);
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bảng kê thuộc tải'),
      }}
    />
  );
  const inMaCoTaiButton = (idTai: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-barcode fa-lg color-blue" />,
      }}
      modalBodyProps={{
        children: <PrintableMaCoTai idTai={idTai} />,
      }}
      modalHeaderProps={{
        children: t('In mã cổ tải'),
      }}
    />
  );
  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const torId = get(row, 'original.TOR_ID', '');
          return (
            <Label check>
              <Input
                defaultChecked={includes(selectedTaiIds, torId)}
                onClick={handleSelectKien}
                type="checkbox"
                value={torId}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải'),
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
        accessor: 'CREATED_ON',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Ghi chú'),
        accessor: 'Childs[0].DESCRIPTION',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.Childs[0].DESCRIPTION', '');
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              {inMaCoTaiButton(get(row, 'values.TOR_ID', ''))}
              {renderPrintButton(get(row, 'values.TOR_ID', ''))}
              <Button className="SipTableFunctionIcon" onClick={editTai(row.original)}>
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
    [selectedTaiIds],
  );

  const handleSuccessChuyenThuAction = (): void => {
    getListTaiChuaDongChuyenThu();
    setSelectedTaiIds([]);
  };

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col lg={6} xl={5}>
        <Search onSubmitSearch={handleSearchTai} placeholder={t('Tìm kiếm tải')} />
      </Col>
      <Col lg={1}>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="white" className="sipTitleRightBlockBtnIcon sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <ButtonChuyenVaoChuyenThu
          className="ml-2"
          diemDen={diemDen}
          listTaiKienCanChuyen={selectedTaiItems}
          onSuccess={handleSuccessChuyenThuAction}
        />
        <ButtonDongChuyenThu
          className="ml-2"
          diemDen={diemDen}
          listTaiKienCanGan={selectedTaiItems}
          onSuccess={handleSuccessChuyenThuAction}
        />
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listTaiChuaDongChuyenThu} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
      <DeleteConfirmModal
        visible={showDeleteConfirmModal}
        onDelete={handleDeleteTai}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
    </>
  );
};

export default TaiChuaDongChuyenThu;
