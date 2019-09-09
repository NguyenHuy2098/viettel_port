import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Row, Input, Label, InputGroupAddon, InputGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { filter, map, includes } from 'lodash';
import moment from 'moment';

import { makeSelectorCountMT_ZTMI046, makeSelectorKienDaNhan } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const TaiKienDaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const counttaikien = useSelector(makeSelectorCountMT_ZTMI046);
  const taiKienDaNhan = useSelector(makeSelectorKienDaNhan);
  const [keySearch, setKeySearch] = useState<string>('');
  const [listSearchResultTaiKienDaNhan, setListSearchResultTaiKienDaNhan] = useState<API.Child[]>([]);

  useEffect((): void => {
    setListSearchResultTaiKienDaNhan(taiKienDaNhan);
  }, [taiKienDaNhan]);

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
  const data = map(listSearchResultTaiKienDaNhan, (item: API.Child) => {
    return {
      TOR_ID: item.TOR_ID,
      SRC_LOC_IDTRQ: item.SRC_LOC_IDTRQ,
      DES_LOC_IDTRQ: item.DES_LOC_IDTRQ,
      countPhieuGui: counttaikien,
      GRO_WEI_VAL: `${parseFloat(item.GRO_WEI_VAL || '0').toPrecision(3)} ${item.GRO_WEI_UNI}`,
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('hh:mm DD/MM/YYYY '),
      TYPE_OF: item.TOR_TYPE === 'ZC2' ? 'Tải' : 'Kiện',
    };
  });

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => (): void => {
      dispatch(push(generatePath(routesMap.NHAN_BANG_KE_PHIEU_GUI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onChangeKeySearch = (event: React.FormEvent<HTMLInputElement>): void => {
    setKeySearch(event.currentTarget.value);
  };

  const searchingTaiKien = (): void => {
    const newListTaiKienDaNhan = filter(taiKienDaNhan, el => {
      return includes(el.TOR_ID, keySearch);
    });
    setListSearchResultTaiKienDaNhan(newListTaiKienDaNhan);
  };

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                <i className="fa fa-search" />
              </span>
            </InputGroupAddon>
            <Input
              className="w-25 mr-2"
              type="text"
              placeholder={t('Tìm kiếm tải/kiện')}
              onChange={onChangeKeySearch}
            />
          </InputGroup>
          <Button className="mr-2" color="primary" onClick={searchingTaiKien}>
            {t('Tìm kiếm')}
          </Button>
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-secondary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
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

export default withRouter(TaiKienDaNhan);
