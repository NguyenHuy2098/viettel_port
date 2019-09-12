import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Row, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { filter, map, includes, toLower } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import routesMap from 'utils/routesMap';
import Pagination from 'components/Pagination';
import { makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';

interface Props {
  data: API.RowMTZTMI047OUT[];
  getChuyenThuChuaNhanTaiKien: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaNhanTaiKien: React.FC<Props> = ({ data, getChuyenThuChuaNhanTaiKien }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const totalPage = useSelector(makeSelectorTotalPage('ZC3', 106));

  const [chuyenThuChuaNhanTaiKien, setChuyenThuChuaNhanTaiKien] = useState<API.RowMTZTMI047OUT[]>([]);
  const [keySearch, setKeySearch] = useState<string>('');

  useEffect((): void => {
    setChuyenThuChuaNhanTaiKien(data);
  }, [data]);

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
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
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('SL'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const rows = map(chuyenThuChuaNhanTaiKien, (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      FR_LOG_ID: item.LOG_LOCID_FR,
      TO_LOG_ID: item.LOG_LOCID_TO,
      countChuyenThu: '',
      GRO_WEI_VAL: parseFloat(item.NET_WEI_VAL || '0').toPrecision(3) + ' ' + toLower(item.NET_WEI_UNI),
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
    };
  });

  const changeKeySearch = (event: React.FormEvent<HTMLInputElement>): void => {
    setKeySearch(event.currentTarget.value);
  };
  const handleSearch = (): void => {
    const tempArray: API.RowMTZTMI047OUT[] = filter(data, item => includes(item.TOR_ID, keySearch));
    setChuyenThuChuaNhanTaiKien(tempArray);
  };

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm chuyến thư')} onChange={changeKeySearch} />
            </div>
            <Button className="ml-2" color="primary" onClick={handleSearch}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Row>
      </div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={rows} onRowClick={handleRedirectDetail} />
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
