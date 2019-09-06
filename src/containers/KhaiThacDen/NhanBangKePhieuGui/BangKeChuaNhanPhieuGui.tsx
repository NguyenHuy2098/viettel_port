import React, { useMemo } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';

import { map, trim, toNumber, size } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';

interface Props {
  match: match;
  tableRows: API.RowMTZTMI047OUT[];
}
// eslint-disable-next-line max-lines-per-function
const BangKeChuaNhanPhieuGui: React.FC<Props> = ({ tableRows }: Props): JSX.Element => {
  const { t } = useTranslation();

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
      NET_WEI_VAL: toNumber(item.NET_WEI_VAL).toPrecision(2),
      CREATED_ON: moment(trim(item.DATETIME_CHLC), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
    };
  });

  return (
    <>
      <div className="row mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default BangKeChuaNhanPhieuGui;
