import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { map, get, toString, trim } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import {
  makeSelectorChuyenThuChuaHoanThanh,
  makeSelectorCountChuyenThuChuaHoanThanh,
  getTotalPageChuyenThu,
} from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import routesMap from 'utils/routesMap';
import DeleteConfirmModal from 'components/DeleteConfirmModal/Index';
import moment from 'moment';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaHoanThanh: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountChuyenThuChuaHoanThanh);
  const listChuyenThuChuaHoanThanh = useSelector(makeSelectorChuyenThuChuaHoanThanh);
  const totalPage = useSelector(getTotalPageChuyenThu);

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

  const getListChuyenThu = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC3',
          IV_FR_LOC_ID: 'BDH',
          IV_CUST_STATUS: '101',
          IV_FR_DATE: '20000101',
          IV_TO_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => {
    getListChuyenThu();
  }, [getListChuyenThu]);

  function handleSearchChuyenThu(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListChuyenThu(payload);
  }

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
        onFinish: (): void => getListChuyenThu(),
      }),
    );
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(`${routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU}/${item.TOR_ID}`));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listChuyenThuChuaHoanThanh],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: torIdSearch,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListChuyenThu(payload);
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyễn thư'),
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
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
                <i className="fa fa-trash-o fa-lg color-red" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(listChuyenThuChuaHoanThanh, (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      countChuyenThu: item.ITEM_NO,
      CREATED_BY: item.CREATED_BY,
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: get(item, 'Childs[0].DESCRIPTION', ''),
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
                placeholder={t('Tìm kiếm bảng kê')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchChuyenThu}>
              {t('Tìm kiếm')}
            </Button>
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
              <i className="fa fa-trash-o" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countChuyenThuChuaHoanThanh}</span>
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
          onPageChange={onPaginationChange}
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
