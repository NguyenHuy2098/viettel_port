import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Row, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { goBack } from 'connected-react-router';

import DataTable from 'components/DataTable';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const renderTopController = (): JSX.Element => {
    return (
      <>
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
  };

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

  const handleBack = (): void => {
    dispatch(goBack());
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button className="sipTitleBtnBack" onClick={handleBack}>
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Tạo mới bảng kê')}
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
};

export default TaoMoiBangKe;
