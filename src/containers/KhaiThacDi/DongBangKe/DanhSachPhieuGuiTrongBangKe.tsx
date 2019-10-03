/* eslint-disable max-lines */
import React, { ChangeEvent, useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { findIndex, forEach, get, map, noop, slice, join, size, includes, toString, trim, toNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import moment from 'moment';

import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import DeleteConfirmModal from 'components/DeleteConfirmModal';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';

const forwardingItemList: ForwardingItem[] = [];

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dataBangKe = useSelector(makeSelector046RowFirstChild);
  const dataBangKeChild = useSelector(makeSelector046ListChildren);
  const listTai = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.TAO_MOI));
  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [disableButtonDongBangKe, setDisableButtonDongBangKe] = useState<boolean>(true);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [showDongBangKeVaoTaiPopup, setShowDongBangKeVaoTaiPopup] = useState<boolean>(false);
  const [showPopUpGanTaiVaoChuyenThu, setShowPopUpGanTaiVaoChuyenThu] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenthu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

  const [codePhieuGui, setCodePhieuGui] = useState<string>('');

  const payload046 = {
    IV_TOR_ID: idBangKe,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
  };

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  //_______________________SelectForwardingItemModal

  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [listUncheckForwardingItem, setListUncheckForwardingItem] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );

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

  useEffect((): void => {
    getListDiemDen();
    getListChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect((): void => {
    if (forwardingItemListState.length > 0) {
      setDisableButtonDongBangKe(false);
    } else {
      setDisableButtonDongBangKe(true);
    }
  }, [forwardingItemListState]);

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
    dispatch(action_MIOA_ZTMI046(payload046));
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
  }

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

  function isForwardingItemSelected(item: API.Child, listForwardingItemId: string[]): boolean {
    return includes(listForwardingItemId, item.TOR_ID);
  }

  useEffect((): void => {
    const listForwardingItemId = map(forwardingItemListState, item => item.ITEM_ID);
    const unSelectListForwardingItem: API.Child[] = [];
    forEach(dataBangKeChild, item => {
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
  }, [forwardingItemListState, dataBangKeChild]);
  //_____________________________________________________________________

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

  useEffect((): void => {
    getListTai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const handleDeleteForwardingOrder = (torId: string): void => {
    const payload = {
      IV_FLAG: IV_FLAG.XOA,
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

  useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

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

  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKeWithoutRemovePhieuGui = (taiID: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: toString(taiID),
          IV_SLOCATION: get(selectedTai, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedTai, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idBangKe,
              ITEM_TYPE: SipDataType.BANG_KE,
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
            if (toNumber(get(data, 'MT_ZTMI016_OUT')) === 1) {
            }
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra ')}
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

  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKeAfterRemovePhieuGui = (taiID: string): void => {
    const a = {
      IV_FLAG: IV_FLAG.REMOVE,
      IV_TOR_TYPE: SipDataType.BANG_KE,
      IV_TOR_ID_CU: idBangKe,
      IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
      IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
      IV_DESCRIPTION: '',
      T_ITEM: listUncheckForwardingItem,
    };
    // remove các phiếu gửi không được tích
    dispatch(
      action_MIOA_ZTMI016(a, {
        // eslint-disable-next-line max-lines-per-function
        onSuccess: (): void => {
          // gan bang ke vao tai
          dispatch(
            action_MIOA_ZTMI016(
              {
                IV_FLAG: IV_FLAG.SUA,
                IV_TOR_TYPE: SipDataType.TAI,
                IV_TOR_ID_CU: toString(taiID),
                IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
                IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
                IV_DESCRIPTION: '',
                T_ITEM: [
                  {
                    ITEM_ID: idBangKe,
                    ITEM_TYPE: SipDataType.BANG_KE,
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
        // eslint-disable-next-line max-lines-per-function
        onFinish: (): void => {
          getListPhieuGui();
        },
      }),
    );

    setShowDongBangKeVaoTaiPopup(false);
  };

  const handleActionDongBangKe = (taiID: string): void => {
    if (size(listUncheckForwardingItem) > 0) {
      handleActionDongBangKeAfterRemovePhieuGui(taiID);
    } else {
      handleActionDongBangKeWithoutRemovePhieuGui(taiID);
    }
    setShowDongBangKeVaoTaiPopup(false);
  };

  const handleActionDongBangKeVaoTaiCoSan = (): void => {
    handleActionDongBangKe(get(selectedTai, 'TOR_ID', ''));
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
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
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

  const dongTaiVoiChuyenThuCoSanAfterRemovePhieuGui = (maTaiVuaTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.REMOVE,
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: idBangKe,
          IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
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
                type: 'error',
              },
            );
          },
          onFinish: (): void => {
            getListPhieuGui();
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

  const addBangKeHienTaiVaoTaiMoiTao = (maTaiVuaTao: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''),
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
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          {/*________________temporary hide btn Chuyển because of lack of requirement____________*/}
          <Button className="hide" onClick={handleChuyenVaoBangKe} disabled={disableButtonDongBangKe}>
            <i className="fa fa-download rotate-90" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button onClick={openPopUpDongBangKeVaoTai} disabled={disableButtonDongBangKe}>
            <i className="fa fa-building-o" />
            {t('Đóng bảng kê')}
          </Button>
          <Button disabled={disableButtonDongBangKe} onClick={openPopUpDongTai}>
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
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">{get(dataBangKe, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataBangKe, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataBangKe, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(dataBangKe, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(dataBangKe, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {size(dataBangKeChild)}
        </Col>
      </Row>
    );
  }

  function handleChangeCodePhieuGui(e: ChangeEvent<HTMLInputElement>): void {
    setCodePhieuGui(e.target.value);
  }

  // eslint-disable-next-line max-lines-per-function
  function handleScanCodePhieuGui(): void {
    const checkIfDashExist = findIndex(codePhieuGui, (item: string): boolean => {
      return item === '_';
    });
    const payload031 = {
      FWO_ID: checkIfDashExist === -1 ? codePhieuGui : join(slice(codePhieuGui, 0, checkIfDashExist), ''),
      BUYER_REFERENCE_NUMBER: '',
    };
    dispatch(
      action_MIOA_ZTMI031(payload031, {
        // eslint-disable-next-line max-lines-per-function
        onSuccess: (data: API.MIOAZTMI031Response[]): void => {
          if (size(data) > 0) {
            const payload016 = {
              IV_FLAG: '2',
              IV_TOR_TYPE: 'ZC1',
              IV_TOR_ID_CU: idBangKe, //(mã bảng kê đang hiển thị)
              IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
              IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
              IV_DESCRIPTION: '',
              T_ITEM: [
                {
                  ITEM_ID: get(data, '[0].FREIGHT_UNIT', ''), //(mã Freight_unit lấy được từ API ZTMI031)
                  ITEM_TYPE: '',
                },
              ],
            };
            dispatch(
              action_MIOA_ZTMI016(payload016, {
                onSuccess: (data: API.MIOAZTMI016Response): void => {
                  if (data.Status) {
                    alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', ''));
                  } else {
                    alert(data.Messages);
                  }
                },
                onFailure: (error: HttpRequestErrorType): void => {
                  alert(error.messages);
                },
              }),
            );
          } else {
            alert(t('Không tìm thấy kết quả!'));
          }
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.messages);
        },
      }),
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input
              type="text"
              placeholder={t('Quét mã phiếu gửi')}
              onChange={handleChangeCodePhieuGui}
              value={codePhieuGui}
            />
          </div>
          <Button color="primary" className="ml-2" onClick={handleScanCodePhieuGui}>
            {t('Quét mã')}
          </Button>
        </div>
      </div>
    );
  }
  const dataTable = map(
    dataBangKeChild,
    (item: API.Child): API.Child => {
      const checkIfDashExistPackageId = findIndex(item.PACKAGE_ID, (item: string): boolean => {
        return item === '_';
      });
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        PACKAGE_ID: item.PACKAGE_ID
          ? checkIfDashExistPackageId === -1
            ? item.PACKAGE_ID
            : join(slice(item.PACKAGE_ID, 0, checkIfDashExistPackageId), '')
          : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format(' DD/MM/YYYY '),
      };
    },
  );

  function printTable(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent): void => {
      event.stopPropagation();
      noop('print', tai.TOR_ID);
    };
  }

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'TOR_ID',
        accessor: 'TOR_ID',
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
        Header: t('Mã phiếu gửi'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
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
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={printTable(row.original)}>
                <i className="fa fa-print fa-lg color-green" />
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

  const handleChonChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenthu(chuyenThu);
  };

  const handleChonTai = (tai: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedTai(tai);
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
          IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
          IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
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
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
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
            IV_SLOCATION: get(dataBangKe, 'LOG_LOCID_SRC', ''), //(Điểm đi của bảng kê)
            IV_DLOCATION: get(dataBangKe, 'LOG_LOCID_DES', ''), //(Điểm đến của bảng kê)
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
                  type: 'error',
                },
              );
            },
            onFinish: (): void => {
              getListPhieuGui();
            },
          },
        ),
      );
    };

    closePopUpDongTai();
  };

  return dataBangKe ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataTable} />
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
        modalTitle={t('Chọn bảng kê')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE={SipDataType.BANG_KE}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
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
export default DanhSachPhieuGuiTrongBangKe;
