import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { findIndex, join, map, size, slice } from 'lodash';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';
import { select_ZTMI0240 } from 'redux/ZTMI240/selectors';
import routesMap from 'utils/routesMap';
import DataTable from 'components/DataTable';
import { generatePath } from 'react-router';
import { makeSelectorMaBP } from 'redux/auth/selectors';

// eslint-disable-next-line max-lines-per-function
function PhieuGuiChuaDongBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);

  const listPhieuGuiChuaDongBangKe = useSelector(select_ZTMI0240);

  useEffect((): void => {
    const payload = {
      IV_FREIGHT_UNIT_STATUS: [301, 304, 311, 600],
      IV_LOC_ID: userMaBp,
      IV_DATE: '20190923',
    };
    dispatch(action_ZTMI240(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userMaBp]);

  const handleRedirectDetail = useCallback(
    (item: MTZTMI240Row): void => {
      dispatch(push(generatePath(routesMap.CHI_TIET_NHOM_HANG_HOA), item.CHILD));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listPhieuGuiChuaDongBangKe],
  );

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

  return (
    <>
      <Row className="sipTableContainer mt-3 sipTableRowClickable">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
}

export default PhieuGuiChuaDongBangKe;
