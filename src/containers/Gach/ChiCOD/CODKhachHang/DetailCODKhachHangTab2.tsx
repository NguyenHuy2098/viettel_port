/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import Typeahead from 'components/Input/Typeahead';
import React, { useEffect, useMemo, useState } from 'react';
import NoData from 'components/NoData';
import { get, isEmpty, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination';
import { Button, Col, Row } from 'reactstrap';
import options from './data';

const DetailCODKhachHangTab2 = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [selected, setSelected] = useState<TypeaheadOption[]>();

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
        Header: t('Ngày tạo'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Kiểu thanh toán'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Dịch vụ'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Tiền công nợ'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Giảm giá TK'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Chênh lệch cước'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền thực thu'),
        accessor: 'chenh_lech_cuoc',
      },
    ],
    [],
  );

  const filterByFields = ['label'];
  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }
  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết vận đơn thu bưu tá : BKCPN-TN2-2104-1</h1>
        <div style={{ float: 'right' }}>
          <Button color="success" className="ml-2">
            {t('Thêm mới vẫn đơn +')}
          </Button>
          <Button color="warning" className="ml-2">
            {t('Loại bỏ bill chọn')}
          </Button>
          <Button color="danger" className="ml-2">
            {t('Xoá bảng kê')}
          </Button>
        </div>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
      </Row>
      <Row className="sipContentContainer sipTableRowClickable">
        <Col lg={4} xs={12}>
          <div>
            <Typeahead
              id="selectService"
              filterBy={filterByFields}
              labelKey={renderLabelKey}
              onChange={setSelects}
              options={map(options)}
              placeholder="Khách hàng cần tim"
              selected={selected}
            />
          </div>
        </Col>
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <>
            <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
            <Pagination
              pageRangeDisplayed={10}
              marginPagesDisplayed={10}
              initialPage={10}
              pageCount={1}
              onThisPaginationChange={onPaginationChange}
            />
          </>
        ) : (
          <NoData />
        )}
      </Row>
    </>
  );
};

export default DetailCODKhachHangTab2;
