import React, { useMemo } from 'react';
import { Button, Row, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaNhanTaiKien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyến thư'),
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const data = [
    {
      TOR_ID: 1234,
      FR_LOG_ID: 'abc',
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      GRO_WEI_VAL: 1200,
      CREATED_ON: '12/12/2019',
    },
    {
      TOR_ID: 42365,
      FR_LOG_ID: 'yut',
      TO_LOG_ID: 'adff',
      countChuyenThu: 12,
      GRO_WEI_VAL: 2500,
      CREATED_ON: '12/12/2019',
    },
  ];

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm chuyến thư')} />
            </div>
            <Button className="ml-2" color="primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Row>
      </div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default ChuyenThuChuaNhanTaiKien;
