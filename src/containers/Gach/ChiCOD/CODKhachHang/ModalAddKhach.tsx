/* eslint-disable react/jsx-max-depth */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Label, ModalBody, ModalHeader, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import DataTable from 'components/DataTable';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import { isEmpty } from 'lodash';
import Pagination from 'components/Pagination';

interface Props {
  toggle?: () => void;
}

const ModalAddKhach = (props: Props): JSX.Element => {
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date());
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const { t } = useTranslation();

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

  function handleSelectStartDate(date: Date): void {
    setStartDate(date);
    console.log(date);
    // props.handleSelectStartDate(date);
  }

  function handleSelectEndDate(date: Date): void {
    setEndDate(date);
    console.log(date);
    // props.handleSelectEndDate(date);
  }

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  return (
    <>
      <ModalHeader toggle={props.toggle}>{t('Thêm mỡi vẫn đơn')}</ModalHeader>
      <ModalBody>
        <Row style={{ marginTop: 7 }}>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Label className="mr-2">Đến ngày</Label>
            <DatePicker
              selected={endDate}
              onChange={handleSelectStartDate}
              selectsEnd
              startDate={startDate}
              // endDate={endDate}
              dateFormat="dd/MM/yyyy"
              // showMonthYearPicker
              // inline
            />
          </Col>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Label className="mr-2">Đến ngày</Label>
            <DatePicker
              selected={endDate}
              onChange={handleSelectEndDate}
              selectsEnd
              startDate={startDate}
              // endDate={endDate}
              dateFormat="dd/MM/yyyy"
              // showMonthYearPicker
              // inline
            />
          </Col>
          <Col md={2} xs={12} className="mb-3">
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </Col>
        </Row>
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <>
            <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
            <div className="mb-3" style={{ textAlign: 'right', paddingRight: 15 }}>
              <Button color="danger" className="ml-2" onClick={props.toggle}>
                {t('Hủy')}
              </Button>
              <Button color="primary" className="ml-2">
                {t('Thêm vận đơn')}
              </Button>
            </div>
          </>
        ) : (
          ''
        )}
        {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
          <Pagination
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={10}
            onThisPaginationChange={onPaginationChange}
          />
        ) : (
          ''
        )}
      </ModalBody>
    </>
  );
};

export default ModalAddKhach;
