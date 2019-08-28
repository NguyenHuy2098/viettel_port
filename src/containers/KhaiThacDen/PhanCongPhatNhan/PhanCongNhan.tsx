import React, { useMemo } from 'react';
import { Button, Row, Input, Label, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import ModalThemPhieuGui from './ModalThemPhieuGui';
import ModalChonNhanVien from './ModalChonNhanVien';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const data = [
    {
      TOR_ID: 4545,
      TO_LOCAL_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      MONEY: 1200,
      CREATED_ON: '12/12/2019',
      NOTE: 'Chả có gì',
      TYPE_OF: 'Kiện',
      STATUS: 'Chưa có',
    },
    {
      TOR_ID: 42365,
      TO_LOCAL_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      MONEY: 2500,
      CREATED_ON: '12/12/2019',
      NOTE: 'Chả có gì',
      TYPE_OF: 'Tải',
      STATUS: 'Chưa có',
    },
  ];
  const columns = useMemo(
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Label check>
                <Input type="checkbox" />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Địa chỉ phát'),
        accessor: 'TO_LOCAL_ID',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'MONEY',
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'STATUS',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="select" className="pl-4">
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value="ZDD">{t('Chọn nhân viên')}</option>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value="ZPP">{t('Nguyễn Văn A')}</option>
              </Input>
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>01</span>
          </p>
        </Col>
      </Row>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Danh sách phân công</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-print" />
            In phiếu phân công
          </Button>
          <ModalChonNhanVien />
          <ModalThemPhieuGui />
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default withRouter(PhanCongNhan);
