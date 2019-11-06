import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { Button, Col, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { get, map, size, toString, trim, toUpper } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import { badgeFicoStateMap } from 'utils/common';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Pagination from 'components/Pagination';
import { toastError, toastSuccess } from 'components/Toast';
import { action_ZFI002 } from 'redux/ZFI002/actions';
import { action_ZFI004 } from 'redux/ZFI004/actions';
import { select_ZFI002, select_ZFI002Count } from 'redux/ZFI002/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';
import TopControllers from 'containers/KeKhaiChiPhi/DanhSachBangKe/TopControllers';
import SelectRangeDate from 'containers/KeKhaiChiPhi/SelectRangeDate';

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataTable = useSelector(select_ZFI002);
  const totalPage = useSelector(select_ZFI002Count);

  const [tuKy, setTuKy] = useState<string>(moment().format('YYYYMM'));
  const [denKy, setDenKy] = useState<string>(moment().format('YYYYMM'));
  const [filterTimeValue] = useState<string>(`${moment().format('MM/YYYY')} - ${moment().format('MM/YYYY')}`);
  const [idSearch, setIdSearch] = useState<string>('');
  const [typeSearch, setTypeSearch] = useState<string>('');
  const [checkedBangKe, setCheckedBangKe] = useState<string[]>([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  const noBangKeChecked = useMemo((): boolean => size(checkedBangKe) === 0, [checkedBangKe]);

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

  const getListBangKe = useCallback(
    (payload = {}): void => {
      dispatch(
        action_ZFI002({
          TU_KY: tuKy,
          DEN_KY: denKy,
          BK_ID: toUpper(trim(idSearch)),
          BK_STATUS: typeSearch,
          ...payload,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tuKy, denKy, idSearch, typeSearch],
  );

  const [resetCurrentPage, setResetCurrentPage] = useState<boolean>(true);
  const handleSearchBangKe = (): void => {
    setResetCurrentPage(!resetCurrentPage);
    if (size(idSearch) > 0 || size(filterTimeValue) > 0 || size(typeSearch) > 0) {
      getListBangKe();
    }
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListBangKe({
      IV_PAGENO: selectedItem.selected + 1,
    });
  };

  const handleDeleteManifest = (torId: string): void => {
    dispatch(
      action_ZFI004(
        {
          BK_ID: torId,
        },
        {
          onSuccess: (): void => {
            toastSuccess(t('Xóa thành công.'));
          },
          onFailure: (error: HttpRequestErrorType): void => {
            toastError(get(error, 'messages[0]'));
          },
          onFinish: (): void => getListBangKe(),
        },
      ),
    );
  };

  useEffect((): void => {
    getListBangKe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  };

  const handleRedirectDetail = (rowOriginal: API.ListMTBKRECEIVER): void => {
    dispatch(push(generatePath(routesMap.CHI_TIET_BANG_KE, { idBangKe: get(rowOriginal, 'BK_ID', '') })));
  };

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bảng kê'),
        accessor: 'BK_ID',
      },
      {
        Header: t('Người nhập'),
        accessor: 'CRE_BY',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CRE_TIME',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDate = moment(get(row, 'original.CRE_TIME'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY');
          return <>{thisDate}</>;
        },
      },
      {
        Header: t('Kỳ'),
        accessor: 'BK_MONTH',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisMonth = get(row, 'original.BK_MONTH');
          const thisYear = get(row, 'original.BK_YEAR');
          return (
            <>
              {thisMonth}/{thisYear}
            </>
          );
        },
      },
      {
        Header: t('Trạng thái'),
        accessor: 'BK_STATUS',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisStatus = get(row, 'original.BK_STATUS', 0);
          return <BadgeFicoBangKeStatus status={thisStatus} />;
        },
      },
      {
        Header: t('Người cập nhật'),
        accessor: 'UPD_BY',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisUpdBy = get(row, 'original.UPD_BY');
          return <>{thisUpdBy ? thisUpdBy : ''}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisStatus = get(row, 'original.BK_STATUS', 0);
          return (
            <>
              {thisStatus !== 0 && (
                <Button className="SipTableFunctionIcon">
                  <img src={'../../assets/img/icon/iconEyes.svg'} alt="VTPostek" />
                </Button>
              )}
              {thisStatus === 0 && (
                <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'original.BK_ID', ''))}>
                  <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
                </Button>
              )}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTable, tuKy, denKy, idSearch, typeSearch],
  );

  const handleCheckedValuesChange = (values: string[]): void => {
    setCheckedBangKe(values);
  };

  function handleSelectStartDate(date: Date): void {
    setTuKy(moment(date).format('YYYYMM'));
  }

  function handleSelectEndDate(date: Date): void {
    setDenKy(moment(date).format('YYYYMM'));
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Kê khai chi phí thường xuyên')}</h1>
        <div className="sipTitleRightBlock">
          <TopControllers checkedBangKe={checkedBangKe} noBangKeChecked={noBangKeChecked} />
        </div>
      </Row>

      <Row className="sipBgWhiteContainer sipFilterContainer">
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input
              type="text"
              placeholder="Tra cứu bảng kê"
              onChange={handleChangeTextboxValue(setIdSearch)}
              value={idSearch}
            />
            <img src={'../../assets/img/icon/iconSearch.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterCol">
          <SelectRangeDate handleSelectEndDate={handleSelectEndDate} handleSelectStartDate={handleSelectStartDate} />
        </Col>
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
              <option value="">{t('Tất cả trạng thái')}</option>
              {map(
                badgeFicoStateMap,
                (item: string, index: number): JSX.Element => {
                  return (
                    <option key={index} value={toString(index)}>
                      {item}
                    </option>
                  );
                },
              )}
            </Input>
            <img src={'../../assets/img/icon/iconFilter.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterCol sipFilterColBtn">
          <Button color="primary" onClick={handleSearchBangKe}>
            {t('Tìm kiếm')}
          </Button>
        </Col>
      </Row>

      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable
          columns={columns}
          data={dataTable}
          onCheckedValuesChange={handleCheckedValuesChange}
          onRowClick={handleRedirectDetail}
          showCheckAll={true}
          showCheckboxes
          renderCheckboxValues="BK_ID"
        />
        {size(dataTable) > 0 && (
          <Pagination
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            onThisPaginationChange={onPaginationChange}
            resetCurrentPage={resetCurrentPage}
          />
        )}
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteManifest}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
    </>
  );
};

export default DanhSachBangKe;
