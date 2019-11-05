import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import { get, map, toNumber, reject, toString, filter, slice, size, join, includes, isEmpty } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import moment from 'moment';
import classnames from 'classnames';

import { detailBangkeFicoStateMap, numberFormat } from 'utils/common';
import BadgeFicoChiPhiStatus from 'components/Badge/BadgeFicoChiPhiStatus';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007_list, select_ZFI007_header } from 'redux/ZFI007/selectors';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import TopControllers from './TopControllers';
import TopThongTinBangKe from '../TopThongTinBangKe';
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
  const [deleteData, setDeleteData] = useState<DataType[]>([]);

  const status = useMemo(() => toNumber(get(bangKeHeader, 'BK_STATUS', -1)), [bangKeHeader]);

  useEffect(() => {
    dispatch(
      action_ZFI007({
        BK_ID: idBangKe,
      }),
    );
  }, [dispatch, idBangKe]);

  useEffect((): void => {
    setData(filter(data, item => !isEmpty(item)));
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
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDate = moment(get(row, 'original.NGAY_HD'), 'YYYYMMDD').format('DD/MM/YYYY');
          return <>{thisDate}</>;
        },
      },
      {
        Header: t('Trạng thái'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <BadgeFicoChiPhiStatus status={toNumber(get(row, 'original.STATUS_ITEM', -1))} />;
        },
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
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDescr = get(row, 'original.DESCR', '0');
          const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
          return <span title={thisDescr}>{thisText}</span>;
        },
      },
      {
        Header: t('Giá chưa thuế (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.AMOUNT_INIT'));
        },
      },
      {
        Header: t('Phụ phí (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.PHU_PHI_INIT'));
        },
      },
      {
        Header: t('TS'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <div>{get(row, 'original.TAX', '')}</div>;
        },
      },
      {
        Header: t('Thuế GTGT (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.TAX_AMOUNT_INIT'));
        },
      },
      {
        Header: t('Tổng (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.SUM_AMOUNT_INIT'));
        },
      },
      {
        Header: t('Giá trị HH, DV duyệt (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.AMOUNT'));
        },
        show: status === 3 || status === 2,
      },
      {
        Header: t('Phụ phí duyệt (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.PHU_PHI'));
        },
        show: status === 3 || status === 2,
      },
      {
        Header: t('Thuế GTGT duyệt'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.TAX_AMOUNT'));
        },
        show: status === 3 || status === 2,
      },
      {
        Header: t('Tổng cộng duyệt (VND)'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.SUM_AMOUNT'));
        },
        show: status === 3 || status === 2,
      },
      {
        Header: t('Link URL'),
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDescr = get(row, 'original.URL', '0');
          const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
          return <span title={thisDescr}>{thisText}</span>;
        },
      },
      {
        Header: t('Lý do'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.NOTE') || '';
        },
        show: status === 3 || status === 2,
      },
      {
        Header: status === 0 ? t('Quản trị ') : t(' '),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <></>;
        },
        // show: status === 0,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, status],
  );

  const handleRemoveTableRow = (item: API.LISTMTDETAILRECEIVER, index: number): void => {
    const tempData = reject(data, ['LINE_ITEM', get(item, 'LINE_ITEM')]);
    if (!includes(item.LINE_ITEM, 'CG')) {
      setDeleteData([...deleteData, item]);
    }
    setData(tempData);
    setDataOriginal(tempData);
  };

  const handleEditTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.LINE_ITEM === tempData[i].LINE_ITEM) {
        tempData[i] = { ...item };
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

  const items = useMemo(() => data.filter(item => !get(item, 'IS_GROUP_DATA_TABLE')), [data]);

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

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[]): JSX.Element => {
    return <ThemMoiChiPhi handleSubmit={handleSubmit} rows={rows} status={status} />;
  };

  const renderUtilityDropDown = (row: TableRow<API.LISTMTDETAILRECEIVER>, index: number): JSX.Element => {
    return status !== 0 ? (
      <></>
    ) : (
      <UtilityDropDown
        removeTableRow={handleRemoveTableRow}
        editTableRow={handleEditTableRow}
        copyTableRow={handleCopyTableRow}
        item={row.original}
        khoanMuc={toString(index)}
      />
    );
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
          <TopControllers idBangKe={idBangKe} items={items} status={status} deleteData={deleteData} />
        </Col>
      </Row>
      <div className="bg-white p-3 shadow-sm mb-4">
        <TopThongTinBangKe data={data} isCreateNew={false} />
      </div>
      <Row className="mb-3 pl-3 pr-3">
        <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        {(status === 3 || status === 2) && (
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
      <div className={!status ? 'sipTableContainerAmountListContainer' : 'position-relative'}>
        <div
          className={classnames({
            sipTableContainer: true,
            sipTableContainerAmountList: true,
            sipTableContainerAmountListNoFix: status === 3 || status === 2,
          })}
        >
          <DataTable
            columns={columns}
            data={data}
            groupKey={'KHOAN_MUC'}
            renderGroupedRow={renderGroupedRow}
            renderUtilityDropDown={renderUtilityDropDown}
          />
        </div>
      </div>
    </>
  );
};

export default ChiTietBangKe;
