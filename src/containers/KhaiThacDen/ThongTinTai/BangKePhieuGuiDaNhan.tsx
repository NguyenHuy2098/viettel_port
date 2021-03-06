import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, filter, get, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Filter from 'components/Input/Filter';
import Pagination from 'components/Pagination';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { useSipDataType } from 'hooks/useTranslations';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const BangKePhieuGuiDaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listPhieuGuiDaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.BANG_KE_DA_QUET_NHAN));
  const [searchText, setSearchText] = useState<string>('');

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bảng kê'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{useSipDataType(get(row, 'original.TOR_TYPE'))}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const redirectToThongTinBangKe = useCallback((item: API.Child): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_BANG_KE_PHIEU_GUI, { idBangKe: item.TOR_ID })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredListPhieuGuiDaNhan = useMemo(
    () => filter(listPhieuGuiDaNhan, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listPhieuGuiDaNhan],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col className="btn-toolbar col-10">
        <Filter
          onChange={handleChangeSearchText}
          placeholder={t('Tìm kiếm bảng kê/phiếu gửi')}
          searchResult={filteredListPhieuGuiDaNhan}
        />
        {/*<button className="btn btn-outline-primary mr-2">*/}
        {/*  {t('Tải')}&nbsp;({'05'})*/}
        {/*</button>*/}
        {/*<button className="btn btn-outline-secondary">*/}
        {/*  {t('Kiện')}&nbsp;({'20'})*/}
        {/*</button>*/}
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={filteredListPhieuGuiDaNhan} onRowClick={redirectToThongTinBangKe} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onThisPaginationChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(BangKePhieuGuiDaNhan);
