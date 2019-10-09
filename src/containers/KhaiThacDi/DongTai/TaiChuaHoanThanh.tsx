import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map, get, noop, toString, trim, isEmpty } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { toastError } from 'components/Toast';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalPage, makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { generatePath } from 'react-router-dom';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintableMaCoTai from '../../../components/Printable/PrintableMaCoTai';

// eslint-disable-next-line max-lines-per-function
const TaiChuaHoanThanh: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);

  const listTaiChuaHoanThanh = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const countTaiChuaHoanThanh = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [torIdSearch, setTorIdSearch] = useState<string>('');

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

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

  const getListTai = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047(
          {
            IV_TOR_ID: '',
            IV_TOR_TYPE: 'ZC2',
            IV_FR_LOC_ID: userMaBp,
            IV_TO_LOC_ID: '',
            IV_CUST_STATUS: '101',
            IV_FR_DATE: moment()
              .subtract(2, 'day')
              .format('YYYYMMDD'),
            IV_TO_DATE: trim(toString(moment().format('YYYYMMDD'))),
            IV_PAGENO: '1',
            IV_NO_PER_PAGE: '10',
            ...payload,
          },
          {
            onFailure: (error: Error) => {
              toastErrorOnSearch(error, payload.IV_TOR_ID);
            },
          },
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp],
  );

  useEffect((): void => getListTai(), [getListTai]);

  const toastErrorOnSearch = (error: Error, torId: string): void => {
    if (!isEmpty(torId)) {
      toastError(error.message);
    }
  };

  function handleSearchTai(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListTai(payload);
  }

  function editTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('edit', tai.TOR_ID);
    };
  }

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
        onFinish: (): void => getListTai(),
      }),
    );
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiChuaHoanThanh],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: torIdSearch,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListTai(payload);
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
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Người nhập'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày nhập'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
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
    [listTaiChuaHoanThanh],
  );

  const data = map(listTaiChuaHoanThanh, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      PERSONAL: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: thisDescription ? thisDescription : '',
    };
  });

  return (
    <>
      <Row className="sipContentContainer">
        <Col xl={6} lg={9} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input
                value={torIdSearch}
                type="text"
                placeholder={t('Tìm kiếm tải')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchTai}>
              {t('Tìm kiếm')}
            </Button>
            {/*_______________temporary hide because of no requirement______________*/}
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
              <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countTaiChuaHoanThanh}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteTai}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
    </>
  );
};

export default TaiChuaHoanThanh;
