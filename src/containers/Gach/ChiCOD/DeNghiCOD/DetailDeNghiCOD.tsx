/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination/PaginationCustom';
import NoData from 'components/NoData';

interface Props {
  toggle: () => void;
  handleDeleteItem: (torId: string) => void;
}

const DetailDeNghiCOD = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [resetCheckbox, setResetCheckbox] = useState<boolean>(false);

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
        Header: t('Ngày phát TC'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Dịch vụ Viettel'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Tiền COD'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Phải trả'),
        accessor: 'chenh_lech_cuoc',
      },
    ],
    [],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  const resetCheckValue = (): void => {
    setResetCheckbox(!resetCheckbox);
  };

  const Delete = (torId: string): void => {
    props.handleDeleteItem(torId);
  };

  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết đề nghị chi DNC-012412414241</h1>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
      </Row>
      <Row xs="4" className="sipContentContainer sipTableRowClickable">
        <Col xs="6">{`Ngân hàng: ${t('MB')}`}</Col>
        <Col xs="6">
          <div style={{ float: 'right' }}>
            <Button color="success" className="ml-2" onClick={props.toggle}>
              {t('Thêm mới vẫn đơn +')}
            </Button>
            <Button color="warning" className="ml-2" onClick={() => resetCheckValue()}>
              {t('Loại bỏ bill chọn')}
            </Button>
            <Button color="danger" className="ml-2" onClick={() => Delete('1')}>
              {t('Xoá bảng kê')}
            </Button>
          </div>
        </Col>
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <DataTable
            columns={columns}
            data={listPhanCongNhan}
            showCheckboxes
            renderCheckboxValues={'id'}
            resetCheckbox={resetCheckbox}
          />
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
          />
        ) : (
          ''
        )}
      </Row>
      {isEmpty(listPhanCongNhan) && <NoData />}
    </>
  );
};

export default DetailDeNghiCOD;
