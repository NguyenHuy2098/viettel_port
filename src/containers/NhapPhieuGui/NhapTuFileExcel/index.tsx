import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Button, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import XLSX, { WorkBook } from 'xlsx';
import { map, size, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toastError } from 'components/Toast';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import { transformXlsxRowToTaoDonItem, validateXlsxNhapDon } from 'utils/common';
import DonHopLe from './DonHopLe';

// eslint-disable-next-line max-lines-per-function
const InputRevenue: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [checkedValues, setcheckedValues] = useState<string[]>([]);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  function downloadFile(): void {
    window.location.href = '../../templates/VTP_MAU_EXCEL_V1.11.xlsx';
  }
  const handleChangeFile = (workbook: WorkBook): void => {
    const firstSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[firstSheetName];
    if (validateXlsxNhapDon(workSheet)) {
      const sheetData = XLSX.utils.sheet_to_json(workSheet, { range: 6 });
      const listData = map(
        sheetData.filter(item => {
          return get(item, 'Tên người nhận (*)', '') !== '';
        }),
      );
      // let isValidAllField = true;
      // for (let i = 0; i < sheetData.length; i++) {
      //   if (!validateBKRowTaoDon(sheetData[i])) {
      //     isValidAllField = false;
      //   }
      // }
      //if (isValidAllField) {
      setData(map(listData, transformXlsxRowToTaoDonItem));
      // }
    } else {
      toastError(t('File tải lên không đúng format. Vui lòng tải file mẫu.'));
    }
  };
  function getDataFormImport(checkedValues: string[]): void {
    setcheckedValues(checkedValues);
  }
  function createData(): void {
    const payload: ImportDataType[] = [];
    map(checkedValues, (item: string): void => {
      const dataPayload = data.find((item1: ImportDataType) => item1.STT.toString() === item);
      payload.push(dataPayload);
    });
  }
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Nhập từ file excel</h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={downloadFile}>
            <i className="fa fa-file-excel-o mr-2" />
            Lấy file mẫu
          </Button>
          <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} shouldConfirm={size(data) > 0} />
          <Button className="ml-2" color="primary" onClick={createData}>
            <i className="fa fa-pencil mr-2" />
            Tạo đơn
          </Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              Upload File
              {/* <Badge color="primary">01</Badge> */}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Lịch sử tải lên')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <DonHopLe data={data} getDataFormImport={getDataFormImport} />
          </TabPane>
          <TabPane tabId={2}>tab 2</TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default InputRevenue;
