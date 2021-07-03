/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import DataTable from 'components/DataTable';
import Typeahead from 'components/Input/Typeahead';
import NoData from 'components/NoData';
import Pagination from 'components/Pagination/PaginationCustom';
import { get, isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import options from './data';

// eslint-disable-next-line max-lines-per-function
const Index: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const [selected, setSelected] = useState<TypeaheadOption[]>();
  const [typeSearch, setTypeSearch] = useState<string>('');
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Mã bưu cục'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Bưu cục'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Người tạo'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Ngân hàng'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Số tài khoản'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Người thụ hường'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Chi nhánh'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Mặc định'),
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

  const filterByFields = ['label'];
  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }
  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      console.log(event.currentTarget.value);
    };
  };
  const data_input = useMemo(
    () => [
      {
        _id: 'a1G23e25vaus6DVa7Sv',
        volume: 'Nam Từ Liêm',
        name: 'huyaaa',
      },
      {
        _id: 'e1D23f25s6ASa7saA',
        volume: 'giảng võ',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaus6ASaaA',
        volume: 'đống đa',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaádus6ASaaA',
        volume: 'Cầu giấy',
        name: 'huyaaaádasds',
      },
    ],
    [],
  );

  return (
    <>
      <Row className="mb-3 sipContentContainer">
        <Col lg={3} xs={12}>
          <Input type="select" onChange={handleChangeTextboxValue(setTypeSearch)} value={typeSearch}>
            <option value="">{t('Tất cả')}</option>
            {map(
              data_input,
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
        <Col lg={4} xs={12}>
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
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
