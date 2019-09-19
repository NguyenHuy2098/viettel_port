/* eslint-disable max-lines */
import React, { ChangeEvent, useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { findIndex, find, forEach, get, map, noop, slice, join, size, includes, isNil, toString } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import moment from 'moment';
import DeleteConfirmModal from 'components/DeleteConfirmModal/Index';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal/Index';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { makeSelectorGet_MT_ZTMI045_OUT } from 'redux/MIOA_ZTMI045/selectors';

const forwardingItemList: ForwardingItem[] = [];

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dataBangKe = useSelector(makeSelector046RowFirstChild);
  const dataBangKeChild = useSelector(makeSelector046ListChildren);
  const listDichVu = useSelector(makeSelectorGet_MT_ZTMI045_OUT);
  const listTai = useSelector(makeSelectorRow('ZC2', 101));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [disableButtonDongBangKe, setDisableButtonDongBangKe] = useState<boolean>(true);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [showDongBangKeVaoTaiPopup, setShowDongBangKeVaoTaiPopup] = useState<boolean>(false);

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
  const [newTaiId, setnewTaiId] = useState<string>('');

  const getListDichVu = (): void => {
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
    getListDichVu();
  }, []);

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
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC1' });
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
        IV_TOR_TYPE: 'ZC2',
        IV_FR_LOC_ID: 'BDH',
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: '101',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  useEffect((): void => {
    getListTai();
  }, []);

  const taoTaiMoi = (placeName: string, ghiChu: string): void => {
    const place = find(listDichVu, ['DESCR40', placeName]);
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: '1',
          IV_TOR_TYPE: 'ZC2',
          IV_TOR_ID_CU: '',
          IV_SLOCATION: 'BHD',
          IV_DLOCATION: get(place, 'LOCNO') || '',
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
              setnewTaiId(get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU'));
            }
          },

          onFailure: (error: Error): void => {
            alert(error.message);
          },
        },
      ),
    );
  };
  useEffect((): void => {
    if (toString(newTaiId).length > 0) {
      handleActionDongBangKe(newTaiId);
    }
  }, [newTaiId]);

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

  const handleActionDongBangKeWithoutRemovePhieuGui = (taiID: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: '2',
          IV_TOR_TYPE: 'ZC2',
          IV_TOR_ID_CU: taiID,
          IV_SLOCATION: 'BDH',
          IV_DLOCATION: 'HUB1',
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idBangKe,
              ITEM_TYPE: 'ZC1',
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE'));
          },
          onFailure: (error: Error): void => {
            alert(t('Đã có lỗi xảy ra'));
          },
        },
      ),
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const handleActionDongBangKeAfterRemovePhieuGui = (taiID: string): void => {
    const a = {
      IV_FLAG: '4',
      IV_TOR_TYPE: 'ZC1',
      IV_TOR_ID_CU: idBangKe,
      IV_SLOCATION: 'BDH',
      IV_DLOCATION: 'HUB1',
      IV_DESCRIPTION: '',
      T_ITEM: listUncheckForwardingItem,
    };
    dispatch(
      action_MIOA_ZTMI016(a, {
        onSuccess: (): void => {
          dispatch(
            action_MIOA_ZTMI016(
              {
                IV_FLAG: '2',
                IV_TOR_TYPE: 'ZC2',
                IV_TOR_ID_CU: toString(taiID),
                IV_SLOCATION: 'BDH',
                IV_DLOCATION: 'HUB1',
                IV_DESCRIPTION: '',
                T_ITEM: [
                  {
                    ITEM_ID: idBangKe,
                    ITEM_TYPE: 'ZC1',
                  },
                ],
              },
              {
                onSuccess: (data: API.MIOAZTMI016Response): void => {
                  getListPhieuGui();
                  if (size(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE')) > 0) {
                    alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE'));
                  }
                },
                onFailure: (error: Error): void => {
                  alert(error.message);
                },
              },
            ),
          );
        },
        onFailure: (error: Error): void => {
          if (isNil(get(error, 'messages[0]'))) {
            alert(get(error, 'messages[0]'));
          }
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
          <Button onClick={handleChuyenVaoBangKe}>
            <i className="fa fa-download rotate-90" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button onClick={openPopUpDongBangKeVaoTai} disabled={disableButtonDongBangKe}>
            <i className="fa fa-building-o" />
            {t('Đóng bảng kê')}
          </Button>
          <Button>
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
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
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
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID',
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
        modalTitle={t('Chọn tải')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE="ZC1"
        TorTypeChuyenVao="ZC2"
        IV_FR_LOC_ID={get(dataBangKe, 'LOG_LOCID_DES', '')}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={101}
      />
      <ModalTwoTab
        onHide={closePopUpDongBangKeVaoTai}
        visible={showDongBangKeVaoTaiPopup}
        modalTitle="Gán bảng kê vào tải"
        firstTabTitle={'Chọn tải'}
        secondTabTitle={'Tạo tải mới'}
        tab1Contents={listTai}
        onSubmitButton1={handleActionDongBangKe}
        onSubmitButton2={taoTaiMoi}
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
