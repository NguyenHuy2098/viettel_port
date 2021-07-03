/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import Typeahead from 'components/Input/Typeahead';
import { get, isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { Cell } from 'react-table';
import { useSelector } from 'react-redux';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import NoData from 'components/NoData';

import options from './data';
import DetailCODChuaChot from './DetailCODChuaChot';

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const refDetaiBangKeCod = useRef<null | HTMLDivElement>(null);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [selected, setSelected] = useState<TypeaheadOption[]>();
  const [typeSearch, setTypeSearch] = useState<string>('');
  const [startDate, setStartDate] = useState(() => new Date());
  const [colorButton, setColorButton] = useState<number>();
  const [hideDetail, setHideDetail] = useState<boolean>(false);
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);

  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);

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

  function handleSelectStartDate(date: Date): void {
    setStartDate(date);
    console.log(date);
    // props.handleSelectStartDate(date);
  }

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  const setHideDetailBangkeCod = (): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect((): void => {
    setHideDetailBangkeCod();
  });

  function printBangKe(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setHideDetail(!hideDetail);
      setHideDetailBangkeCod();
      setColorButton(Number(bangKe.id));
      // console.dir(event.currentTarget);
      // event.currentTarget.setAttribute('disabled', 'true');
      // dispatch(
      //   action_DETAIL_THU_TIEN({
      //     id: bangKe.id,
      //   }),
      // );
    };
  }

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'id',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'buu_ta',
      },
      {
        Header: t('Ngày đối soát COD'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Ngày cấn trừ CN'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Hình thức trả tiền'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Trạng thái ngân hàng'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Hình thức cấn trừ'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Kỳ đối soát'),
        accessor: 'tie_thuc_thu',
      },
      {
        Header: t('Tiền COD'),
        accessor: 'tie_thuc_thu',
      },
      {
        Header: t(' '),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              {/* <div> */}
              <Button
                color={Number(row.original.id) === colorButton ? 'info' : 'primary'}
                onClick={printBangKe(row.original)}
                id={row.original.id}
              >
                Chi tiết
              </Button>
              {/* </div> */}
            </>
          );
        },
      },
    ],
    [colorButton],
  );
  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };

  return (
    <>
      <Row className="mb-3 sipContentContainer">
        <Col lg={2} xs={12}>
          <Label>{t('khách hàng')}</Label>
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
        <Col lg={2} xs={12}>
          <Label>{t('Trạng thái ngân hàng')}</Label>
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
        <Col lg={2} xs={12}>
          <Label>{t('Kì đối soát')}</Label>
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
        <Col lg={2} xs={12}>
          <Label>{t('Tính đến ngày')}</Label>
          <DatePicker
            selected={startDate}
            onChange={handleSelectStartDate}
            selectsEnd
            startDate={startDate}
            dateFormat="dd/MM/yyyy"
          />
        </Col>
        <Col lg={2} xs={12}>
          <div style={{ marginTop: 30 }}>
            <Button color="primary" className="ml-2 btn btn-primary">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col lg={2} xs={12}>
          <div style={{ marginTop: 30 }}>
            <p className="text-right mt-2 mb-0">
              {t('Tổng số')}: <span>1</span>
            </p>
          </div>
        </Col>
      </Row>
      <Row className="mb-3 sipTableContainer sipTableRowClickable">
        <Row className="mb-3 sipTableContainerCustom sipTableRowClickable">
          {listPhanCongNhan && !isEmpty(listPhanCongNhan) ? (
            <>
              <DataTable columns={columns} data={listPhanCongNhan} showCheckboxes renderCheckboxValues={'id'} />
              <Pagination
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={10}
                onThisPaginationChange={onPaginationChange}
              />
            </>
          ) : (
            <NoData />
          )}
        </Row>
      </Row>
      {hideDetail === true ? (
        <div className="mb-3 sipTableContainer sipTableRowClickable row" ref={refDetaiBangKeCod}>
          <DetailCODChuaChot toggle={toggle} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Index;
