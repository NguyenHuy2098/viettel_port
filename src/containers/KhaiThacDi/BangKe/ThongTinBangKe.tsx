import React, { useMemo } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const ThongTinBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const data = [
    {
      TOR_ID: 42365,
      FR_LOG_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      GRO_WEI_VAL: 2500,
      CREATED_ON: '12/12/2019',
      NOTE_OF: 'Kcg',
    },
    {
      TOR_ID: 42365,
      FR_LOG_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      GRO_WEI_VAL: 2500,
      CREATED_ON: '12/12/2019',
      NOTE_OF: 'Kcg',
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: t('Số vận đơn'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
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
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
        </div>
      </Row>
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">BK_1209_BNH</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{t('Chuyển hoàn về bưu cục gốc')}: </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default ThongTinBangKe;
