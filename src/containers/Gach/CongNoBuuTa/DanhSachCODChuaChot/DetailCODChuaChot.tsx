/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination';
import NoData from 'components/NoData';

const DetailCODChuaChot = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Mã vận đơn'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày PTC'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Dịch vụ'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Loại vận đơn'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền đã thu'),
        accessor: 'tie_thuc_thu',
      },
      {
        Header: t('Tiền chênh lệch'),
        accessor: 'chenh_lech_cuoc',
      },
    ],
    [],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };
  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết vận đơn thu bưu tá : BKCPN-TN2-2104-1</h1>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
      </Row>
      <Row xs="4" className="sipContentContainer sipTableRowClickable">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="text" className="pl-4" placeholder={t('Nhập mã vận đơn cần tìm')}></Input>
            </div>
            <Button color="primary" className="ml-2 btn btn-primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
        ) : (
          ''
        )}
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <Pagination
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
            initialPage={10}
            pageCount={1}
            onThisPaginationChange={onPaginationChange}
            // buttonPaginationEdit={buttonPaginationEdit()}
          />
        ) : (
          ''
        )}
      </Row>
      {isEmpty(listPhanCongNhan) && <NoData />}
    </>
  );
};

export default DetailCODChuaChot;
