/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import { isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import Pagination from 'components/Pagination/PaginationCustom';
import NoData from 'components/NoData';

interface Props {
  toggle: () => void;
  handleDeleteItem: (torId: string) => void;
}

const DetailThuCuocCPN = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [resetCheckbox, setResetCheckbox] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState<string>('');

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

  const data_input = {
    data: [
      {
        _id: 'a1G23e25vaus6DVa7Sv',
        volume: 100,
        name: 'huyaaa',
      },
      {
        _id: 'e1D23f25s6ASa7saA',
        volume: 165165,
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaus6ASaaA',
        volume: 8481657498,
        name: 'huyaaaádasds',
      },
    ],
  };

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
        accessor: 'tie_thuc_thu',
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

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  const Delete = (torId: string): void => {
    props.handleDeleteItem(torId);
  };

  const handleChangeProvince = (event: React.FormEvent<HTMLInputElement>): void => {
    console.log(event);
  };

  const onClickSuccess = (): void => {
    console.log(data);
  };

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      console.log(event.currentTarget.value);
    };
  };

  const hideModalAdd = (): void => {
    props.toggle();
  };

  const resetCheckValue = (): void => {
    setResetCheckbox(!resetCheckbox);
  };

  function buttonPaginationEdit(): JSX.Element {
    return (
      <>
        <Row>
          <Col xs="6" style={{ paddingLeft: 0 }}>
            <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
              <option value="">{t('Tất cả trạng thái')}</option>
              {map(
                data_input.data,
                (item: CODCHUACHOT, index: number): JSX.Element => {
                  return (
                    <option key={index} value={item.volume || undefined}>
                      {item.volume}
                    </option>
                  );
                },
              )}
            </Input>
          </Col>
          <Col xs="6">
            <Button color="primary" onClick={onClickSuccess}>
              {t('Cập nhật thông tin')}
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết vận đơn thu bưu tá : BKCPN-TN2-2104-1</h1>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
      </Row>
      <Row xs="4" className="sipContentContainer sipTableRowClickable">
        <Col xs="3" className="p-0">
          <Input
            type="select"
            id="provinceSelect"
            defaultValue={'tim nhan viên'}
            value={'tim nhan viên'}
            onChange={handleChangeProvince}
          >
            <option value="0">{t('Nhập mã vận đơn cần tìm')}</option>
            {map(
              data_input.data,
              (item: CODCHUACHOT, index: number): JSX.Element => {
                return (
                  <option key={index} value={item.volume || undefined}>
                    {item.volume}
                  </option>
                );
              },
            )}
          </Input>
        </Col>
        <Col xs="3">
          <h1 className="sipTitle">Mã bưu tá: BT-012412412</h1>
          <h1 className="sipTitle">Tên bưu tá: Trần Tuấn Hùng</h1>
        </Col>
        <Col xs="6">
          <div style={{ float: 'right' }}>
            <Button color="success" className="ml-2" onClick={hideModalAdd}>
              {t('Thêm mới vẫn đơn +')}
            </Button>
            <Button color="warning" className="ml-2" onClick={resetCheckValue}>
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
            buttonPaginationEdit={buttonPaginationEdit()}
          />
        ) : (
          ''
        )}
      </Row>
      {isEmpty(listPhanCongNhan) && <NoData />}
    </>
  );
};

export default DetailThuCuocCPN;
