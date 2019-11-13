import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Row as TableRow } from 'react-table';
import { Col, Row } from 'reactstrap';
import { generatePath } from 'react-router';
import { goBack, replace } from 'connected-react-router';
import { concat, delay, find, get, includes, isEmpty, map, reject, size, toString, uniq } from 'lodash';
import produce from 'immer';
import moment from 'moment';
import XLSX, { WorkBook } from 'xlsx';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import DataTable from 'components/DataTable/Grouped';
import { toastError } from 'components/Toast';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { select_ZFI001_list } from 'redux/ZFI001/selectors';
import { transformXlsxRowToBangKeItem, validateBKRow, validateXlsxBangKe } from 'utils/common';
import routesMap from 'utils/routesMap';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import TopThongTinBangKe from '../TopThongTinBangKe';
import useColumns from './useColumns';
import UtilityDropDown from '../UtilityDropDown';

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const cols = useColumns();
  const dispatch = useDispatch();
  const listKhoanMuc = useSelector(select_ZFI001_list);
  const [data, setData] = useState<API.ITEMBK[]>([]);
  const [deleteData, setDeleteData] = useState<API.ITEMBK[]>([]);
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
      if (item.LINE_ITEM === tempData[i].LINE_ITEM) {
        tempData[i] = item;
      }
    }
    setData(tempData);
  };

  const handleCopyTableRow = (item: API.ITEMBK): void => {
    const tempData = [item, ...data];
    setData([...tempData]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => cols, [data]);

  const [manualGroupedKeys, setManualGroupedKeys] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const groupedKeys = useMemo(() => uniq(concat(manualGroupedKeys, map(data, 'KHOAN_MUC'))), [manualGroupedKeys, data]);

  const groupedKhoanMuc = useMemo(() => {
    if (isEmpty(listKhoanMuc)) return [];
    return map(groupedKeys, key => {
      const currentKhoanMuc = find(listKhoanMuc, { km_id: key });
      return {
        id: get(currentKhoanMuc, 'km_id') || '',
        name: get(currentKhoanMuc, 'km_text') || '',
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupedKeys, listKhoanMuc]);

  const handleChangeFile = (workbook: WorkBook): void => {
    const firstSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[firstSheetName];

    if (validateXlsxBangKe(workSheet)) {
      const sheetData = XLSX.utils.sheet_to_json(workSheet);
      let isValidAllField = true;
      for (let i = 0; i < sheetData.length; i++) {
        if (!validateBKRow(sheetData[i])) {
          isValidAllField = false;
        }
      }
      if (isValidAllField) {
        setData(map(sheetData, transformXlsxRowToBangKeItem));
      }
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

  const renderFirstControllers = (): JSX.Element => (
    <>
      <a color="primary" className="btn btn-primary" href="/templates/SAP_FICO_Temp CPTX.xlsx" download>
        <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExcelWhite.svg'} />
        {t('Lấy file mẫu')}
      </a>
      <ButtonLuuBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(data)}
        items={data}
        onSuccess={handleLuuBangKeSuccess}
        deleteItems={deleteData}
      />
      <ButtonNopBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(data)}
        items={data}
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
          <span>
            {t('Tổng cộng')}: {size(data)}
          </span>
        </Col>
      </Row>
    </div>
  );

  function handleSubmitKhoanMuc(item: API.LIST): void {
    setManualGroupedKeys(
      produce(manualGroupedKeys, draftState => {
        draftState.unshift(get(item, 'km_id', ''));
      }),
    );
  }

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} shouldConfirm={size(data) > 0} />
      <ThemMoiKhoanMuc handleSubmit={handleSubmitKhoanMuc} />
    </>
  );

  function handleSubmitThemMoiChiPhi(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[], groupId: string): JSX.Element => (
    <ThemMoiChiPhi
      handleSubmit={handleSubmitThemMoiChiPhi}
      khoanMuc={find(groupedKhoanMuc, { id: groupId }) || { id: '', name: '' }}
      rows={rows}
      status={0}
    />
  );

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
            preGroups={groupedKhoanMuc}
            renderGroupedRow={renderGroupedRow}
            renderUtilityDropDown={renderUtilityDropDown}
          />
        </div>
      </div>
    </>
  );
};

export default TaoMoiBangKe;
