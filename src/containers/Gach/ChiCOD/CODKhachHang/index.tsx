/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
import Typeahead from 'components/Input/Typeahead';
import NoData from 'components/NoData';
import Pagination from 'components/Pagination';
import { get, isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { Button, Col, Row } from 'reactstrap';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import options from './data';
import DetailKhachHang from './DetailKhachHang';

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const data = useSelector(select_COD_Chua_Chot);
  const refDetaiBangKeCod = useRef<null | HTMLDivElement>(null);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.TEST[]>();
  const [hideDetail, setHideDetail] = useState<boolean>(false);
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);

  const [selected, setSelected] = useState<TypeaheadOption[]>();
  const [colorButton, setColorButton] = useState<number>();

  const filterByFields = ['label'];
  function renderLabelKey(option: TypeaheadOption): string {
    return `${get(option, 'id')} - ${get(option, 'label')}`;
  }
  const setSelects = (selected: TypeaheadOption[]): void => {
    setSelected(selected);
  };

  function printBangKe(bangKe: API.TEST): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setHideDetail(true);
      setHideDetailBangkeCod();
      setColorButton(Number(bangKe.id));
    };
  }
  const onPaginationChange = (selectedItem: { selected: number }): void => {
    // eslint-disable-next-line no-console
    console.log(selectedItem);
  };
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
              <div>
                <Button
                  color={Number(row.original.id) === colorButton ? 'info' : 'primary'}
                  onClick={printBangKe(row.original)}
                  id={row.original.id}
                  style={{ fontSize: 11 }}
                >
                  {t('Chi tiết')}
                </Button>
              </div>
            </>
          );
        },
      },
    ],
    [colorButton],
  );
  const setHideDetailBangkeCod = (): void => {
    if (refDetaiBangKeCod.current !== null) {
      refDetaiBangKeCod.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  useEffect((): void => {
    return setListPhanCongNhan(data);
  }, [data]);
  useEffect((): void => {
    setHideDetailBangkeCod();
  });
  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  return (
    <>
      <Row className="sipBgWhiteContainer sipFilterContainer">
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Typeahead
              id="selectService"
              filterBy={filterByFields}
              labelKey={renderLabelKey}
              onChange={setSelects}
              options={map(options)}
              placeholder="Khách hàng cần tim"
              selected={selected}
            />
            {/* <img src={'../../assets/img/icon/iconSearch.svg'} alt="VTPostek" /> */}
          </div>
        </Col>
        <Col className="sipFilterCol sipFilterColBtn">
          <Button color="primary">{t('Tìm kiếm')}</Button>
        </Col>
      </Row>
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
      {hideDetail === true ? (
        <div className="mb-3 sipTableContainer sipTableRowClickable row" ref={refDetaiBangKeCod}>
          <DetailKhachHang toggle={toggle} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Index;
