import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, filter, get, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import Search from 'components/Input/Search';
import { makeSelectorChuyenThuChuaNhanTaiKien, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getChuyenThuChuaNhanTaiKien: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaNhanTaiKien: React.FC<Props> = (props: Props): JSX.Element => {
  const { getChuyenThuChuaNhanTaiKien } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chuyenThuChuaNhanTaiKien = useSelector(makeSelectorChuyenThuChuaNhanTaiKien);
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const [searchText, setSearchText] = useState<string>('');

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getChuyenThuChuaNhanTaiKien(selectedItem.selected + 1);
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.NET_WEI_VAL'), 2)} ${get(row, 'original.NET_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const filteredListChuyenThuChuaNhanTaiKien = useMemo(
    () => filter(chuyenThuChuaNhanTaiKien, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chuyenThuChuaNhanTaiKien, searchText],
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const renderToolbar = (): JSX.Element => (
    <Row>
      <div className="btn-toolbar col-10">
        <Search
          onChange={handleChangeSearchText}
          placeholder={t('Tìm kiếm chuyến thư')}
          searchResult={filteredListChuyenThuChuaNhanTaiKien}
        />
      </div>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={filteredListChuyenThuChuaNhanTaiKien} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default ChuyenThuChuaNhanTaiKien;
