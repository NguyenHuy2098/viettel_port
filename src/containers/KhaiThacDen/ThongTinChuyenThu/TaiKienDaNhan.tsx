import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Button, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, filter, get, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import Filter from 'components/Input/Filter';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const TaiKienDaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listTaiKienDaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.TAI_KIEN_DA_QUET_NHAN));
  const [searchText, setSearchText] = useState<string>('');

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải/kiện'),
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
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <i className="fa fa-print fa-lg color-green" />
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

  const redirectToThongTinTai = useCallback(
    (item: API.Child) => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const filteredListTaiKienDaNhan = useMemo(
    () => filter(listTaiKienDaNhan, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienDaNhan],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <Filter
            onChange={handleChangeSearchText}
            placeholder={t('Tìm kiếm tải/kiện')}
            searchResult={filteredListTaiKienDaNhan}
          />
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-secondary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={filteredListTaiKienDaNhan} onRowClick={redirectToThongTinTai} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(TaiKienDaNhan);
