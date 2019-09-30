import React, { useMemo, useEffect } from 'react';
import { Row } from 'reactstrap';
import DataTable from 'components/DataTable/Printable';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';
import { findIndex, join, map, size, slice } from 'lodash';
import { select_ZTMI0240 } from 'redux/ZTMI240/selectors';

// eslint-disable-next-line max-lines-per-function
const BuuGuiChuaDongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listPhieuGuiChuaDongBangKe = useSelector(select_ZTMI0240);
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
  const data = map(listPhieuGuiChuaDongBangKe, (item: MTZTMI240Row) => {
    const thisDes = join(
      slice(
        item.COMM_LOC_GROUP,
        findIndex(item.COMM_LOC_GROUP, (item: string): boolean => item === '.') + 1,
        size(item.COMM_LOC_GROUP),
      ),
      '',
    );
    return {
      COMM_LOC_GROUP: item.COMM_LOC_GROUP,
      TOTAL_ITEM: item.TOTAL_ITEM,
      DES: thisDes,
      CHILD: item.CHILD,
    };
  });

  useEffect(() => {
    const payload = {
      IV_FREIGHT_UNIT_STATUS: [301],
      IV_LOC_ID: 'BDH',
      IV_DATE: '20190923',
    };
    dispatch(action_ZTMI240(payload));
  }, [dispatch]);

  return (
    <Row className="sipTableContainer mt-3 sipTableRowClickable">
      <DataTable columns={columns} data={data} />
    </Row>
  );
};

export default BuuGuiChuaDongBangKe;
