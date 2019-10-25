/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Col, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import classNames from 'classnames';
import { Location } from 'history';
import moment from 'moment';
import { forEach, get, includes, map, size, toNumber, toString, trim } from 'lodash';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { IV_FLAG, SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import { today } from 'utils/timeHelper';

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

  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  const dispatchZTMI241 = (): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      IV_LOC_ID: userMaBp,
      IV_COMMODITY_GROUP: 'Thường-Hỏa tốc-Nội vùng.HUB1',
      IV_DATE: today,
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
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        {
          flow: SipFlowType.KHAI_THAC_DI,
        },
      ),
    );
  };

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
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.CHUA_HOAN_THANH,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
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
        Header: t('Mã bưu gửi'),
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const date = get(row, 'values.CREATED_ON', '');
          return <>{moment(date, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
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
          <ButtonGoBack />
          {t('Thư - Nhanh')}
        </h1>
        <div className="sipTitleRightBlock">
          {/*________________temporary hide btn Chuyển because of lack of requirement____________*/}
          <Button
            color="primary"
            className="hide ml-2"
            onClick={handleChuyenVaoBangKe}
            disabled={disableButtonDongBangKe}
          >
            <img src={'../../assets/img/icon/iconChuyenVaoTai.svg'} alt="VTPostek" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button className="ml-2" color="primary" onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-file-archive-o mr-2" />
            {t('Tạo bảng kê')}
          </Button>
          <Button
            className="ml-2"
            color="primary"
            onClick={openPopUpDongBangKeVaoTai}
            disabled={disableButtonDongBangKe}
          >
            <i className="fa fa-download mr-2" />
            {t('Đóng bảng kê')}
          </Button>
          <Button className="ml-2" color="primary" disabled={disableButtonDongBangKe} onClick={openPopUpDongTai}>
            <i className="fa fa-download mr-2" />
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
          IV_TOR_TYPE={SipDataType.BANG_KE}
          IV_TO_LOC_ID=""
          IV_CUST_STATUS={SipDataState.TAO_MOI}
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
          IV_TOR_TYPE={SipDataType.BANG_KE}
        />
      </div>
    </>
  );
}

export default ChiTietNhomHangHoa;
