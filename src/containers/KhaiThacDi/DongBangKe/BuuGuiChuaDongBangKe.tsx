import React, { useMemo, useEffect, useCallback } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router';
import { push } from 'connected-react-router';
import { findIndex, get, join, map, size, slice, toString } from 'lodash';

import DataTable from 'components/DataTable/Printable';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';
import { select_ZTMI0240 } from 'redux/ZTMI240/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface MTZTMI240RowTypeCustom extends MTZTMI240Row {
  DES?: string;
}

// eslint-disable-next-line max-lines-per-function
const BuuGuiChuaDongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listBuuGuiChuaDongBangKe = useSelector(select_ZTMI0240);

  const columns = useMemo(
    () => [
      {
        Header: t('Nhóm hàng'),
        accessor: 'COMM_LOC_GROUP',
      },
      {
        Header: t('Số lượng'),
        accessor: 'TOTAL_ITEM',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const data = map(listBuuGuiChuaDongBangKe, (item: MTZTMI240Row) => {
    const thisCommLocGroup = get(item, 'COMM_LOC_GROUP', '');
    const thisDes = join(
      slice(
        thisCommLocGroup,
        findIndex(thisCommLocGroup, (item: string): boolean => item === '.') + 1,
        size(thisCommLocGroup),
      ),
      '',
    );
    return {
      COMM_LOC_GROUP: item.COMM_LOC_GROUP ? item.COMM_LOC_GROUP : '',
      TOTAL_ITEM: item.TOTAL_ITEM ? item.TOTAL_ITEM : '',
      DES: thisDes,
      CHILD: item.CHILD ? item.CHILD : '',
    };
  });

  useEffect(() => {
    dispatch(
      action_ZTMI240({
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectDetail = useCallback(
    (item: MTZTMI240RowTypeCustom): void => {
      dispatch(
        push(generatePath(routesMap.CHI_TIET_BUU_BUI_CHUA_DONG_BANG_KE), {
          child: item.CHILD ? item.CHILD : '',
          des: item.DES ? item.DES : '',
          COMM_LOC_GROUP: item.COMM_LOC_GROUP ? item.COMM_LOC_GROUP : '',
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBuuGuiChuaDongBangKe],
  );

  return (
    <Row className="sipTableContainer mt-3 sipTableRowClickable">
      <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
    </Row>
  );
};

export default BuuGuiChuaDongBangKe;
