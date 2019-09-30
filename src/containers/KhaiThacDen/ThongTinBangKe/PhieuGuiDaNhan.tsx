import React, { ChangeEvent, useMemo, useState } from 'react';
import { Button, Row, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { RouteComponentProps } from 'react-router-dom';
import { ceil, filter, get, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import Filter from 'components/Input/Filter';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const PhieuGuiDaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const listPhieuGuiDaNhan = useSelector(
    makeSelector046ChildrenByLifecycle([
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_TTKT,
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );
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
        Header: t('Mã bưu gửi'),
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
        accessor: 'ITEM_NO',
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

  const filteredListPhieuGuiDaNhan = useMemo(
    () => filter(listPhieuGuiDaNhan, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listPhieuGuiDaNhan],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <Filter
            onChange={handleChangeSearchText}
            placeholder={t('Tìm kiếm bưu gửi')}
            searchResult={filteredListPhieuGuiDaNhan}
          />
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={filteredListPhieuGuiDaNhan} />
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

export default withRouter(PhieuGuiDaNhan);
