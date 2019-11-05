import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, filter, get, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Filter from 'components/Input/Filter';
import Pagination from 'components/Pagination';
import { makeSelectorTaiChuaNhanBangKePhieuGui, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getTaiKienDaQuetNhan: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiChuaNhanBKPhieuGui: React.FC<Props> = (props: Props): JSX.Element => {
  const { getTaiKienDaQuetNhan } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const listTaiChuaNhanBangKePhieuGui = useSelector(makeSelectorTaiChuaNhanBangKePhieuGui);
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getTaiKienDaQuetNhan(selectedItem.selected + 1);
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Điểm đến'),
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

  const handleRedirectDetail = useCallback((item: API.RowResponseZTMI023OUT): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredListTaiChuaNhanBangKePhieuGui = useMemo(
    () => filter(listTaiChuaNhanBangKePhieuGui, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiChuaNhanBangKePhieuGui, searchText],
  );

  const handleChangeSearchText = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const renderToolbar = (): JSX.Element => (
    <Row>
      <div className="btn-toolbar col-10">
        <Filter
          onChange={handleChangeSearchText}
          placeholder={t('Tìm kiếm tải')}
          searchResult={filteredListTaiChuaNhanBangKePhieuGui}
        />
      </div>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={filteredListTaiChuaNhanBangKePhieuGui} onRowClick={handleRedirectDetail} />
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

export default TaiChuaNhanBKPhieuGui;
