import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { Badge, Button, Row } from 'reactstrap';
import XLSX, { WorkBook } from 'xlsx';
import { map, size, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toastError } from 'components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import { action_IMPORT_EXCEL } from 'redux/ImportExcelFile/actions';
import { toast } from 'react-toastify';
import TabView from 'components/Tab/TabView';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFileTaoDon';
import { transformXlsxRowToTaoDonItem, validateXlsxNhapDon } from 'utils/common';
import DonHopLe from './DonHopLe';
import LichSuTaiFile from './LichSuTaiFile';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}
// eslint-disable-next-line max-lines-per-function
const InputRevenue: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [tab, setTab] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>([]);
  const [checkedValues, setcheckedValues] = useState<string[]>([]);
  const [resetCheckbox, setResetCheckbox] = useState<boolean>(false);
  const [infoPostOffice, setInfoPostOffice] = useState<API.RowMTZTMI045OUT>({});
  const [countData, setCountData] = useState<number>(0);
  const getLocation = get(props, 'location.search', '');
  const userMaBp = useSelector(makeSelectorBPOrg);
  const getInfoOffice = (): void => {
    dispatch(
      action_MIOA_ZTMI045(
        {
          row: [
            {
              IV_LOCTYPE: 'V001',
            },
          ],
          IV_BP: userMaBp,
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '2000',
        },
        {
          onSuccess: (data: API.MIOAZTMI045Response): void => {
            setInfoPostOffice(get(data, 'MT_ZTMI045_OUT.Row.0', {}));
          },
        },
      ),
    );
  };

  useEffect((): void => {
    getInfoOffice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function downloadFile(): void {
    window.location.href = '../../templates/VTP_MAU_EXCEL_V1.11.xlsx';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFile = (workbook: WorkBook, infoExcel: any): void => {
    const firstSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[firstSheetName];
    if (validateXlsxNhapDon(workSheet)) {
      const sheetData = XLSX.utils.sheet_to_json(workSheet, { range: 6 });
      const listData = map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sheetData.filter((item: any) => {
          item.FileName = infoExcel.fileName;
          item.Id = infoExcel.id;
          item.DISTRICT_SRC = get(infoPostOffice, 'DISTRICT', '');
          item.CITY_SRC = get(infoPostOffice, 'CITY', '');
          item.COUNTRY_SRC = get(infoPostOffice, 'COUNTRY', '');
          item.POSTOFFICE = get(infoPostOffice, 'LOCNO', '');
          item.STREET_SRC = get(infoPostOffice, 'STREET', '');
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

  function updateCountData(count: number): void {
    setCountData(count);
  }
  function getDataFormImport(checkedValues: string[]): void {
    setcheckedValues(checkedValues);
  }
  function createData(): void {
    const payload: ImportDataType[] = [];
    map(checkedValues, (item: string): void => {
      const dataPayload = data.find((item1: ImportDataType) => item1.STT.toString() === item);
      payload.push(dataPayload);
    });
    setResetCheckbox(!resetCheckbox);
    let payloadImport = [];
    for (let index = 0; index < payload.length; index++) {
      payloadImport.push(payload[index]);
      if (payloadImport.length === Math.round(payload.length / 4) + 1 || index === payload.length - 1) {
        dispatch(
          action_IMPORT_EXCEL(payloadImport, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: (data: any): void => {
              if (index === payload.length - 1)
                toast(
                  <>
                    <i className="fa fa-window-close-o mr-2" />
                    {t('Đang tạo đơn')}
                  </>,
                  {
                    type: 'warning',
                  },
                );
            },
          }),
        );
        payloadImport = [];
      }
    }
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
          <Button className="ml-2" color="primary" onClick={createData} disabled={size(checkedValues) === 0}>
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
        <TabView
          navs={[
            {
              children: <>{t('Upload File')}</>,
            },
            {
              children: (
                <>
                  {t('Lịch sử tải lên')}
                  <Badge color="primary">{countData}</Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <DonHopLe data={data} getDataFormImport={getDataFormImport} resetCheckbox={resetCheckbox} />,
            },
            {
              children: <LichSuTaiFile updateCount={updateCountData} getTab={getLocation} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default InputRevenue;
