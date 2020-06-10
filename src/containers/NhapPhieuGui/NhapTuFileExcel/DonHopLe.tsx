import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable/TaoDonExcelTable';
import { action_VALIDATE_IMPORT } from 'redux/ValidateImport/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectorBPOrg, makeSelectorBPCode } from 'redux/GetProfileByUsername/selectors';

interface Props {
  data: ImportDataType[];
  getDataFormImport: (checkedValues: string[]) => void;
}
// eslint-disable-next-line max-lines-per-function
const DonHopLe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { data, getDataFormImport } = props;
  const [dataTable, setDataTable] = useState<ImportDataType[]>([]);
  const [countValidate, setCountValidate] = useState<number>(0);
  const userMaBp = useSelector(makeSelectorBPOrg);
  const BPCode = useSelector(makeSelectorBPCode);
  const dispatch = useDispatch();

  React.useEffect((): void => {
    if (data.length > 0) {
      setDataTable(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect((): void => {
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        data[index].BPCode = BPCode;
        data[index].POSTOFFICE = userMaBp;
        dispatch(
          action_VALIDATE_IMPORT(data[index], {
            onSuccess: (dataObj: ImportDataType): void => {
              data[index] = dataObj;
              setCountValidate(countValidate + 1);
            },
          }),
        );
      }
    }
    setDataTable(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable]);

  function onChangeCheckBox(checkedValues: string[]): void {
    getDataFormImport(checkedValues);
  }

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
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'FWO',
      },
      {
        Header: t('Tổng cước'),
        accessor: '',
      },
      {
        Header: t('COD'),
        accessor: 'ITEM[0].COD',
      },
      {
        Header: t('Giá trị'),
        accessor: 'ITEM[0].GOODS_VALUE',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'ITEM[0].GROSS_WEIGHT',
      },
      {
        Header: t('Người thanh toán cước'),
        accessor: 'NGUOI_TRA_CUOC',
      },
      {
        Header: t('Tên người nhận'),
        accessor: 'NAME_CONSIG',
      },
      {
        Header: t('Sđt người nhận'),
        accessor: 'PHONE_CONSIG',
      },
      {
        Header: t('Địa chỉ người nhận'),
        accessor: 'ADDRESS_OP',
      },
      {
        Header: t('Nhóm hàng hóa'),
        accessor: 'ITEM[0].NHOM_HANG_HOA',
      },
      {
        Header: t('Loại hàng hóa'),
        accessor: 'ITEM[0].LOAI_HANG_HOA',
      },
      {
        Header: t('Tên hàng hóa'),
        accessor: 'ITEM[0].Description',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" title="Validate">
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              {/* <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button> */}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // const data = [
  //   {
  //     TOR_ID: 4545,
  //     FR_LOG_ID: 'abc',
  //     TO_LOG_ID: 'bcd',
  //     countChuyenThu: 12,
  //     PERSONAL: 'Nguyen Thu Thuy',
  //     CREATED_ON: '12/12/2019',
  //     NOTE_OF: 'Note',
  //   },
  //   {
  //     TOR_ID: 4545,
  //     FR_LOG_ID: 'abc',
  //     TO_LOG_ID: 'bcd',
  //     countChuyenThu: 12,
  //     PERSONAL: 'Nguyen Thu Thuy',
  //     CREATED_ON: '12/12/2019',
  //     NOTE_OF: 'Note',
  //   },
  // ];
  return (
    <>
      <Row className="sipContentContainer">
        {/* <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col> */}
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Số đơn validate')}:{' '}
            <span className="color-primary">
              {countValidate}/{data.length}
            </span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable}
          showCheckboxes={dataTable.length > 0 ? true : false}
          onCheckedValuesChange={onChangeCheckBox}
          renderCheckboxValues="1"
        />
      </Row>
    </>
  );
};
export default DonHopLe;
