import React, { useCallback, useMemo } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';

import { map, trim, toNumber, size } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';
import { useDispatch } from 'react-redux';

interface Props {
  match: match;
  tableRows: API.RowMTZTMI047OUT[];
}
// eslint-disable-next-line max-lines-per-function
const BangKeChuaNhanPhieuGui: React.FC<Props> = ({ tableRows }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const data = map(tableRows, item => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_FR: item.LOG_LOCID_FR,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      countChilds: size(item.Childs),
      NET_WEI_VAL: toNumber(item.NET_WEI_VAL).toPrecision(2) + item.NET_WEI_UNI,
      CREATED_ON: moment(trim(item.DATETIME_CHLC), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
    };
  });

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE}/${item.TOR_ID}`));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  return (
    <>
      <div className="row mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default BangKeChuaNhanPhieuGui;
