import * as React from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleBack = (): void => {
    dispatch(goBack());
  };
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          Danh sách phiếu gửi trong bảng kê
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button>
            <i className="fa fa-exchange" />
            Chuyển tải
          </Button>
          <Button>
            <i className="fa fa-shopping-bag" />
            Đóng tải
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">BK_1209_BNH</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">1400 g</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{t('Thư - Hỏa tốc')}: </Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row className="sipLine mt-3 mb-3" />
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã bảng kê phiếu gửi')} />
          </div>
          <Button color="primary" className="ml-2">
            {t('Quét mã')}
          </Button>
          <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
            <i className="fa fa-trash-o" />
          </Button>
        </div>
      </div>
    );
  }

  const data = [
    {
      TOR_ID: 4545,
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      WEIGHT: 1200,
      CREATED_ON: '12/12/2019',
      TYPE_OF: 'tải',
    },
    {
      TOR_ID: 4545,
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      WEIGHT: 1200,
      CREATED_ON: '12/12/2019',
      TYPE_OF: 'Note',
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: t('Mã BK/PG'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'WEIGHT',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Loại'),
        accessor: 'TYPE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
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
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};
export default DanhSachPhieuGuiTrongBangKe;
