import React, { useMemo, useEffect, useCallback } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toString } from 'lodash';
import { generatePath } from 'react-router';
import { Cell } from 'react-table';
import { default as NumberFormat } from 'react-number-format';

import { SipDataState } from 'utils/enums';
import { push } from 'connected-react-router';
import { findIndex, get, join, size, slice } from 'lodash';
import DataTable from 'components/DataTable/Printable';
import { select_ZTMI0240 } from 'redux/ZTMI240/selectors';
import routesMap from 'utils/routesMap';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';

interface MTZTMI240RowTypeCustom extends MTZTMI240Row {
  DES?: string;
}

// eslint-disable-next-line max-lines-per-function
const BuuGuiChuaDongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      action_ZTMI240({
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listBuuGuiChuaDongBangKe = useSelector(select_ZTMI0240);

  const columns = useMemo(
    () => [
      {
        Header: t('Nhóm hàng'),
        accessor: 'COMM_LOC_GROUP',
        Cell: ({ row }: Cell<API.Child>): string => {
          return get(row, 'original.COMM_LOC_GROUP', '');
        },
      },
      {
        Header: t('Số lượng'),
        accessor: 'TOTAL_ITEM',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <NumberFormat
              value={get(row, 'original.TOTAL_ITEM', '')}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
            />
          );
        },
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES',
        Cell: ({ row }: Cell<API.Child>): string => {
          const thisCommLocGroup = get(row, 'original.COMM_LOC_GROUP', '');
          if (!thisCommLocGroup) return '';
          const thisDes = join(
            slice(
              thisCommLocGroup,
              findIndex(thisCommLocGroup, (item: string): boolean => item === '.') + 1,
              size(thisCommLocGroup),
            ),
            '',
          );
          return thisDes;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleRedirectDetail = useCallback(
    (item: MTZTMI240RowTypeCustom): void => {
      let des = '';

      try {
        const thisCommLocGroup = get(item, 'COMM_LOC_GROUP', '');
        if (!thisCommLocGroup) des = '';
        des = join(
          slice(
            thisCommLocGroup,
            findIndex(thisCommLocGroup, (item: string): boolean => item === '.') + 1,
            size(thisCommLocGroup),
          ),
          '',
        );
      } catch (error) {}

      dispatch(
        push(generatePath(routesMap.CHI_TIET_BUU_BUI_CHUA_DONG_BANG_KE), {
          child: item.CHILD ? item.CHILD : '',
          des: des,
          COMM_LOC_GROUP: item.COMM_LOC_GROUP ? item.COMM_LOC_GROUP : '',
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBuuGuiChuaDongBangKe],
  );

  return (
    <Row className="sipTableContainer mt-3 sipTableRowClickable">
      <DataTable columns={columns} data={listBuuGuiChuaDongBangKe} onRowClick={handleRedirectDetail} />
    </Row>
  );
};

export default BuuGuiChuaDongBangKe;
