/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { forEach, get, map, toNumber, toString, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import moment from 'moment';
import { push } from 'connected-react-router';
import { generatePath } from 'react-router-dom';

import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import DeleteConfirmModal from 'components/DeleteConfirmModal/Index';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal/Index';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';
import { toast, ToastContainer } from 'react-toastify';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorMaBP } from 'redux/auth/selectors';

interface Props {
  match: match;
}

let forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongTai: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

  const idTai = get(props, 'match.params.idTai', '');
  const dataTai = useSelector(makeSelector046RowFirstChild);
  const dataTaiChild = useSelector(makeSelector046ListChildren);
  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

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
  const [showPopupDongTai, setShowPopupDongTai] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const getListDiemDen = (): void => {
    dispatch(
      action_MIOA_ZTMI045({
        row: [
          {
            IV_LOCTYPE: 'V001, V004',
          },
        ],
        IV_BP: '',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  const getListChuyenThu = (): void => {
    // console.log('getListChuyenThu');
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: toString(moment().format('YYYYMMDD')),
        IV_TOR_TYPE: 'ZC3',
        IV_FR_LOC_ID: 'BDH',
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: '101',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  useEffect((): void => {
    getListChuyenThu();
    getListDiemDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  const handleShowPopupDongTai = (): void => {
    setShowPopupDongTai(true);
  };

  const handleHidePopupDongTai = (): void => {
    setShowPopupDongTai(false);
  };

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

  const payload046 = {
    IV_TOR_ID: idTai,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
  };

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  function onSuccessSelectedForwardingItem(): void {
    getListPhieuGui();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
    forwardingItemList = [];
  }

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

  const handleDeleteForwardingOrder = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
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
        onFinish: (): void => getListPhieuGui(),
      }),
    );
  };

  React.useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTai]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  function handleGotoEditForwardingOrder(idDonHang: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      dispatch(push(generatePath(routesMap.PHIEU_GUI_TRONG_NUOC, { idDonHang })));
    };
  }

  const handleRedirectDetail = useCallback(
    (item: API.Child): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTaiChild],
  );

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách bảng kê/phiếu gửi trong tải')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button onClick={handleChuyenVaoTai} disabled={disableFunctionalButton}>
            <i className="fa fa-download rotate-90" />
            {t('Chuyển tải')}
          </Button>
          <Button onClick={handleShowPopupDongTai} disabled={disableFunctionalButton}>
            <i className="fa fa-cloud rotate-90" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">{get(dataTai, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataTai, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataTai, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(dataTai, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(dataTai, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {size(dataTaiChild)}
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã bảng kê/phiếu gửi')} />
          </div>
          <Button color="primary" className="ml-2">
            {t('Quét mã')}
          </Button>
          <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
            <i className="fa fa-trash-o" />
          </Button>
        </div>
      </div>
    );
  }

  const addTaiVaoChuyenThuDuocChon = (maTaiMoiTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: get(selectedChuyenThu, '  TOR_ID', ''),
          IV_SLOCATION: get(selectedChuyenThu, '  LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, '  LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maTaiMoiTao,
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
                containerId: 'DanhSachPhieuGuiTrongTai',
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
                containerId: 'DanhSachPhieuGuiTrongBangKe',
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const addBangKeDuocChonVaoTaiMoi = (maTaiMoiTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiMoiTao,
          IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''), // diem di cua tai
          IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''), // diem den cua tai
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        },
        {
          onSuccess: (): void => {
            // add tai vua tao vao chuyen thu duoc chon
            addTaiVaoChuyenThuDuocChon(maTaiMoiTao);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                containerId: 'DanhSachPhieuGuiTrongBangKe',
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const dongTaiVaoChuyenThuCoSan = (): void => {
    //Tao ngam 1 tai voi diem den cua bang ke hien tai
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''), // diem di cua tai
          IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''), // diem den cua tai
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            const maTaiMoiTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
            // add bang ke duoc chon vao tai moi
            addBangKeDuocChonVaoTaiMoi(maTaiMoiTao);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                containerId: 'DanhSachPhieuGuiTrongBangKe',
                type: 'error',
              },
            );
          },
        },
      ),
    );
    handleHidePopupDongTai();
  };
  // eslint-disable-next-line max-lines-per-function
  const dongTaiVaoChuyenThuTaoMoi = (locNo: string, ghiChu: string): void => {
    // tao ngam 1 tai voi diem den la diem den cua bang ke hien tai
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''), // diem di cua tai
          IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''), // diem den cua tai
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
            const maTaiMoiTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
            // add Bang ke duoc chon vao tai moi tao
            dispatch(
              action_MIOA_ZTMI016(
                {
                  IV_FLAG: IV_FLAG.SUA,
                  IV_TOR_TYPE: SipDataType.TAI,
                  IV_TOR_ID_CU: maTaiMoiTao,
                  IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''), // diem di cua tai
                  IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''), // diem den cua tai
                  IV_DESCRIPTION: '',
                  T_ITEM: forwardingItemListState,
                },
                {
                  // eslint-disable-next-line max-lines-per-function
                  onSuccess: (): void => {
                    //Tao chuyen thu theo thong tin vua duoc chon tu pop up
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
                            const maChuyenThuVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
                            // add tai vua tao vao chuyen thu vua tao
                            dispatch(
                              action_MIOA_ZTMI016(
                                {
                                  IV_FLAG: IV_FLAG.SUA,
                                  IV_TOR_TYPE: SipDataType.CHUYEN_THU,
                                  IV_TOR_ID_CU: maChuyenThuVuaTao,
                                  IV_SLOCATION: userMaBp,
                                  IV_DLOCATION: locNo,
                                  IV_DESCRIPTION: '',
                                  T_ITEM: [
                                    {
                                      ITEM_ID: maTaiMoiTao,
                                      ITEM_TYPE: SipDataType.TAI,
                                    },
                                  ],
                                },
                                {
                                  onSuccess: (data: API.MIOAZTMI016Response): void => {
                                    if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error', '0')) === 1) {
                                      toast(
                                        <>
                                          <i className="fa check mr-2" />
                                          {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', '')}
                                        </>,
                                        {
                                          containerId: 'DanhSachPhieuGuiTrongTai',
                                          type: 'success',
                                        },
                                      );
                                    } else {
                                      toast(
                                        <>
                                          <i className="fa fa-window-close-o  mr-2" />
                                          {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', '')}
                                        </>,
                                        {
                                          containerId: 'DanhSachPhieuGuiTrongTai',
                                          type: 'error',
                                        },
                                      );
                                    }
                                  },
                                },
                              ),
                            );
                          },
                        },
                      ),
                    );
                  },
                },
              ),
            );
          },
        },
      ),
    );

    handleHidePopupDongTai();
  };

  const dataTable = map(
    dataTaiChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format(' DD/MM/YYYY '),
      };
    },
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
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
        Header: t('Mã bảng kê/phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return <>Chưa có API</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Loại'),
        Cell: (): JSX.Element => {
          return <>Thiếu API</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              <Button
                className="SipTableFunctionIcon"
                onClick={handleGotoEditForwardingOrder(get(row, 'values.TOR_ID'))}
              >
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
    [dataTaiChild, uncheckAllForwardingItemCheckbox],
  );

  return dataTai ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={dataTable} onRowClick={handleRedirectDetail} />
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteForwardingOrder}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
      <SelectForwardingItemModal
        onSuccessSelected={onSuccessSelectedForwardingItem}
        visible={selectForwardingItemModal}
        onHide={toggleSelectForwardingItemModal}
        modalTitle={t('Chọn tải')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE="ZC2"
        IV_FR_LOC_ID={userMaBp}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={101}
      />
      <ModalTwoTab
        containerId={'DanhSachPhieuGuiTrongTai'}
        onHide={handleHidePopupDongTai}
        visible={showPopupDongTai}
        modalTitle={t('Gán tải vào chuyến thư')}
        firstTabTitle={t('CHỌN CHUYẾN THƯ')}
        secondTabTitle={t('TẠO CHUYẾN THƯ MỚI')}
        onSubmitButton1={dongTaiVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiVaoChuyenThuTaoMoi}
        tab1Contents={listChuyenThu}
        onChooseItemInFirstTab={handleUpdateSelectedChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
      />
      <ToastContainer containerId={'DanhSachPhieuGuiTrongTai'} />
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};
export default DanhSachPhieuGuiTrongTai;
