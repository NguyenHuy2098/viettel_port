import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Row, Input, Label, InputGroupAddon, InputGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { generatePath, match, withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { get, map, noop } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorCountMT_ZTMI046, useGet_MT_ZTMI046_OUT } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const TaiKienChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idTaiKien, setIdTaiKien] = useState<string>('');
  const countTaiKien = useSelector(makeSelectorCountMT_ZTMI046, shallowEqual);
  const idChuyenThu = get(props, 'match.params.idChuyenThu', '');
  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();

  useEffect((): void => {
    dispatch(
      action_MIOA_ZTMI046({
        IV_TOR_ID: idChuyenThu,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  function handleScanTaiKien(): void {
    noop(idTaiKien);
  }

  function handleChangeTaiKien(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdTaiKien(event.target.value);
  }

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => (): void => {
      dispatch(push(generatePath(routesMap.NHAN_BANG_KE_PHIEU_GUI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
        Header: t('Mã tải kiện'),
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
        countPhieuGui: countTaiKien,
        GRO_WEI_VAL: item.GRO_WEI_VAL,
        CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
        TYPE_OF: item.TOR_TYPE === 'ZC2' ? 'Tải' : 'Kiện',
      };
    }
  });

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                <i className="fa fa-barcode" />
              </span>
            </InputGroupAddon>
            <Input
              className="w-25 mr-2"
              onChange={handleChangeTaiKien}
              type="text"
              placeholder={t('Quét mã tải kiện')}
            />
          </InputGroup>
          <Button className="mr-2" color="primary" onClick={handleScanTaiKien}>
            {t('Quét mã')}
          </Button>
          <button className="btn btn-outline-primary mr-2">
            {t('Tải')}&nbsp;({'05'})
          </button>
          <button className="btn btn-outline-primary">
            {t('Kiện')}&nbsp;({'20'})
          </button>
        </div>
        <div className="btn-toolbar col-2 align-items-end flex-column">
          <Button color="primary">{t('Nhận tải kiện')}</Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default withRouter(TaiKienChuaNhan);
