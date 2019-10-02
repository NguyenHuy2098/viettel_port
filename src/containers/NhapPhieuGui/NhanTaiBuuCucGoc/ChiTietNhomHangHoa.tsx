/* eslint-disable max-lines */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane, Col, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get, map, size, forEach, includes, toNumber, trim } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { match } from 'react-router-dom';

import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { Location } from 'history';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import CreateForwardingItemModal from 'components/CreateForwardingItemModal';
import { goBack } from 'connected-react-router';
import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';

interface Props {
  location: Location;
  match: match;
}
const forwardingItemList: ForwardingItem[] = [];
// eslint-disable-next-line max-lines-per-function
function ChiTietNhomHangHoa(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(select_ZTMI241);
  const dataRow = get(data, 'Row', []);
  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));

  const idBangKe = get(props, 'match.params.idBangKe', '');
  const userMaBp = useSelector(makeSelectorMaBP);
  const listTai = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.TAO_MOI));
  const [tab] = useState(1);
  const childs = get(props, 'location.state', []);
  const [listUncheckForwardingItem, setListUncheckForwardingItem] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const [disableButtonDongBangKe, setDisableButtonDongBangKe] = useState<boolean>(true);
  const [showDongBangKeVaoTaiPopup, setShowDongBangKeVaoTaiPopup] = useState<boolean>(false);
  const [showPopUpGanTaiVaoChuyenThu, setShowPopUpGanTaiVaoChuyenThu] = useState<boolean>(false);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const [selectedChuyenThu, setSelectedChuyenthu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  const dispatchZTMI241 = (): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [306],
      IV_LOC_ID: userMaBp,
      IV_COMMODITY_GROUP: 'Thường-Chậm-Liên Khu vực.HUB3',
      IV_DATE: moment().format('YYYYMMDD'),
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };

    dispatch(action_ZTMI241(payload));
  };

  useEffect((): void => {
    dispatchZTMI241();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, childs]);

  const getListChuyenThu = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: moment()
          .subtract(7, 'day')
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
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  useEffect((): void => {
    getListDiemDen();
    getListChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPopUpDongBangKeVaoTai = useCallback((): void => {
    setShowDongBangKeVaoTaiPopup(true);
  }, []);

  const closePopUpDongBangKeVaoTai = useCallback((): void => {
    setShowDongBangKeVaoTaiPopup(false);
  }, []);

  const openPopUpDongTai = useCallback((): void => {
    setShowPopUpGanTaiVaoChuyenThu(true);
  }, []);
  const closePopUpDongTai = useCallback((): void => {
    setShowPopUpGanTaiVaoChuyenThu(false);
  }, []);

  const getListTai = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_TOR_TYPE: SipDataType.TAI,
        IV_FR_LOC_ID: userMaBp,
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: SipDataState.CHUA_HOAN_THANH,
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  function isForwardingItemSelected(item: API.Child, listForwardingItemId: string[]): boolean {
    return includes(listForwardingItemId, item.TOR_ID);
  }

  useEffect((): void => {
    if (forwardingItemListState.length > 0) {
      setDisableButtonDongBangKe(false);
    } else {
      setDisableButtonDongBangKe(true);
    }
  }, [forwardingItemListState]);

  useEffect((): void => {
    const listForwardingItemId = map(forwardingItemListState, item => item.ITEM_ID);
    const unSelectListForwardingItem: API.Child[] = [];
    forEach(dataRow, item => {
      if (!isForwardingItemSelected(item, listForwardingItemId)) {
        unSelectListForwardingItem.push(item);
      }
    });

    // listUncheckForwardingItem
    const tempListUncheckForwardingItem: ForwardingItem[] = map(
      unSelectListForwardingItem,
      (item: API.Child): ForwardingItem => ({
        ITEM_ID: item.TOR_ID || '',
        ITEM_TYPE: '',
      }),
    );

    setListUncheckForwardingItem(tempListUncheckForwardingItem);
  }, [forwardingItemListState, dataRow]);

  useEffect((): void => {
    getListTai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChonTai = (tai: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedTai(tai);
  };

  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKe = (taiID: string): void => {
    const payload016 = {
      IV_FLAG: IV_FLAG.TAO,
      IV_TOR_TYPE: SipDataType.BANG_KE,
      IV_TOR_ID_CU: '',
      IV_SLOCATION: userMaBp,
      IV_DLOCATION: get(selectedTai, 'LOG_LOCID_TO', ''),
      IV_DESCRIPTION: get(selectedTai, 'Childs[0].DESCRIPTION', ''),
      T_ITEM: [
        {
          ITEM_ID: '',
          ITEM_TYPE: '',
        },
      ],
    };
    // Tạo ngầm 1 bảng kê với điểm đến là điểm đến của danh sách bưu gửi bên ngoài
    dispatch(
      action_MIOA_ZTMI016(payload016, {
        // eslint-disable-next-line max-lines-per-function
        onSuccess: (data: API.MIOAZTMI016Response): void => {
          const maBangKeVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
          const payload016Update = {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.BANG_KE,
            IV_TOR_ID_CU: maBangKeVuaTao,
            IV_SLOCATION: userMaBp,
            IV_DLOCATION: get(selectedTai, 'LOG_LOCID_TO', ''),
            IV_DESCRIPTION: '',
            T_ITEM: forwardingItemListState,
          };
          // Add các bưu gửi được tích chọn bên ngoài vào bảng kê vừa tạo
          dispatch(
            action_MIOA_ZTMI016(payload016Update, {
              onSuccess: (data: API.MIOAZTMI016Response): void => {
                const payload016Update2 = {
                  IV_FLAG: IV_FLAG.SUA,
                  IV_TOR_TYPE: SipDataType.TAI,
                  IV_TOR_ID_CU: taiID,
                  IV_SLOCATION: userMaBp,
                  IV_DLOCATION: get(selectedTai, 'LOG_LOCID_TO', ''),
                  IV_DESCRIPTION: '',
                  T_ITEM: {
                    ITEM_ID: maBangKeVuaTao,
                    ITEM_TYPE: SipDataType.BANG_KE,
                  },
                };
                // gán bảng kê vào tải
                dispatch(
                  action_MIOA_ZTMI016(payload016Update2, {
                    onSuccess: (data: API.MIOAZTMI016Response): void => {
                      toast(
                        <>
                          <i className="fa check mr-2" />
                          {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
                        </>,
                        {
                          containerId: 'DanhSachPhieuGuiTrongBangKe',
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
                  }),
                );
              },
            }),
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
        // eslint-disable-next-line max-lines-per-function
        onFinish: (): void => {
          dispatchZTMI241();
        },
      }),
    );

    setShowDongBangKeVaoTaiPopup(false);
  };

  const handleActionDongBangKeVaoTaiCoSan = (): void => {
    handleActionDongBangKe(get(selectedTai, 'TOR_ID', ''));
  };

  const taoTaiMoi = (locNo: string, ghiChu: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
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
            if (data && data.MT_ZTMI016_OUT) {
              const newTaiId = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              handleActionDongBangKe(newTaiId);
            }
          },

          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', t('Đã có lỗi xảy ra '))}
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

  function handleSelectBangKeItem(event: React.FormEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: '' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (get(item, 'ITEM_ID') === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState([...forwardingItemList]);
  }

  const handleChonChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenthu(chuyenThu);
  };

  const dongTaiVoiChuyenThuCoSanAfterRemovePhieuGui = (maTaiVuaTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.REMOVE,
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: idBangKe,
          IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''),
          IV_DESCRIPTION: '',
          T_ITEM: listUncheckForwardingItem,
        },
        {
          // eslint-disable-next-line max-lines-per-function
          onSuccess: (): void => {
            // add bang ke hien tai vao tai moi tao
            addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
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
          onFinish: (): void => {
            dispatchZTMI241();
          },
        },
      ),
    );
  };

  const addTaiVaoChuyenThuDuocChon = (maTaiVuaTao: string): void => {
    const maChuyenThu = get(selectedChuyenThu, 'TOR_ID', '');
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: maChuyenThu,
          IV_SLOCATION: get(selectedChuyenThu, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
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
                containerId: 'DanhSachPhieuGuiTrongBangKe',
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

  const addBangKeHienTaiVaoTaiMoiTao = (maTaiVuaTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idBangKe,
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        },
        {
          onSuccess: (): void => {
            // add tai vao chuyen thu vua chon
            addTaiVaoChuyenThuDuocChon(maTaiVuaTao);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]')}
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

  // eslint-disable-next-line max-lines-per-function
  const handleDongTaiSauKhiChonChuyenThu = (): void => {
    const maChuyenThu = get(selectedChuyenThu, 'TOR_ID', '');

    if (size(trim(maChuyenThu)) > 0) {
      //tao tai moi
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.TAO,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: '',
            IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''),
            IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''),
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
              if (get(data, 'MT_ZTMI016_OUT.ev_error') === 1) {
                const maTaiVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
                if (size(listUncheckForwardingItem) > 0) {
                  // Remove phieu gui khong duoc tick ngoai man hin danh sach phieu gui trong bang ke
                  dongTaiVoiChuyenThuCoSanAfterRemovePhieuGui(maTaiVuaTao);
                } else {
                  // add bang ke hien tai vao tai moi tao
                  addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
                }
              }
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
    }

    closePopUpDongTai();
  };

  // eslint-disable-next-line max-lines-per-function
  const taoChuyenThuMoi = (locNo: string, ghiChu: string): void => {
    // tao ngam 1 tai
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
          IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
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
            if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error', '0')) === 1) {
              const maTaiVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
              if (size(listUncheckForwardingItem) > 0) {
                // Remove cac phieu gui khong duoc tich o ben ngoi man hinh
                dongTaiVaoChuyenThuAfterRemovePhieuGui(maTaiVuaTao);
              } else {
                //add bang ke hien tai vao tai moi tao
                addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
              }
            }
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

    //===================================================================================================

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const addTaiVaoChuyenThuVuaTao = (maTaiVuaTao: string, maChuyenThuMoiTao: string) => {
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
                  containerId: 'DanhSachPhieuGuiTrongBangKe',
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

    const taoChuyenThuMoiTheoThongTinTuPopup = (maTaiVuaTao: string): void => {
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
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error', '0')) === 1) {
                const maChuyenThuMoiTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU');
                // add tai vao chuyen thu vua tao
                addTaiVaoChuyenThuVuaTao(maTaiVuaTao, maChuyenThuMoiTao);
              }
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

    const addBangKeHienTaiVaoTaiMoiTao = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.SUA,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: maTaiVuaTao,
            IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
            IV_DESCRIPTION: '',
            T_ITEM: [
              {
                ITEM_ID: idBangKe,
                ITEM_TYPE: SipDataType.BANG_KE,
              },
            ],
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (): void => {
              // Tao chuyen thu theo thong tin vua duoc chon tu popup
              taoChuyenThuMoiTheoThongTinTuPopup(maTaiVuaTao);
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

    const dongTaiVaoChuyenThuAfterRemovePhieuGui = (maTaiVuaTao: string): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.REMOVE,
            IV_TOR_TYPE: SipDataType.BANG_KE,
            IV_TOR_ID_CU: idBangKe,
            IV_SLOCATION: get(data, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(data, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
            IV_DESCRIPTION: '',
            T_ITEM: listUncheckForwardingItem,
          },
          {
            // eslint-disable-next-line max-lines-per-function
            onSuccess: (): void => {
              // Add bang ke hien tai vao tai moi tao
              addBangKeHienTaiVaoTaiMoiTao(maTaiVuaTao);
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
            onFinish: (): void => {
              dispatchZTMI241();
            },
          },
        ),
      );
    };

    closePopUpDongTai();
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'FREIGHT_UNIT',
        accessor: 'FREIGHT_UNIT',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input
                defaultChecked={uncheckAllForwardingItemCheckbox}
                type="checkbox"
                value={get(row, 'values.FREIGHT_UNIT', '')}
                onClick={handleSelectBangKeItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'MANIFEST_LOC',
      },
      {
        Header: t('Số lượng'),
        accessor: 'QUANTITY',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon">
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

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoBangKe(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn phiếu gửi!'));
    }
  }

  function onSuccessSelectedForwardingItem(): void {
    dispatchZTMI241();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
  }

  function renderSearch(): JSX.Element {
    return (
      <Row className="sipContentContainer">
        <Col lg={6} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Đã chọn')}: <span className="color-primary">02/03</span>
          </p>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <button className="sipTitleBtnBack btn btn-secondary" onClick={handleBack}>
            <i className="fa fa-arrow-left backIcon"></i>
          </button>
          {t('Thư - Nhanh')}
        </h1>
        <div className="sipTitleRightBlock">
          {/*________________temporary hide btn Chuyển because of lack of requirement____________*/}
          <Button className="hide" onClick={handleChuyenVaoBangKe} disabled={disableButtonDongBangKe}>
            <i className="fa fa-file-excel-o" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-file-archive-o" />
            {t('Tạo bảng kê')}
          </Button>
          <Button onClick={openPopUpDongBangKeVaoTai} disabled={disableButtonDongBangKe}>
            <i className="fa fa-download" />
            {t('Đóng bảng kê')}
          </Button>
          <Button disabled={disableButtonDongBangKe} onClick={openPopUpDongTai}>
            <i className="fa fa-download" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          {childs.map((child: API.RowMTZTMI241OUT) => {
            return (
              <NavItem key={child.USER}>
                <NavLink className={classNames({ active: tab === 1 })}>
                  {child.USER}
                  <Badge color="primary">01</Badge>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent className="sipFlatContainer">
          <TabPane>
            {renderSearch()}
            <Row className="sipTableContainer">
              <DataTable columns={columns} data={dataRow ? dataRow : []} />
            </Row>
          </TabPane>
        </TabContent>
        <SelectForwardingItemModal
          onSuccessSelected={onSuccessSelectedForwardingItem}
          visible={selectForwardingItemModal}
          onHide={toggleSelectForwardingItemModal}
          modalTitle={t('Chọn bảng kê')}
          forwardingItemList={forwardingItemListState}
          IV_TOR_TYPE="ZC1"
          IV_FR_LOC_ID={userMaBp}
          IV_TO_LOC_ID=""
          IV_CUST_STATUS={101}
          isFrom2
        />
        <ModalTwoTab
          onHide={closePopUpDongBangKeVaoTai}
          visible={showDongBangKeVaoTaiPopup}
          modalTitle="Gán bảng kê vào tải"
          firstTabTitle={'CHỌN TẢI'}
          secondTabTitle={'TẠO TẢI MỚI'}
          tab1Contents={listTai}
          onSubmitButton1={handleActionDongBangKeVaoTaiCoSan}
          onSubmitButton2={taoTaiMoi}
          onChooseItemInFirstTab={handleChonTai}
          selectedChildInTab1={selectedTai}
        />
        <ModalTwoTab
          onHide={closePopUpDongTai}
          visible={showPopUpGanTaiVaoChuyenThu}
          modalTitle="Gán tải vào chuyến thư"
          firstTabTitle={'CHỌN CHUYẾN THƯ'}
          secondTabTitle={'TẠO CHUYẾN THƯ MỚI'}
          tab1Contents={listChuyenThu}
          onSubmitButton1={handleDongTaiSauKhiChonChuyenThu}
          onSubmitButton2={taoChuyenThuMoi}
          onChooseItemInFirstTab={handleChonChuyenThu}
          selectedChildInTab1={selectedChuyenThu}
        />
        <CreateForwardingItemModal
          onSuccessCreated={dispatchZTMI241}
          visible={createForwardingItemModal}
          onHide={toggleCreateForwardingItemModal}
          modalTitle={t('Tạo bảng kê')}
          IV_TOR_TYPE="ZC1"
        />
      </div>
    </>
  );
}

export default ChiTietNhomHangHoa;
