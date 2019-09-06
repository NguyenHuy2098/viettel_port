import React, { useEffect, useMemo, useState } from 'react';
import { Button, Row, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { match } from 'react-router-dom';
import { filter, map, toNumber, trim, size, includes } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';

interface Props {
  match: match;
  tableRows: API.RowMTZTMI047OUT[];
}

// eslint-disable-next-line max-lines-per-function
const TaiChuaNhanBKPhieuGui: React.FC<Props> = ({ tableRows }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState<string>('');
  const [filterTableRows, setFilterTableRow] = useState<API.RowMTZTMI047OUT[]>([]);

  useEffect((): void => {
    setFilterTableRow(tableRows);
  }, [tableRows]);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải'),
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
        Header: t('SL'),
        accessor: 'countChilds',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'NET_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const data = map(filterTableRows, item => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_FR: item.LOG_LOCID_FR,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      countChilds: size(item.Childs),
      NET_WEI_VAL: toNumber(item.NET_WEI_VAL).toPrecision(2),
      CREATED_ON: moment(trim(item.DATETIME_CHLC), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
    };
  });

  const handleRedirectDetail = (item: API.RowResponseZTMI023OUT): void => {
    dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI}/${item.TOR_ID}`));
  };

  const handleSearch = (): void => {
    const newTableRows = filter(tableRows, row => {
      return includes(row.TOR_ID, searchKey);
    });
    setFilterTableRow(newTableRows);
  };

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchKey(event.currentTarget.value);
  };

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm tải')} onChange={handleChangeInput} />
            </div>
            <Button className="ml-2" color="primary" onClick={handleSearch}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Row>
      </div>
      <div className="row mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default TaiChuaNhanBKPhieuGui;
