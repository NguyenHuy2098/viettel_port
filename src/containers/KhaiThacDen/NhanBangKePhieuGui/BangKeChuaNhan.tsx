import React, { useMemo } from 'react';
import { Button, Row, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { get, map } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorCountMT_ZTMI046, useGet_MT_ZTMI046_OUT } from 'redux/MIOA_ZTMI046/selectors';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const BangKeChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const idTaiKien = get(props, 'match.params.idTaiKien');

  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();
  const countPhieuGui = useSelector(makeSelectorCountMT_ZTMI046, shallowEqual);

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: idTaiKien,
    };
    dispatch(action_MIOA_ZTMI046(payload));
  }, [dispatch, idTaiKien]);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Label check>
                <Input type="checkbox" />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã BK/PG'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countPhieuGui',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Loại'),
        accessor: 'TYPE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(get(manifestForwardingOrderList, 'Row[0].CHILDS'), (item: API.Child) => {
    if (item.LIFECYCLE === 106) {
      return {
        TOR_ID: item.TOR_ID,
        SRC_LOC_IDTRQ: item.SRC_LOC_IDTRQ,
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ,
        countPhieuGui: countPhieuGui,
        GRO_WEI_VAL: item.GRO_WEI_VAL,
        CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
        TYPE_OF: item.TOR_TYPE === 'ZC2' ? 'Tải' : 'Kiện',
      };
    }
  });

  return (
    <>
      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Tìm kiếm tải kiện" />
          <Button color="primary">Tìm kiếm</Button>
        </div>
      </Row>
      <div className="row mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default withRouter(BangKeChuaNhan);
