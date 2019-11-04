import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Col, Row } from 'reactstrap';
import { generatePath } from 'react-router';
import { goBack, replace } from 'connected-react-router';
import { delay, get, isEmpty, map, reject, size, slice, join, toString, includes } from 'lodash';
import produce from 'immer';
import moment from 'moment';
import XLSX, { WorkBook } from 'xlsx';

import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import DataTable from 'components/DataTable/Grouped';
import { toastError } from 'components/Toast';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { numberFormat, transformXlsxRowToBangKeItem, validateXlsxBangKe } from 'utils/common';
import routesMap from 'utils/routesMap';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import UtilityDropDown from '../UtilityDropDown';
import TopThongTinBangKe from '../TopThongTinBangKe';

interface DataType extends API.ITEMBK {
  IS_GROUP_DATA_TABLE?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataType[]>([]);
  const [deleteData, setDeleteData] = useState<DataType[]>([]);

  const { t } = useTranslation();

  const handleRemoveTableRow = (item: API.ITEMBK, index: number): void => {
    const tempData = reject(data, ['LINE_ITEM', get(item, 'LINE_ITEM')]);
    if (!includes(item.LINE_ITEM, 'CG')) {
      setDeleteData([...deleteData, item]);
    }
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
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDescr = get(row, 'original.DESCR', '0');
          const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
          return <span title={thisDescr}>{thisText}</span>;
        },
      },
      {
        Header: t('Giá chưa thuế (VND)'),
        accessor: 'AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.AMOUNT'));
        },
      },
      {
        Header: t('Phụ phí (VND)'),
        accessor: 'PHU_PHI',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.PHU_PHI'));
        },
      },
      {
        Header: t('TS'),
        accessor: 'TAX',
      },
      {
        Header: t('Thuế GTGT (VND)'),
        accessor: 'TAX_AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.TAX_AMOUNT'));
        },
      },
      {
        Header: t('Tổng (VND)'),
        accessor: 'SUM_AMOUNT',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): string => {
          return numberFormat(get(row, 'original.SUM_AMOUNT'));
        },
      },
      {
        Header: t('Link URL'),
        accessor: 'URL',
        Cell: ({ row }: Cell<API.ListMTBKRECEIVER>): JSX.Element => {
          const thisDescr = get(row, 'original.URL', '0');
          const thisText = size(thisDescr) < 80 ? thisDescr : `${join(slice(thisDescr, 0, 85), '')}...`;
          return <span title={thisDescr}>{thisText}</span>;
        },
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
    const workSheet = workbook.Sheets[firstSheetName];

    if (validateXlsxBangKe(workSheet)) {
      const sheetData = XLSX.utils.sheet_to_json(workSheet);
      setData(map(sheetData, transformXlsxRowToBangKeItem));
    } else {
      toastError(t('File tải lên không đúng format. Vui lòng tải file mẫu.'));
    }
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
      <a color="primary" className="btn btn-primary" href="/templates/SAP_FICO_Temp CPTX.xlsx" download>
        <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExcelWhite.svg'} />
        {t('Lấy file mẫu')}
      </a>
      <ButtonLuuBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(items)}
        items={items}
        onSuccess={handleLuuBangKeSuccess}
        deleteItems={deleteData}
      />
      <ButtonNopBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(items)}
        items={items}
        onSuccess={handleNopBangKeSuccess}
      />
    </>
  );

  const [monthYear, setMonthYear] = useState<Date>(new Date());
  function handleChangeMonthYear(date: Date): void {
    setMonthYear(date);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={6}>
          <ReactDatePicker
            className="form-control"
            dateFormat="MM/yyyy"
            onChange={handleChangeMonthYear}
            selected={monthYear}
            showMonthYearPicker
          />
        </Col>
        <Col xs={12} md={6} className="text-right">
          <span>Tổng cộng: {size(items)}</span>
        </Col>
      </Row>
    </div>
  );

  function handleSubmit(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ KHOAN_MUC: item.km_id, TEN_KM: item.km_text, IS_GROUP_DATA_TABLE: true });
    });
    setData(nextState);
  }

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} isConfirm={size(data) > 0} />
      <ThemMoiKhoanMuc handleSubmit={handleSubmit} />
    </>
  );

  function handleSubmitThemMoiChiPhi(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[]): JSX.Element => {
    return <ThemMoiChiPhi handleSubmit={handleSubmitThemMoiChiPhi} rows={rows} status={0} />;
  };

  const renderUtilityDropDown = (row: TableRow<API.LISTMTDETAILRECEIVER>, index: number): JSX.Element => {
    return (
      <UtilityDropDown
        removeTableRow={handleRemoveTableRow}
        editTableRow={handleEditTableRow}
        copyTableRow={handleCopyTableRow}
        item={row.original}
        khoanMuc={toString(index)}
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

      <div className="bg-white p-3 shadow-sm mb-4">
        <TopThongTinBangKe isCreateNew={true} data={data} period={moment(monthYear).format('MM/YYYY')} />
      </div>

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
