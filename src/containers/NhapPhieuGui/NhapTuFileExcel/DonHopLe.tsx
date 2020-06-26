/* eslint-disable max-lines */
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Input, Button, Progress } from 'reactstrap';
import { Typeahead as RootTypeahead } from 'react-bootstrap-typeahead';
import DataTable from 'components/DataTable/TaoDonExcelTable';
import { action_VALIDATE_IMPORT } from 'redux/ValidateImport/actions';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'components/Pagination/PaginationExcel';
import useIsMounted from 'react-is-mounted-hook';
import { makeSelectorBPOrg, makeSelectorBPCode } from 'redux/GetProfileByUsername/selectors';
import { map, get, findIndex } from 'lodash';
import { numberFormat, getValueOfNumberFormat } from 'utils/common';
import { nhomHangHoaList, loaiHangHoaList, nguoiTraCuocList } from './LoaiHangHoa';

interface Props {
  data: ImportDataType[];
  getDataFormImport: (checkedValues: string[]) => void;
  resetCheckbox?: boolean;
}
// eslint-disable-next-line max-lines-per-function
const DonHopLe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();
  const { data, getDataFormImport } = props;
  const [dataTable, setDataTable] = useState<ImportDataType[]>([]);
  const [countValidate, setCountValidate] = useState<number>(0);
  const [countValidateSuccess, setCountValidateSuccess] = useState<number>(0);
  const [goodValue, setGoodValue] = useState<string>('0');
  const [cOD, setCOD] = useState<string>('0');
  const [weight, setWeight] = useState<string>('0');
  const [tenNguoiNhan, setTenNguoiNhan] = useState<string>('');
  const [nguoiTraCuoc, setNguoiTraCuoc] = useState<string>('');
  const [sdtNguoiNhan, setSdtNguoiNhan] = useState<string>('');
  const [diaChiNguoiNhan, setDiaChiNguoiNhan] = useState<string>('');
  const [nhomHangHoa, setNhomHangHoa] = useState<string>('');
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('');
  const [tenHangHoa, setTenHangHoa] = useState<string>('');
  const [indexObj, setIndexObj] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(1);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const userMaBp = useSelector(makeSelectorBPOrg);
  const BPCode = useSelector(makeSelectorBPCode);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function validateDate(dataV: ImportDataType[]) {
    let count = 0;
    let countSuccess = 0;
    let dataValidate: ImportDataType[] = [];
    if (data.filter(item => item.STATUS === 'ERROR').length > 0) {
      dataValidate = map(dataTable, (item: ImportDataType) => {
        if (item.STATUS === 'ERROR') {
          item.STATUS = 'LOADING...';
          item.errorMes = '';
        }
        return item;
      });
      setDataTable(dataValidate);
    }
    dispatch(
      action_VALIDATE_IMPORT(dataV, {
        onSuccess: (dataObj: ImportDataType[]): void => {
          if (!isMounted()) return;
          dataValidate = map(data, (item: ImportDataType) => {
            const index = findIndex(dataObj, (item1: ImportDataType) => item1.STT === item.STT);
            if (item.STT === get(dataObj[index], 'STT', '')) {
              item.STATUS = dataObj[index].STATUS.toString() === '1' ? 'OK' : 'ERROR';
              item.errorMes = dataObj[index].errorMes;
              item.AMOUNT_ITEM = dataObj[index].AMOUNT_ITEM;
              item.ADDRESS_OP = dataObj[index].ADDRESS_OP;
              item.ADDRESS_SHIPPER = dataObj[index].ADDRESS_SHIPPER;
              item.PHONE_OP = dataObj[index].PHONE_OP;
              item.PHONE_SHIPPER = dataObj[index].PHONE_SHIPPER;
              item.TEL_SRC = dataObj[index].TEL_SRC;
              item.NAME_OP = dataObj[index].NAME_OP;
              item.NAME_SHIPPER = dataObj[index].NAME_SHIPPER;
              item.SHIPPER = dataObj[index].SHIPPER;
              item.ORDERING_PARTY = dataObj[index].ORDERING_PARTY;
            }
            if (item.STATUS !== 'LOADING...') {
              count++;
            }
            if (item.STATUS === 'OK') {
              countSuccess++;
            }
            return item;
          });
          setCountValidate(count);
          setCountValidateSuccess(countSuccess);
          setDataTable(dataValidate);
        },
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function validate() {
    if (data.length > 0) {
      if (data.filter(item => item.STATUS === 'ERROR').length > 0) setCountValidate(countValidateSuccess);
      let dataValidate = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index].STATUS !== 'OK') {
          data[index].BPCode = BPCode;
          data[index].POSTOFFICE = userMaBp;
          data[index].TOTAL_ORDER = data.length;
          dataValidate.push(data[index]);
          if (dataValidate.length === 10 || index === data.length - 1) {
            validateDate(dataValidate);
            dataValidate = [];
          }
        }
      }
    }
  }
  function handleChangeTypeaheadValue(
    setValueFunction: Function,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any,
  ): (items: TypeaheadOption[]) => void {
    return (items: TypeaheadOption[]): void => {
      setValueFunction(get(items, `0.id`, ''));
      setIndexObj(get(row, 'original.STT', ''));
      // row.original.ITEM[0].NGUOI_TRA_CUOC = get(items, '0.label', '');
    };
  }

  function handleChangeTextboxValue(
    setValueFunction: Function,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any,
  ): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      setIndexObj(get(row, 'original.STT', ''));
    };
  }

  React.useEffect((): void => {
    let size = 0;
    if (data.length % 10 !== 0) size = Math.floor(data.length / 10) + 1;
    else size = Math.floor(data.length / 10);
    setPageSize(size);
    setDataTable(data);
    setCountValidateSuccess(0);
    setCountValidate(0);
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].GOODS_VALUE = goodValue;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodValue]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].COD = cOD;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cOD]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].GROSS_WEIGHT = weight;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.FREIGH_TERM = nguoiTraCuoc;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nguoiTraCuoc]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.NAME_CONSIG = tenNguoiNhan;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenNguoiNhan]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.PHONE_CONSIG = sdtNguoiNhan;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdtNguoiNhan]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ADDRESS_CONSIG = diaChiNguoiNhan;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaChiNguoiNhan]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].COMMODITY_TYPE = nhomHangHoa;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nhomHangHoa]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].COMMODITY_CODE = loaiHangHoa;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaiHangHoa]);

  React.useEffect((): void => {
    const dataValidate = map(dataTable, (item: ImportDataType) => {
      if (item.STT === indexObj) item.ITEM[0].Description = tenHangHoa;
      return item;
    });
    setDataTable(dataValidate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenHangHoa]);

  function onChangeCheckBox(checkedValues: string[]): void {
    getDataFormImport(checkedValues);
  }

  const filterByFields = ['label'];

  const filterByCallback = (): boolean => {
    return true;
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('STT'),
        accessor: 'STT',
      },
      {
        Header: t('Lỗi'),
        accessor: 'errorMes',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'STATUS',
      },
      {
        Header: t('Mã khách hàng'),
        accessor: 'CONSIGNEE',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const Consignee = get(row, 'original.CONSIGNEE', '');
          return <>{Consignee === '9999999999' ? '' : Consignee}</>;
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'FWO',
      },
      {
        Header: t('Tổng cước'),
        accessor: 'AMOUNT_ITEM',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const AmountItem = get(row, 'original.AMOUNT_ITEM', '');
          return <>{AmountItem ? numberFormat(AmountItem.toString()) : ''}</>;
        },
      },
      {
        Header: t('COD'),
        accessor: 'ITEM[0].COD',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const COD = get(row, 'original.ITEM[0].COD', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={numberFormat(getValueOfNumberFormat(COD))}
              onChange={handleChangeTextboxValue(setCOD, row)}
            />
          );
        },
      },
      {
        Header: t('Giá trị'),
        accessor: 'ITEM[0].GOODS_VALUE',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const GoodValue = get(row, 'original.ITEM[0].GOODS_VALUE', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={numberFormat(getValueOfNumberFormat(GoodValue))}
              onChange={handleChangeTextboxValue(setGoodValue, row)}
            />
          );
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'ITEM[0].GROSS_WEIGHT',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const GrossWeight = get(row, 'original.ITEM[0].GROSS_WEIGHT', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={numberFormat(getValueOfNumberFormat(GrossWeight))}
              onChange={handleChangeTextboxValue(setWeight, row)}
            />
          );
        },
      },
      {
        Header: t('Người thanh toán cước'),
        accessor: 'NGUOI_TRA_CUOC',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const NguoiTraCuoc = get(row, 'original.NGUOI_TRA_CUOC', '');
          return (
            <div style={{ width: 'max-content' }}>
              <RootTypeahead
                id="nguoiTraCuoc"
                onChange={handleChangeTypeaheadValue(setNguoiTraCuoc, row)}
                options={nguoiTraCuocList}
                disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
                defaultSelected={nguoiTraCuocList.filter(item => {
                  return item.label === NguoiTraCuoc;
                })}
                filterBy={NguoiTraCuoc ? filterByCallback : filterByFields}
                positionFixed={true}
              />
            </div>
          );
        },
      },
      {
        Header: t('Tên người nhận'),
        accessor: 'NAME_CONSIG',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const TenNguoiNhan = get(row, 'original.NAME_CONSIG', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={TenNguoiNhan}
              onChange={handleChangeTextboxValue(setTenNguoiNhan, row)}
            />
          );
        },
      },
      {
        Header: t('Sđt người nhận'),
        accessor: 'PHONE_CONSIG',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const SdtNguoiNhan = get(row, 'original.PHONE_CONSIG', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={SdtNguoiNhan}
              onChange={handleChangeTextboxValue(setSdtNguoiNhan, row)}
            />
          );
        },
      },
      {
        Header: t('Địa chỉ người nhận'),
        accessor: 'ADDRESS_CONSIG',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const DcNguoiNhan = get(row, 'original.ADDRESS_CONSIG', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: '400px' }}
              value={DcNguoiNhan}
              onChange={handleChangeTextboxValue(setDiaChiNguoiNhan, row)}
            />
          );
        },
      },
      {
        Header: t('Nhóm hàng hóa'),
        accessor: 'ITEM[0].NHOM_HANG_HOA',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const NhomHangHoa = get(row, 'original.ITEM[0].NHOM_HANG_HOA', '');
          return (
            <RootTypeahead
              id="nhomHangHoa"
              onChange={handleChangeTypeaheadValue(setNhomHangHoa, row)}
              options={nhomHangHoaList}
              defaultSelected={nhomHangHoaList.filter(item => {
                return item.label === NhomHangHoa;
              })}
              filterBy={NhomHangHoa ? filterByCallback : filterByFields}
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              positionFixed={true}
            />
          );
        },
      },
      {
        Header: t('Loại hàng hóa'),
        accessor: 'ITEM[0].LOAI_HANG_HOA',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const LoaiHangHoa = get(row, 'original.ITEM[0].LOAI_HANG_HOA', '');
          return (
            <div style={{ width: 'max-content' }}>
              <RootTypeahead
                id="loaiHangHoa"
                onChange={handleChangeTypeaheadValue(setLoaiHangHoa, row)}
                options={loaiHangHoaList}
                disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
                defaultSelected={loaiHangHoaList.filter(item => {
                  return item.label === LoaiHangHoa;
                })}
                filterBy={LoaiHangHoa ? filterByCallback : filterByFields}
                positionFixed={true}
              />
            </div>
          );
        },
      },
      {
        Header: t('Tên hàng hóa'),
        accessor: 'ITEM[0].Description',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const TenHangHoa = get(row, 'original.ITEM[0].Description', '');
          return (
            <Input
              disabled={get(row, 'original.STATUS', '') !== 'ERROR'}
              style={{ minWidth: 'max-content' }}
              value={TenHangHoa}
              onChange={handleChangeTextboxValue(setTenHangHoa, row)}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const checkLoading = countValidate === data.length ? true : false;
  return (
    <>
      <Row className="sipContentContainer">
        {checkLoading ? (
          <Button className="ml-2" color="primary" onClick={validate}>
            <i className="fa fa-file-excel-o mr-2" />
            Validate
          </Button>
        ) : null}
        <Col>
          {!checkLoading && data.length > 0 ? (
            <div>
              <div className="text-center">
                {countValidate}/{data.length}
              </div>
              <Progress animated color="success" value={countValidate} max={data.length} />
            </div>
          ) : null}
          {checkLoading ? (
            <p className="text-right mt-2 mb-0">
              {t('Số đơn hợp lệ')}:{' '}
              <span className="color-primary">
                {countValidateSuccess}/{data.length}
              </span>
            </p>
          ) : null}
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable.filter(
            (item: ImportDataType) =>
              parseInt(item.STT) > pageCurrent * 10 - 10 && parseInt(item.STT) <= pageCurrent * 10,
          )}
          showCheckboxes={dataTable.length > 0 ? true : false}
          onCheckedValuesChange={onChangeCheckBox}
          renderCheckboxValues="STT"
          resetCheckbox={props.resetCheckbox}
          dataAll={dataTable}
        />
      </Row>
      <Pagination
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageSize}
        onGetPageCurrent={setPageCurrent}
      />
    </>
  );
};
export default DonHopLe;
