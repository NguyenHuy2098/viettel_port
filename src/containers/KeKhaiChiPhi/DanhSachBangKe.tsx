import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match, generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { Button, Col, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { get, map, size, toString, trim } from 'lodash';
import moment from 'moment';

import ButtonExportExcelBangKe from 'components/Button/ButtonExportExcelBangKe';
import DataTable from 'components/DataTable';
import { toastError, toastSuccess } from 'components/Toast';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Pagination from 'components/Pagination';
import { action_ZFI002 } from 'redux/ZFI002/actions';
import { action_ZFI004 } from 'redux/ZFI004/actions';
import { select_ZFI002, select_ZFI002Count } from 'redux/ZFI002/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import routesMap from 'utils/routesMap';
import InBangKe from './InBangKe';

interface Props {
  match: match;
}

const stateMap = ['Tạo mới', 'Chờ phê duyệt', 'Phê duyệt', 'Duyệt 1 phần'];

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataTable = useSelector(select_ZFI002);
  const totalPage = useSelector(select_ZFI002Count);

  const [tuKy, setTuKy] = useState<string>(moment().format('YYYYMM'));
  const [denKy, setDenKy] = useState<string>(moment().format('YYYYMM'));
  const [filterTimeValue, setFilterTimeValue] = useState<string>(
    `${moment().format('MM/YYYY')} - ${moment().format('MM/YYYY')}`,
  );
  const [idSearch, setIdSearch] = useState<string>('');
  const [typeSearch, setTypeSearch] = useState<string>('');
  const [checkedBangKe, setCheckedBangKe] = useState<string[]>([]);
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

  const getListBangKe = useCallback(
    (payload = {}): void => {
      dispatch(
        action_ZFI002({
          TU_KY: tuKy,
          DEN_KY: denKy,
          BK_ID: idSearch,
          BK_STATUS: typeSearch,
          ...payload,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tuKy, denKy, idSearch, typeSearch],
  );

  const handleSearchBangKe = (): void => {
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
      setValueFunction(trim(event.currentTarget.value));
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeDeliveryTime = (event: any, picker: any): void => {
    setTuKy(moment(get(picker, 'startDate')).format('YYYYMM'));
    setDenKy(moment(get(picker, 'endDate')).format('YYYYMM'));
    setFilterTimeValue(
      `${moment(get(picker, 'startDate')).format('MM/YYYY')} - ${moment(get(picker, 'endDate')).format('MM/YYYY')}`,
    );
  };

  const redirectToTaoMoiBangKe = (): void => {
    dispatch(push(routesMap.TAO_MOI_BANG_KE));
  };

  const renderTopController = (): JSX.Element => {
    return (
      <>
        <Button className="sipTitleRightBlockBtnIcon">
          <img src={'../../assets/img/icon/iconRefresh.svg'} alt="VTPostek" />
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconExcelWhite.svg'} alt="VTPostek" />
          {t('Lấy file mẫu')}
        </Button>
        <ButtonExportExcelBangKe className="ml-2" ids={checkedBangKe} />
        <InBangKe />
        <Button color="primary" className="ml-2" onClick={redirectToTaoMoiBangKe}>
          <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
          {t('Thêm mới')}
        </Button>
      </>
    );
  };

  function handleRedirectDetail(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      dispatch(push(generatePath(routesMap.SUA_BANG_KE, { idBangKe: torId })));
    };
  }

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
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisDate = moment(get(row, 'values.CRE_TIME'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY');
          return <>{thisDate}</>;
        },
      },
      {
        Header: t('Kỳ'),
        accessor: 'BK_MONTH',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisMonth = get(row, 'values.BK_MONTH');
          const thisYear = get(row, 'values.BK_YEAR');
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
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisStatus = get(row, 'values.BK_STATUS', 0);
          return <BadgeFicoBangKeStatus status={thisStatus} />;
        },
      },
      {
        Header: t('Người cập nhật'),
        accessor: 'UPD_BY',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisUpdBy = get(row, 'values.UPD_BY');
          return <>{thisUpdBy ? thisUpdBy : ''}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisStatus = get(row, 'values.BK_STATUS', 0);
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={handleRedirectDetail(get(row, 'values.BK_ID', ''))}>
                <img src={'../../assets/img/icon/iconEyes.svg'} alt="VTPostek" />
              </Button>
              <Button
                className="SipTableFunctionIcon"
                onClick={handleDeleteItem(get(row, 'values.BK_ID', ''))}
                disabled={thisStatus !== 0}
              >
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTable],
  );

  const handleCheckedValuesChange = (values: string[]): void => {
    setCheckedBangKe(values);
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Kê khai chi phí thường xuyên')}</h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
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
          <div className="sipFilterColSearch">
            <DateRangePicker onApply={handleChangeDeliveryTime}>
              <Input
                value={filterTimeValue}
                onChange={handleChangeTextboxValue(setFilterTimeValue)}
                type="text"
                placeholder="Nhập khoảng thời gian"
              />
            </DateRangePicker>
            <img src={'../../assets/img/icon/iconCalendar.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
              <option value="">Tất cả trạng thái</option>
              {map(
                stateMap,
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
            Tìm kiếm
          </Button>
        </Col>
      </Row>

      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable}
          onCheckedValuesChange={handleCheckedValuesChange}
          onRowClick={handleRedirectDetail}
          showCheckAll={false}
          showCheckboxes
          renderCheckboxValues="BK_ID"
        />
        {size(dataTable) > 0 && (
          <Pagination
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            onThisPaginationChange={onPaginationChange}
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
