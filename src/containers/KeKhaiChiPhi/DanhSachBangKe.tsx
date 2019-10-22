import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { push } from 'connected-react-router';
import { get, map } from 'lodash';
import { Button, Col, Input, Row, Label } from 'reactstrap';
import { Cell } from 'react-table';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

import { action_ZFI002 } from 'redux/ZFI002/actions';
import { select_ZFI002, select_ZFI002Count } from 'redux/ZFI002/selectors';
import DataTable from 'components/DataTable';
import routesMap from 'utils/routesMap';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import Pagination from '../../components/Pagination';

interface Props {
  match: match;
}

const stateMap = ['Tạo mới', 'Chờ phê duyệt', 'Phê duyệt', 'Duyệt 1 phần'];

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);
  const dataTable = useSelector(select_ZFI002);
  const totalPage = useSelector(select_ZFI002Count);

  const [tuKy, setTuKy] = useState<string>('');
  const [denKy, setDenKy] = useState<string>('');
  const [filterTimeValue, setFilterTimeValue] = useState<string>('');
  const [idSearch, setIdSearch] = useState<string>('');
  const [typeSearch, setTypeSearch] = useState<string>('');

  const getListBangKe = (payload = {}): void => {
    const payloadListBk = {
      TU_KY: moment().format('YYYYMM'),
      DEN_KY: moment().format('YYYYMM'),
      MA_BUU_CUC: userMaBp,
      BK_ID: '',
      BK_STATUS: '2',
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
      ...payload,
    };
    dispatch(action_ZFI002(payloadListBk));
  };

  function handleSearchBangKe(): void {
    getListBangKe({ BK_ID: idSearch, TU_KY: tuKy, DEN_KY: denKy, BK_STATUS: typeSearch });
  }

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListBangKe({
      BK_ID: idSearch,
      TU_KY: tuKy,
      DEN_KY: denKy,
      BK_STATUS: typeSearch,
      IV_PAGENO: selectedItem.selected + 1,
    });
  };

  React.useEffect((): void => {
    getListBangKe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMaBp]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeDeliveryTime(event: any, picker: any): void {
    if (tuKy && denKy) {
      setTuKy(moment(get(picker, 'startDate')).format('YYYYMM'));
      setDenKy(moment(get(picker, 'endDate')).format('YYYYMM'));
      setFilterTimeValue(
        `${moment(get(picker, 'startDate')).format('MM/YYYY')} - ${moment(get(picker, 'endDate')).format('MM/YYYY')}`,
      );
    }
  }

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
          <img src={'../../assets/img/icon/iconExport.svg'} alt="VTPostek" />
          {t('Xuất file Excel')}
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
          {t('In bảng kê')}
        </Button>
        <Button color="primary" className="ml-2" onClick={redirectToTaoMoiBangKe}>
          <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
          {t('Thêm mới')}
        </Button>
      </>
    );
  };

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
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
          const statusText = get(stateMap, `[${thisStatus}]`);
          return (
            <>
              <Button className={`sipTableBtnStatus sipTableBtnStatus${thisStatus}`}>{statusText}</Button>
            </>
          );
        },
      },
      {
        Header: t('Người cập nhật'),
        accessor: 'UDP_BY',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return <>Chưa có mô tả</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisStatus = get(row, 'values.BK_STATUS', 0);
          return thisStatus === 0 ? (
            <Button className="SipTableFunctionIcon">
              <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
            </Button>
          ) : (
            <Button className="SipTableFunctionIcon">
              <img src={'../../assets/img/icon/iconEyes.svg'} alt="VTPostek" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTable],
  );

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
          <DateRangePicker onApply={handleChangeDeliveryTime}>
            <Input value={filterTimeValue} type="text" placeholder="Nhập khoảng thời gian" />
          </DateRangePicker>
        </Col>
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
              <option value="">Tất cả trạng thái</option>
              {map(
                stateMap,
                (item: string, index: number): JSX.Element => {
                  return <option value={index}>{item}</option>;
                },
              )}
            </Input>
            <img src={'../../assets/img/icon/iconFilter.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterColBtn">
          <Button color="primary" onClick={handleSearchBangKe}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>

      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataTable} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default DanhSachBangKe;
