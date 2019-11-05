import React, { useCallback, useMemo } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { makeSelectorBangKeChuaNhanPhieuGui, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getBangKeDaQuetNhan: (IV_PAGENO: number) => void;
}
// eslint-disable-next-line max-lines-per-function
const BangKeChuaNhanPhieuGui: React.FC<Props> = (props: Props): JSX.Element => {
  const { getBangKeDaQuetNhan } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listBangKeChuaNhanPhieuGui = useSelector(makeSelectorBangKeChuaNhanPhieuGui);
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.BANG_KE, SipDataState.BANG_KE_DA_QUET_NHAN));

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getBangKeDaQuetNhan(selectedItem.selected + 1);
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bảng kê'),
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

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_BANG_KE_PHIEU_GUI, { idBangKe: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBangKeChuaNhanPhieuGui],
  );

  return (
    <>
      <div className="shadow-sm mb-3 bg-white" />
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listBangKeChuaNhanPhieuGui} onRowClick={handleRedirectDetail} />
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

export default BangKeChuaNhanPhieuGui;
