/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import NoData from 'components/NoData';
import Pagination from 'components/Pagination';
import { get, isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { Cell } from 'react-table';
// import { numberFormat } from 'utils/common';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import ExportExcelWithTemplate from 'components/Button/ExportExcelWithTemplate';
import Typeahead from 'components/Input/Typeahead';
import DetailCODChuaChot from './DetailCODChuaChot';

import options from './data';

const Index: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const refDetaiBangKeCod = useRef<null | HTMLDivElement>(null);
  const [hideDetail, setHideDetail] = useState<boolean>(false);
  const [colorButton, setColorButton] = useState<number>();
  const [typeSearch, setTypeSearch] = useState<string>('');
  const [selected, setSelected] = useState<TypeaheadOption[]>();
  const data = useSelector(select_COD_Chua_Chot);
  const dispatch = useDispatch();

  const setHideDetailBangkeCod = (): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect((): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });

  // const renderTemplate1 = (workbook: any, tempList: any, index: number): void => {
  //   const BK_ID = 'BK_TEST';
  //   workbook.cloneSheet(workbook.sheet(0), `${BK_ID}`);
  //   workbook
  //     .sheet('Sheet1')
  //     .cell('A1')
  //     .value('This is neat!');
  //   // renderHeader(workbook.sheet(`${BK_ID}`), headerInfo, '1A', '55S');
  //   console.log(tempList);
  //   let flagIndex = 16;
  //   for (const itemKey in tempList) {
  //     // workbook
  //     //   .sheet(`${BK_ID}`)
  //     //   .range(`A${flagIndex}:R${flagIndex}`)
  //     //   .merged(true)
  //     //   .value(`${get(tempList[itemKey].items[0], 'KHOAN_MUC', '')}-${get(tempList[itemKey].items[0], 'TEN_KM')}`)
  //     //   .style({
  //     //     borderStyle: 'thin',
  //     //     borderColor: '#000000',
  //     //     horizontalAlignment: 'left',
  //     //     fontFamily: 'Times New Roman',
  //     //     bold: true,
  //     //     fontSize: 11,
  //     //   });
  //     flagIndex++;
  //     for (let i = 0; i < size(tempList[itemKey].items); i++) {
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`A${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'LINE_ITEM', '')}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`B${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'KIHIEU_HD', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`C${flagIndex + i}`)
  //         .value(`${moment(get(tempList[itemKey].items[i], 'NGAY_HD', ''), 'YYYYMMDD').format('DD/MM/YYYY')}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`D${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'SO_HD', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`E${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'NGUOI_BAN', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`F${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'MST', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`G${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'DESCR', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000', wrapText: true });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`H${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'AMOUNT_INIT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`I${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'PHU_PHI_INIT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000', shrinkToFit: true });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`J${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'TAX_INIT', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`K${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'TAX_AMOUNT_INIT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`L${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'SUM_AMOUNT_INIT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`M${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'AMOUNT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`N${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'PHU_PHI', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`O${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'TAX_AMOUNT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`P${flagIndex + i}`)
  //         .value(`${numberFormat(get(tempList[itemKey].items[i], 'SUM_AMOUNT', '')) || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //       workbook
  //         .sheet(`${BK_ID}`)
  //         .cell(`R${flagIndex + i}`)
  //         .value(`${get(tempList[itemKey].items[i], 'NOTE', '') || ''}`)
  //         .style({ borderStyle: 'thin', borderColor: '#000000' });
  //     }
  //     flagIndex = flagIndex + size(tempList[itemKey].items) + 1;
  //   }
  // };
  function handleData(workbook: any): void {
    workbook
      .sheet('Sheet1')
      .cell('A16')
      .value('This is neat!');
    // for (let i = size(data) - 1, j = 0; i >= 0; i--, j++) {
    //   handlePrintBangKe(data[i], workbook, j);
    // }
    // workbook.deleteSheet(SHEET_0);
    // workbook.deleteSheet(SHEET_1);
  }

  console.log(window.location.origin);

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Bưu cục'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Bưu tá'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày cấn trừ CN'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Tiền phải nộp'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <ExportExcelWithTemplate
                handleData={handleData}
                urlTemplate={`${window.location.origin}/CPTX-template.xlsx`}
                fileName={`bang_ke_CPTX.xlsx`}
                disabled={false}
              >
                <img alt="VTPostek" className="mr-2" src={'../../../../assets/img/icon/iconExport.svg'} />
              </ExportExcelWithTemplate>
              <Button
                onClick={printBangKe(row.original)}
                title={t('Sửa')}
                color={Number(row.original.id) === colorButton ? 'info' : 'primary'}
              >
                Chi tiết
              </Button>
            </>
          );
        },
      },
    ],
    [colorButton],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    console.log(selectedItem);
  };

  function printBangKe(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setHideDetail(!hideDetail);
      setHideDetailBangkeCod();
      setColorButton(Number(bangKe.id));
      // console.dir(event.currentTarget);
      // event.currentTarget.setAttribute('disabled', 'true');
      // dispatch(
      //   action_DETAIL_THU_TIEN({
      //     id: bangKe.id,
      //   }),
      // );
    };
  }

  const data_input = useMemo(
    () => [
      {
        _id: 'a1G23e25vaus6DVa7Sv',
        volume: 'Nam Từ Liêm',
        name: 'huyaaa',
      },
      {
        _id: 'e1D23f25s6ASa7saA',
        volume: 'giảng võ',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaus6ASaaA',
        volume: 'đống đa',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaádus6ASaaA',
        volume: 'Cầu giấy',
        name: 'huyaaaádasds',
      },
    ],
    [],
  );

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      console.log(event.currentTarget.value);
    };
  };

  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }

  const filterByFields = ['label'];

  useEffect((): void => {
    dispatch(action_CHECK_COD_CHUA_CHOT());
    // getdata();
  }, []);
  return (
    <>
      <Row className="mb-3 sipContentContainer">
        <Col lg={3} xs={12} className="mr-2">
          <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
            <option value="">{t('Tất cả các bưu cục')}</option>
            {map(
              data_input,
              (item: CODCHUACHOT, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.volume || undefined}>
                    {item.volume}
                  </option>
                );
              },
            )}
          </Input>
        </Col>
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Typeahead
                id="selectService"
                filterBy={filterByFields}
                labelKey={renderLabelKey}
                onChange={setSelects}
                options={map(options)}
                placeholder="Nhập bưu tá cần tìm"
                selected={selected}
              />
            </div>
            <Button color="primary" className="ml-2 btn btn-primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>1</span>
          </p>
        </Col>
      </Row>
      <Row className="mb-3 sipTableContainer sipTableRowClickable">
        {data && !isEmpty(data) ? (
          <>
            <DataTable columns={columns} data={data} showCheckboxes renderCheckboxValues={'id'} />
            <Row className="mb-3" style={{ paddingRight: 15, marginTop: 15 }}>
              <Col lg={4} xs={12} className="p-0"></Col>
              <Col style={{ paddingRight: 4 }}>
                <div className="text-right">
                  <Button color="primary" size="lg" className="">
                    {t('+ Chốt tạo bảng kê')}
                  </Button>
                </div>
              </Col>
              <div className="mb-3"></div>
            </Row>
          </>
        ) : (
          ''
        )}
        {data && !isEmpty(data) ? (
          <Pagination
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
            initialPage={10}
            pageCount={5}
            onThisPaginationChange={onPaginationChange}
          />
        ) : (
          ''
        )}
        {isEmpty(data) && <NoData />}
      </Row>
      {hideDetail === true ? (
        <div className="mb-3 sipTableContainer sipTableRowClickable row" ref={refDetaiBangKeCod}>
          <DetailCODChuaChot />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Index;
