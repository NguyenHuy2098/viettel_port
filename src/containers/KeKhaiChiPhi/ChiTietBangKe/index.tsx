import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import { get, map, toNumber, reject, toString, filter } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import moment from 'moment';
import numeral from 'numeral';
import classnames from 'classnames';

import { detailBangkeFicoStateMap } from 'utils/common';
import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007_list, select_ZFI007_header } from 'redux/ZFI007/selectors';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import TopControllers from './TopControllers';
import TopThongTinBangKe from './TopThongTinBangKe';
import UtilityDropDown from '../UtilityDropDown';

interface Props {
  match: match;
}

interface DataType extends API.LISTMTDETAILRECEIVER {
  IS_GROUP_DATA_TABLE?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const ChiTietBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dispatch = useDispatch();
  const bangKeHeader = useSelector(select_ZFI007_header);
  const list = useSelector(select_ZFI007_list);
  const [data, setData] = useState<DataType[]>([]);
  const [dataOriginal, setDataOriginal] = useState<DataType[]>([]);

  const status = useMemo(() => toNumber(get(bangKeHeader, 'BK_STATUS', -1)), [bangKeHeader]);

  useEffect(() => {
    dispatch(
      action_ZFI007({
        BK_ID: idBangKe,
      }),
    );
  }, [dispatch, idBangKe]);

  useEffect((): void => {
    setData(list);
    setDataOriginal(list);
  }, [list]);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hoá đơn'),
        accessor: 'MAU_HD',
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'KIHIEU_HD',
      },
      {
        Header: t('Số'),
        accessor: 'SO_HD',
      },
      {
        Header: t('Ngày'),
        accessor: 'NGAY_HD',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDate = moment(get(row, 'original.NGAY_HD'), 'YYYYMMDD').format('DD/MM/YYYY');
          return <>{thisDate}</>;
        },
      },
      {
        Header: t('Trạng thái'),
        accessor: 'STATUS_ITEM',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => (
          <BadgeFicoBangKeStatus status={toNumber(get(row, 'original.STATUS_ITEM', -1))} />
        ),
      },
      {
        Header: t('Người bán'),
        accessor: 'NGUOI_BAN',
      },
      {
        Header: t('MST'),
        accessor: 'MST',
      },
      {
        Header: t('Hàng hoá'),
        accessor: 'DESCR',
      },
      {
        Header: t('Giá chưa thuế'),
        accessor: 'AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.AMOUNT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
      },
      {
        Header: t('Phụ phí'),
        accessor: 'PHU_PHI',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.PHU_PHI', '0')).format('0,0');
          return <>{thisValue}</>;
        },
      },
      {
        Header: t('TS'),
        accessor: 'TAX',
      },
      {
        Header: t('Thuế GTGT'),
        accessor: 'TAX_AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.TAX_AMOUNT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
      },
      {
        Header: t('Tổng'),
        accessor: 'SUM_AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.SUM_AMOUNT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
      },
      {
        Header: t('Giá trị HH, DV duyệt'),
        accessor: 'AMOUNT_INIT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.AMOUNT_INIT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
        show: status === 1 || status === 2,
      },
      {
        Header: t('Phụ phí duyệt'),
        accessor: 'PHU_PHI_INIT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.PHU_PHI_INIT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
        show: status === 1 || status === 2,
      },
      {
        Header: t('Thuế GTGT duyệt'),
        accessor: 'TAX_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.TAX_AMOUNT_INIT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
        show: status === 1 || status === 2,
      },
      {
        Header: t('Tổng cộng duyệt'),
        accessor: 'SUM_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.SUM_AMOUNT_INIT', '0')).format('0,0');
          return <>{thisValue}</>;
        },
        show: status === 1 || status === 2,
      },
      {
        Header: t('Link URL'),
        accessor: 'URL',
      },
      {
        Header: t('Lý do'),
        accessor: 'NOTE',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          const thisNote = get(row, 'original.NOTE');
          return <>{thisNote ? thisNote : ''}</>;
        },
        show: status === 1 || status === 2,
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return get(row, 'original.LINE_ITEM') ? (
            <UtilityDropDown
              removeTableRow={handleRemoveTableRow}
              editTableRow={handleEditTableRow}
              copyTableRow={handleCopyTableRow}
              item={row.original}
              index={row.index}
            />
          ) : (
            <></>
          );
        },
        show: status === 0,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, status],
  );

  const handleRemoveTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = reject(data, ['LINE_ITEM', get(item, 'LINE_ITEM')]);
    setData(tempData);
    setDataOriginal(tempData);
  };

  const handleEditTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.LINE_ITEM === tempData[i].LINE_ITEM) {
        tempData[i] = item;
      }
    }
    setData(tempData);
    setDataOriginal(tempData);
  };

  const handleCopyTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data, item];
    setData([...tempData]);
    setDataOriginal([...tempData]);
  };

  const items = useMemo(() => data.filter(item => !item.IS_GROUP_DATA_TABLE), [data]);

  function handleSubmitKhoanMuc(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ KHOAN_MUC: item.km_id, TEN_KM: item.km_text, IS_GROUP_DATA_TABLE: true });
    });
    setData(nextState);
    setDataOriginal(nextState);
  }

  const renderSecondControllers = (): JSX.Element => <ThemMoiKhoanMuc handleSubmit={handleSubmitKhoanMuc} />;

  function handleSubmit(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
    setDataOriginal(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return <ThemMoiChiPhi index={index} handleSubmit={handleSubmit} rows={rows} />;
  };

  const handleFilterByStatus = (event: React.FormEvent<HTMLInputElement>): void => {
    const filteredList = filter(
      list,
      (item: API.LISTMTDETAILRECEIVER): boolean => toString(item.STATUS_ITEM) === event.currentTarget.value,
    );
    setData(event.currentTarget.value === '' ? dataOriginal : filteredList);
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{status === 0 ? t('Sửa bảng kê') : t('Chi tiết bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <TopControllers idBangKe={idBangKe} items={items} status={status} />
        </Col>
      </Row>
      <div className="bg-white p-3 shadow-sm mb-4">
        <TopThongTinBangKe data={data} />
      </div>
      <Row className="mb-3 pl-3 pr-3">
        <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        {(status === 1 || status === 2) && (
          <div className="sipFilterColSearch min-width-100px pull-right ml-2">
            <Input type="select" onChange={handleFilterByStatus}>
              <option value="">{t('Tất cả trạng thái')}</option>
              {map(
                detailBangkeFicoStateMap,
                (item: string, index: number): JSX.Element => (
                  <option key={index} value={toString(index)}>
                    {item}
                  </option>
                ),
              )}
            </Input>
            <img src={'../../assets/img/icon/iconFilter.svg'} alt="VTPostek" />
          </div>
        )}
        {!status && <div className="pull-right">{renderSecondControllers()}</div>}
      </Row>
      <div className={!status ? 'sipTableContainerAmountListContainer' : ''}>
        <div
          className={classnames({
            sipTableContainer: true,
            sipTableContainerAmountList: true,
            sipTableContainerAmountListNoFix: status === 1 || status === 2,
          })}
        >
          {status ? (
            <DataTable columns={columns} data={data} groupKey={'TEN_KM'} />
          ) : (
            <DataTable columns={columns} data={data} groupKey={'TEN_KM'} renderGroupedRow={renderGroupedRow} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChiTietBangKe;
