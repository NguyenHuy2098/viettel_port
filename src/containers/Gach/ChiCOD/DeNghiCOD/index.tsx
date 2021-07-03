/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import DataTable from 'components/DataTable';
// import NoData from 'components/NoData';
import Pagination from 'components/Pagination';
import { isEmpty, map } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Modal, Row } from 'reactstrap';
import { action_CHECK_COD_CHUA_CHOT } from 'redux/CongNoBuuTa/actions';
import { select_COD_Chua_Chot } from 'redux/CongNoBuuTa/selectors';
import ModalConfirmDelete from 'components/Modal/ModalConfirmDelete';
import ModalBrowse from 'components/Modal/ModalBrowse';
import ListSpend from './ListSpend';
import DetailDeNghiCOD from './DetailDeNghiCOD';
import ModalAddListSpend from './ModalAddListSpend';

const Index = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refListSpend = useRef<HTMLDivElement | null>(null);
  const refDetaiListSpend = useRef<HTMLDivElement | null>(null);
  const [typeSearch, setTypeSearch] = useState<string>('');
  const data = useSelector(select_COD_Chua_Chot);
  const [changeBank, setChangeBank] = useState<string>();
  const [listBank, setlistBank] = useState<CODCHUACHOT>();
  const [clickDetail, setclickDetail] = useState<boolean>(false);
  const [modalAddListSpend, setmodalAddListSpend] = useState<boolean>(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  const [modalBrowse, setmodalBrowse] = useState<boolean>(false);
  const [BrowserId, setBrowserId] = useState<string>('');
  // const [listSpend, setlistSpend] = useState<CODCHUACHOT[]>();

  const handleChangeTextboxValue = (
    setValueFunction: Function,
  ): ((event: React.FormEvent<HTMLInputElement>) => void) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setChangeBank(event.currentTarget.value);
    };
  };
  const data_input = useMemo(
    () => [
      {
        _id: 'a1G23e25vaus6DVa7Sv',
        volume: 'MB Bank',
        name: 'huyaaa',
      },
      {
        _id: 'e1D23f25s6ASa7saA',
        volume: 'Agri Bank',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaus6ASaaA',
        volume: 'BIDV',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaádus6ASaaA',
        volume: 'VietcomBank',
        name: 'huyaaaádasds',
      },
      {
        _id: 'e1D23f25vaádấus6ASaaA',
        volume: 'Ngân hàng khác',
        name: 'huyaaaádasds',
      },
    ],
    [],
  );

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
        Header: t('Bưu cục'),
        accessor: 'hinh_thuc_nop_tien',
      },
      {
        Header: t('Khách hàng'),
        accessor: 'ngay_hach_toan',
      },
      {
        Header: t('Người tạo'),
        accessor: 'tien_cong_no',
      },
      {
        Header: t('Ngày hạc toám'),
        accessor: 'giam_gia_tk',
      },
      {
        Header: t('Số tài khoản'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Người thụ hưởng'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền COD'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền cước'),
        accessor: 'chenh_lech_cuoc',
      },
      {
        Header: t('Tiền phải trả'),
        accessor: 'chenh_lech_cuoc',
      },
    ],
    [],
  );
  const onPaginationChange = (selectedItem: { selected: number }): void => {
    console.log(selectedItem);
  };

  const setHideDetailListSpend = (): void => {
    if (refDetaiListSpend.current !== null) {
      refDetaiListSpend.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setHideListSpend = (): void => {
    if (refListSpend.current !== null) {
      refListSpend.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect((): void => {
    setHideDetailListSpend();
  });

  const btnSearch = (): void => {
    dispatch(
      action_CHECK_COD_CHUA_CHOT(
        {},
        {
          onSuccess: (data: CODCHUACHOT): void => {
            setlistBank(data);
          },
        },
      ),
    );
  };

  // function toggle(): void {
  //   setModalCreateNew(true);
  // }

  const btnClickDetail = (): void => {
    setHideDetailListSpend();
    setclickDetail(true);
  };

  function toggle(): void {
    setmodalAddListSpend(!modalAddListSpend);
  }

  const handleDeleteManifest = (torId: string): void => {
    console.log(torId);
  };
  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }
  const handleDeleteItem = (torId: string): void => {
    // event.stopPropagation();
    setDeleteTorId(torId);
    toggleDeleteConfirmModal();
  };

  const HandleBrowse = (torId: string): void => {
    console.log(torId);
  };
  function toggleBrowse(): void {
    setmodalBrowse(!modalBrowse);
  }
  const handleBrowseItem = (torId: string): void => {
    // event.stopPropagation();
    setBrowserId(torId);
    toggleBrowse();
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer"></Row>
      <Row className="mb-3 sipContentContainer">
        <Row className="mb-3 sipTitleContainer">
          <h1 className="sipTitle">{t('Kê khai chi phí thường xuyên')}</h1>
        </Row>
        <Row className="mb-3 row" style={{ width: '100%' }}>
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
              <Button color="primary" className="ml-2 btn btn-primary" onClick={btnSearch}>
                {t('Tìm kiếm')}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="sipTableContainer sipTableRowClickable">
          {!isEmpty(changeBank) && !isEmpty(listBank) ? (
            <>
              <DataTable columns={columns} data={data} showCheckboxes renderCheckboxValues={'id'} />
              <div className="mb-3" style={{ float: 'right' }}>
                <Button color="primary" className="ml-2 btn btn-primary" onClick={setHideListSpend}>
                  {t('Thêm đề nghị chi phí')}
                </Button>
              </div>
              <Pagination
                pageRangeDisplayed={10}
                marginPagesDisplayed={10}
                initialPage={10}
                pageCount={1}
                onThisPaginationChange={onPaginationChange}
              />
            </>
          ) : (
            // <NoData />
            ''
          )}
        </Row>
      </Row>
      <div className="mb-3 sipTableContainerCustom sipTableRowClickable row" ref={refListSpend}>
        <ListSpend btnClickDetail={btnClickDetail} handleBrowseItem={handleBrowseItem} />
      </div>
      {clickDetail ? (
        <div className="mb-3 sipTableContainer sipTableRowClickable row" ref={refDetaiListSpend}>
          <DetailDeNghiCOD toggle={toggle} handleDeleteItem={handleDeleteItem} />
        </div>
      ) : (
        ''
      )}
      <Modal
        size="xl"
        isOpen={modalAddListSpend}
        toggle={toggle}
        onClosed={modalAddListSpend ? toggle : undefined}
        className="sipTitleModalCreateNew sipModalReportLookUp"
      >
        <ModalAddListSpend toggle={toggle} />
      </Modal>
      <ModalConfirmDelete
        visible={deleteConfirmModal}
        onDelete={handleDeleteManifest}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
      <ModalBrowse visible={modalBrowse} onDelete={HandleBrowse} onHide={toggleBrowse} torId={BrowserId} />
    </>
  );
};

export default Index;
