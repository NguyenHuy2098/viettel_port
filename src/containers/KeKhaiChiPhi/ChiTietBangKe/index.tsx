import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import { get, sumBy, toNumber, reject } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'connected-react-router';
import produce from 'immer';
import { delay, size } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import useLoggedInUser from 'hooks/useLoggedInUser';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007_list, select_ZFI007_header } from 'redux/ZFI007/selectors';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import PrintableBangKe from '../PrintableBangKe';
import UtilityDropDown from '../Utility';

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
  const userLogin = useLoggedInUser();
  const bangKeHeader = useSelector(select_ZFI007_header);
  const list = useSelector(select_ZFI007_list);
  const [data, setData] = useState<DataType[]>([]);

  const status = useMemo(() => toNumber(get(bangKeHeader, 'BK_STATUS', -1)), [bangKeHeader]);
  const tongGiaTri = useMemo(
    () =>
      numeral(sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(get(item, 'SUM_AMOUNT') || 0))).format(
        '0,0',
      ),
    [data],
  );

  useEffect(() => {
    dispatch(
      action_ZFI007({
        BK_ID: idBangKe,
      }),
    );
  }, [dispatch, idBangKe]);

  useEffect((): void => {
    setData(list);
  }, [list]);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hợp đồng'),
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
      },
      {
        Header: t('Phụ phí'),
        accessor: 'PHU_PHI',
      },
      {
        Header: t('TS'),
        accessor: 'TAX',
      },
      {
        Header: t('Thuế GTGT'),
        accessor: 'TAX_AMOUNT',
      },
      {
        Header: t('Tổng'),
        accessor: 'SUM_AMOUNT',
      },
      {
        Header: t('Link URL'),
        accessor: 'URL',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          if (status) return <></>;
          return get(row, 'original.LINE_ITEM') ? (
            <UtilityDropDown
              removeTableRow={handleRemoveTableRow}
              editTableRow={handleEditTableRow}
              copyTableRow={handleCopyTableRow}
              item={row.original}
            />
          ) : (
            <></>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const handleNopBangKeSuccess = (): void => {
    delay(() => dispatch(goBack()), 2000);
  };

  const handleRemoveTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = reject(data, ['LINE_ITEM', get(item, 'LINE_ITEM')]);
    setData(tempData);
  };

  const handleEditTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.LINE_ITEM === tempData[i].LINE_ITEM) {
        tempData[i] = item;
      }
    }
    setData(tempData);
  };

  const handleCopyTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data, item];
    setData([...tempData]);
  };

  const ids = useMemo(() => [idBangKe], [idBangKe]);
  const items = useMemo(() => data.filter(item => !item.IS_GROUP_DATA_TABLE), [data]);

  const renderFirstControllers = (): JSX.Element => (
    <>
      <ButtonPrintable
        btnProps={{
          disabled: !size(ids),
          color: 'primary',
          className: 'ml-2',
          children: (
            <>
              <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
              {t('In bảng kê')}
            </>
          ),
        }}
        modalBodyProps={{
          children: <PrintableBangKe ids={ids} />,
        }}
        modalHeaderProps={{
          children: t('In thông tin chuyến thư'),
        }}
      />
      {!status && (
        <>
          <ButtonLuuBangKe className="ml-2" idBangKe={idBangKe} items={items} />
          <ButtonNopBangKe className="ml-2" idBangKe={idBangKe} onSuccess={handleNopBangKeSuccess} />
        </>
      )}
    </>
  );

  const renderThongTinBangKe = (): JSX.Element => (
    <Row>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span className="text-bold">{get(bangKeHeader, 'BK_ID')}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>
            <BadgeFicoBangKeStatus status={status} />
          </span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          <span className="text-bold">
            {get(bangKeHeader, 'BK_MONTH') || '-'}/{get(bangKeHeader, 'BK_YEAR') || '-'}
          </span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Người tạo')}:</div>
          <span className="text-bold">{get(bangKeHeader, 'CRE_BY') || '-'}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Đơn vị')}:</div>
          <span className="text-bold">{get(userLogin, 'user.profile.bp_org_unit', '')}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Tổng giá trị')}:</div>
          <span className="text-bold">{tongGiaTri} đ</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Ngày tạo')}:</div>
          <span className="text-bold">
            {moment(get(bangKeHeader, 'CRE_TIME', ''), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
          </span>
        </div>
      </Col>
    </Row>
  );

  function handleSubmitKhoanMuc(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ TEN_KM: item.km_text, IS_GROUP_DATA_TABLE: true });
    });
    setData(nextState);
  }

  const renderSecondControllers = (): JSX.Element => <ThemMoiKhoanMuc handleSubmit={handleSubmitKhoanMuc} />;

  function handleSubmit(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return <ThemMoiChiPhi index={index} handleSubmit={handleSubmit} rows={rows} />;
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{t('Chi tiết bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="bg-white p-3 shadow-sm">{renderThongTinBangKe()}</div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        {!status && <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>}
      </Row>

      <Row>
        <Col>
          <div className="sipTableContainerAmountListContainer">
            <div className="sipTableContainer sipTableContainerAmountList">
              {status ? (
                <DataTable columns={columns} data={data} groupKey={'TEN_KM'} />
              ) : (
                <DataTable columns={columns} data={data} groupKey={'TEN_KM'} renderGroupedRow={renderGroupedRow} />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChiTietBangKe;
