/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import DataTable from 'components/DataTable';
import NoData from 'components/NoData';
import Pagination from 'components/Pagination/PaginationCustom';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';

// eslint-disable-next-line max-lines-per-function
const Index: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Mã bảng kê'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Loại bảng kê'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Ngày chuyễn CDCN'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Số tiền chiếm dụng'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'chenh_lech_cuoc',
      },
    ],
    [],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    console.log(selectedItem);
  };

  const onClickSuccess = (): void => {
    console.log(data);
  };

  function buttonPaginationEdit(): JSX.Element {
    return (
      <>
        <Button color="primary">Hủy</Button>
        <Button className="sipPaginationTotalLast" color="primary" onClick={() => onClickSuccess()}>
          Duyệt
        </Button>
      </>
    );
  }

  useEffect((): void => {
    dispatch(action_CHECK_COD_CHUA_CHOT());
    // getdata();
  }, []);

  return (
    <>
      <Row className="mb-3 sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="text" className="pl-4" placeholder={t('Nhập bưu tá cần tìm')}></Input>
            </div>
            <Button color="primary" className="ml-2 btn btn-primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>1</span>
          </p>
        </Col>
      </Row>
      <div className="mb-3" />
      <Row className="sipTableContainer sipTableRowClickable">
        {data && !isEmpty(data) ? (
          <>
            <DataTable columns={columns} data={data} showCheckboxes renderCheckboxValues={'id'} />
          </>
        ) : (
          ''
        )}
        {data && !isEmpty(data) ? (
          <Pagination
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
            initialPage={10}
            pageCount={1}
            onThisPaginationChange={onPaginationChange}
            buttonPaginationEdit={buttonPaginationEdit()}
          />
        ) : (
          ''
        )}
        {isEmpty(data) && <NoData />}
      </Row>
    </>
  );
};

export default Index;
