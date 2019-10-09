/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { generatePath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { Cell } from 'react-table';
import { find, forEach, map, get, noop, size } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import DataTable from 'components/DataTable';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Pagination from 'components/Pagination';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

let forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
const BangKeChuaDongTai: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);

  const listBangKeChuaDongTai = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));
  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [showPopupDongTai, setShowPopupDongTai] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const [disableFunctionalButton, setDisableFunctionalButton] = useState<boolean>(true);

  useEffect((): void => {
    if (forwardingItemListState.length > 0) {
      setDisableFunctionalButton(false);
    } else {
      setDisableFunctionalButton(true);
    }
  }, [forwardingItemListState]);

  const getListDiemDen = (): void => {
    dispatch(
      action_MIOA_ZTMI045({
        row: [
          {
            IV_LOCTYPE: 'V001',
          },
          { IV_LOCTYPE: 'V004' },
        ],
        IV_BP: '',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '200',
      }),
    );
  };
  useEffect((): void => {
    getListChuyenThu();
    getListDiemDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoTai(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn bảng kê!'));
    }
  }

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }

  function handleDeleteItem(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      setDeleteTorId(torId);
      toggleDeleteConfirmModal();
    };
  }

  const getListChuyenThu = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: moment()
          .subtract(1, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_TOR_TYPE: 'ZC3',
        IV_FR_LOC_ID: userMaBp,
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: '101',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  const getListTai = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: userMaBp,
          IV_CUST_STATUS: '101',
          IV_FR_DATE: moment()
            .subtract(1, 'day')
            .format('YYYYMMDD'),
          IV_TO_DATE: moment().format('YYYYMMDD'),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...payload,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp],
  );

  function onSuccessSelectedForwardingItem(): void {
    getListTai();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
    forwardingItemList = [];
  }

  useEffect((): void => getListTai(), [getListTai]);

  function handleSearchTai(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListTai(payload);
  }

  function editTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('edit', tai.TOR_ID);
    };
  }

  const handleShowPopupDongTai = (): void => {
    setShowPopupDongTai(true);
  };

  const handleClosePopupDongtai = (): void => {
    setShowPopupDongTai(false);
  };

  const handleDeleteTai = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
      IV_TOR_TYPE: 'ZC2',
      IV_TOR_ID_CU: torId,
      IV_SLOCATION: '',
      IV_DLOCATION: '',
      IV_DESCRIPTION: '',
      T_ITEM: [
        {
          ITEM_ID: '',
          ITEM_TYPE: '',
        },
      ],
    };
    dispatch(
      action_MIOA_ZTMI016(payload, {
        onSuccess: (): void => {
          alert(t('Xóa thành công!'));
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.messages);
        },
        onFinish: (): void => getListTai(),
      }),
    );
  };

  //eslint-disable-next-line max-lines-per-function
  const handleDongTaiVaoChuyenThuCoSan = (): void => {
    if (size(forwardingItemListState) > 0) {
      const firstSelectedBangKe = find(listBangKeChuaDongTai, ['TOR_ID', forwardingItemListState[0].ITEM_ID]);
      // Tạo ngầm 1 tải với điểm đến là điểm đến của bảng kê hiện tại
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.TAO,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: '',
            // theo VinhPT , userMaBp == bp_org_unit trong SSO
            IV_SLOCATION: userMaBp,
            // theo VinhPT lay tu tai dau tien
            IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO'),
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: '',
                ITEM_TYPE: '',
              },
            ],
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              const taiMoiTaoId = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              // add bảng kê được chọn vào tải mới tạo
              addBangKeDuocChonVaoTaiMoiTao(taiMoiTaoId, firstSelectedBangKe);
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    }

    const addBangKeDuocChonVaoTaiMoiTao = (
      taiMoiTaoId: string,
      firstSelectedBangKe: API.RowMTZTMI047OUT | undefined,
    ): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: taiMoiTaoId,
            // theo VinhPT , userMaBp == bp_org_unit trong SSO
            IV_SLOCATION: userMaBp,
            // theo VinhPT lay tu tai dau tien
            IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO'),
            IV_DESCRIPTION: '',
            T_ITEM: forwardingItemListState,
          },
          {
            onSuccess: (): void => {
              // add tải vừa tạo vào chuyến thư được chọn
              addTaiVuaTaoVaoChuyenThuDuocChon(taiMoiTaoId);
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    };

    const addTaiVuaTaoVaoChuyenThuDuocChon = (taiMoiTaoId: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
            IV_TOR_ID_CU: get(selectedChuyenThu, ' TOR_ID', ''),
            IV_SLOCATION: get(selectedChuyenThu, ' LOG_LOCID_FR', ''),
            IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: taiMoiTaoId,
                ITEM_TYPE: SipDataType.TAI,
              },
            ],
          },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              toast(
                <>
                  <i className="fa check mr-2" />
                  {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
                </>,
                {
                  type: 'success',
                },
              );
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    };
    handleClosePopupDongtai();
  };

  // eslint-disable-next-line max-lines-per-function
  const dongTaiVaoChuyenThuMoiTao = (locNo: string, ghiChu: string): void => {
    const firstSelectedBangKe = find(listBangKeChuaDongTai, ['TOR_ID', forwardingItemListState[0].ITEM_ID]);
    // tao ngam 1 tai voi diem den duoc chon
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          // eslint-disable-next-line max-lines-per-function
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            const maTaiVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
            // add bang ke duoc chon vao tai moi tao
            addBangKeDuocChonVaoTaiMoiTao(maTaiVuaTao);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );

    const addBangKeDuocChonVaoTaiMoiTao = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: maTaiVuaTao,
            IV_SLOCATION: userMaBp,
            IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO', ''),
            IV_DESCRIPTION: '',
            T_ITEM: forwardingItemListState,
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (): void => {
              //tao chuyen thu theo thong tin duoc chon tu popup
              taoChuyenThuTheoTHongTinDuocChon(maTaiVuaTao);
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    };

    const taoChuyenThuTheoTHongTinDuocChon = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.TAO,
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
            IV_TOR_ID_CU: '',
            IV_SLOCATION: userMaBp,
            IV_DLOCATION: locNo,
            IV_DESCRIPTION: ghiChu,
            T_ITEM: [
              {
                ITEM_ID: '',
                ITEM_TYPE: '',
              },
            ],
          },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              const maChuyenThuMoiTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              // add tải vừa tạo vào chuyến thư vừa tạo
              addTaiVuaTaoVaoChuyenThuVuaTao(maTaiVuaTao, maChuyenThuMoiTao);
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    };

    const addTaiVuaTaoVaoChuyenThuVuaTao = (maTaiVuaTao: string, maChuyenThuMoiTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
            IV_TOR_ID_CU: maChuyenThuMoiTao,
            IV_SLOCATION: userMaBp,
            IV_DLOCATION: locNo,
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: maTaiVuaTao,
                ITEM_TYPE: SipDataType.TAI,
              },
            ],
          },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              toast(
                <>
                  <i className="fa check mr-2" />
                  {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
                </>,
                {
                  type: 'success',
                },
              );
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    };
    handleClosePopupDongtai();
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBangKeChuaDongTai],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: torIdSearch,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListTai(payload);
  };

  const handleSelectBangKeItem = (event: React.FormEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC1' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (get(item, 'ITEM_ID', '') === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState([...forwardingItemList]);
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-print fa-lg color-green" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bưu gửi của bảng kê'),
      }}
    />
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Label check>
              <Input
                defaultChecked={uncheckAllForwardingItemCheckbox}
                type="checkbox"
                value={get(row, 'values.TOR_ID', '')}
                onClick={handleSelectBangKeItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã bảng kê'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Người nhập'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày nhập'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              {renderPrintButton(get(row, 'values.TOR_ID', ''))}
              <Button className="SipTableFunctionIcon" onClick={editTai(row.original)}>
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
                <i className="fa fa-trash-o fa-lg color-red" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uncheckAllForwardingItemCheckbox],
  );

  const saveSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT): void => {
    setSelectedChuyenThu(chuyenThu);
  };
  const data = map(listBangKeChuaDongTai, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      PERSONAL: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: thisDescription ? thisDescription : '',
    };
  });
  return (
    <>
      <Row className="sipContentContainer">
        <Col xl={6} lg={8} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input
                value={torIdSearch}
                type="text"
                placeholder={t('Tìm kiếm bảng kê')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchTai}>
              {t('Tìm kiếm')}
            </Button>
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
              <i className="fa fa-trash-o" />
            </Button>
          </div>
        </Col>
        <Col xl={6} lg={4} xs={12} className="p-0 text-right">
          {/*________________temporary hide btn Chuyển because of lack of requirement____________*/}
          <Button color="primary" className="ml-2 hide" onClick={handleChuyenVaoTai} disabled={disableFunctionalButton}>
            <i className="fa fa-cloud-download mr-2 rotate-90"></i>
            {t('Chuyển vào tải')}
          </Button>
          <Button color="primary" className="ml-2" onClick={handleShowPopupDongTai} disabled={disableFunctionalButton}>
            <i className="fa fa-cloud mr-2 rotate-90"></i>
            {t('Đóng tải')}
          </Button>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteTai}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
      <SelectForwardingItemModal
        onSuccessSelected={onSuccessSelectedForwardingItem}
        visible={selectForwardingItemModal}
        onHide={toggleSelectForwardingItemModal}
        modalTitle={t('Chọn tải')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE={SipDataType.TAI}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
      />
      <ModalTwoTab
        onHide={handleClosePopupDongtai}
        visible={showPopupDongTai}
        modalTitle={t('Gán tải vào chuyến thư')}
        firstTabTitle={t('CHỌN CHUYẾN THƯ')}
        secondTabTitle={t('TẠO CHUYẾN THƯ MỚI')}
        onSubmitButton1={handleDongTaiVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiVaoChuyenThuMoiTao}
        tab1Contents={listChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
        onChooseItemInFirstTab={saveSelectedChuyenThu}
      />
    </>
  );
};

export default BangKeChuaDongTai;
