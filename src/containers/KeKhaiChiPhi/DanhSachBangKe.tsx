import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';
import { Button, Input, Row, Label } from 'reactstrap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import ButtonPrintable from '../../components/Button/ButtonPrintable';
import PrintBangKeChiTiet from '../../components/Printable/PrintBangKeChiTiet';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
function DanhSachBangKe(props: Props): JSX.Element {
  const { t } = useTranslation();

  function renderTopController(): JSX.Element {
    return (
      <>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
          {t('Xuất file Excel')}
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
          {t('In bảng kê')}
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
          {t('Thêm mới')}
        </Button>
      </>
    );
  }

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bưu gửi của bảng kê'),
      }}
    />
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã bảng kê'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Loại'),
        accessor: 'TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              {renderPrintButton('')}
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Kê khai chi phí thường xuyên')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>

      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã bưu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>

      <Row className="sipTableContainer">
        <DataTable columns={columns} data={[]} />
      </Row>
    </>
  );
}

export default DanhSachBangKe;
