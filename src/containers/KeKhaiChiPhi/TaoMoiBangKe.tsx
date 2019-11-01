import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Col, Row } from 'reactstrap';
import { generatePath } from 'react-router';
import { goBack, replace } from 'connected-react-router';
import { delay, get, isEmpty, map, reject, sumBy, toNumber } from 'lodash';
import produce from 'immer';
import moment from 'moment';
import numeral from 'numeral';
import XLSX, { WorkBook } from 'xlsx';

import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { transformXlsxRowToBangKeItem } from 'utils/common';
import routesMap from 'utils/routesMap';
import ThemMoiChiPhi from './ThemMoiChiPhi';
import UtilityDropDown from './UtilityDropDown';

interface DataType extends API.ITEMBK {
  IS_GROUP_DATA_TABLE?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const dispatch = useDispatch();
  const maBP = useSelector(makeSelectorMaBP);
  const useId = useSelector(makeSelectorPreferredUsername);
  const [data, setData] = useState<DataType[]>([]);
  const { t } = useTranslation();

  const handleRemoveTableRow = (item: API.ITEMBK): void => {
    const tempData = reject(data, ['SO_HD', get(item, 'SO_HD')]);
    setData([...tempData]);
  };

  const handleEditTableRow = (item: API.ITEMBK): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.SO_HD === tempData[i].SO_HD) {
        tempData[i] = item;
      }
    }
    setData(tempData);
  };

  const handleCopyTableRow = (item: API.ITEMBK): void => {
    const tempData = [item, ...data];
    setData([...tempData]);
  };

  const tongGiaTri = useMemo(
    () =>
      numeral(sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(get(item, 'SUM_AMOUNT') || 0))).format(
        '0,0',
      ),
    [data],
  );

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
      },
      {
        Header: t('Trạng thái'),
        accessor: 'ITEM_NO',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const thisStatus = get(row, 'original.ITEM_NO', 0);
          return <BadgeFicoBangKeStatus status={thisStatus} />;
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
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisValue = numeral(get(row, 'original.TAX', '0')).format('0,0');
          return <>{thisValue}</>;
        },
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
        Header: t('Link URL'),
        accessor: 'URL',
      },
      {
        Header: t('Quản trị'),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const handleChangeFile = (workbook: WorkBook): void => {
    const firstSheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
    setData(map(sheetData, transformXlsxRowToBangKeItem));
  };

  const handleLuuBangKeSuccess = (data: API.ZFI003Response): void => {
    dispatch(replace(generatePath(routesMap.CHI_TIET_BANG_KE, { idBangKe: get(data, 'MT_CRBK_RECEIVER.BK_ID') })));
  };

  const handleNopBangKeSuccess = (): void => {
    delay(() => dispatch(goBack()), 2000);
  };

  const items = useMemo(() => data.filter(item => !item.IS_GROUP_DATA_TABLE), [data]);

  const renderFirstControllers = (): JSX.Element => (
    <>
      <a color="primary" className="btn btn-primary" href="/templates/SAP_FICO_Temp CPTX_v0.1.xlsx" download>
        <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExcelWhite.svg'} />
        {t('Lấy file mẫu')}
      </a>
      <ButtonLuuBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(items)}
        items={items}
        onSuccess={handleLuuBangKeSuccess}
      />
      <ButtonNopBangKe className="ml-2" date={monthYear} items={items} onSuccess={handleNopBangKeSuccess} />
    </>
  );

  const [monthYear, setMonthYear] = useState<Date>(new Date());
  function handleChangeMonthYear(date: Date): void {
    setMonthYear(date);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3}>
          <ReactDatePicker
            className="form-control"
            dateFormat="MM/yyyy"
            onChange={handleChangeMonthYear}
            selected={monthYear}
            showMonthYearPicker
          />
        </Col>
      </Row>
    </div>
  );

  const renderThongTinBangKe = (): JSX.Element => (
    <Row>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span className="text-bold">-</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>
            <BadgeFicoBangKeStatus status={0} />
          </span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          <span className="text-bold">{moment(monthYear).format('MM/YYYY')}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Người tạo')}:</div>
          <span className="text-bold">{useId}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Đơn vị')}:</div>
          <span className="text-bold">{maBP}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Tổng giá trị')}:</div>
          <span className="text-bold">{tongGiaTri} đ</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Ngày tạo')}:</div>
          <span className="text-bold">{moment().format('DD/MM/YYYY')}</span>
        </div>
      </Col>
    </Row>
  );

  function handleSubmit(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ KHOAN_MUC: item.km_text, IS_GROUP_DATA_TABLE: true });
    });
    setData(nextState);
  }

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} />
      <ThemMoiKhoanMuc handleSubmit={handleSubmit} />
    </>
  );

  function handleSubmitThemMoiChiPhi(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return <ThemMoiChiPhi index={index} handleSubmit={handleSubmitThemMoiChiPhi} rows={rows} />;
  };

  const renderUtilityDropDown = (row: TableRow<API.RowMTZTMI047OUT>, index: number): JSX.Element => {
    return (
      <UtilityDropDown
        removeTableRow={handleRemoveTableRow}
        editTableRow={handleEditTableRow}
        copyTableRow={handleCopyTableRow}
        item={row.original}
        index={index}
      />
    );
  };

  return (
    <>
      <Row className="mb-3">
        <div className="d-flex sipTitle">
          <ButtonGoBack />
          <h4>{t('Tạo mới bảng kê')}</h4>
        </div>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>{renderFilters()}</Col>
      </Row>

      <div className="bg-white p-3 shadow-sm mb-4">{renderThongTinBangKe()}</div>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>
      </Row>

      <div className="sipTableContainerAmountListContainer">
        <div className="sipTableContainer sipTableContainerAmountList">
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

export default TaoMoiBangKe;
