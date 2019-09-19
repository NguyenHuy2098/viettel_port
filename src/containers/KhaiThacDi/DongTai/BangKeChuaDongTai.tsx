/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { forEach, map, get, noop, size, toString, trim } from 'lodash';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { push } from 'connected-react-router';

import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import DeleteConfirmModal from 'components/DeleteConfirmModal/Index';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { generatePath } from 'react-router-dom';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal/Index';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';

let forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
const BangKeChuaDongTai: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  forwardingItemList = [];

  const listBangKeChuaDongTai = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

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

  const getListTai = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: 'BDH',
          IV_CUST_STATUS: '101',
          IV_FR_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
          IV_TO_DATE: trim(toString(moment().format(' YYYYMMDD'))),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...payload,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  function onSuccessSelectedForwardingItem(): void {
    getListTai();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
  }

  useEffect((): void => getListTai(), [getListTai]);

  function handleSearchTai(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListTai(payload);
  }

  function printTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent): void => {
      event.stopPropagation();
      noop('print', tai.TOR_ID);
    };
  }

  function editTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('edit', tai.TOR_ID);
    };
  }

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
  const handleDongTai = (): void => {
    if (size(forwardingItemListState) > 0) {
      const payloadTaoTaiMoi = {
        IV_FLAG: '1',
        IV_TOR_TYPE: 'ZC2',
        IV_TOR_ID_CU: '',
        IV_SLOCATION: 'BHD',
        IV_DLOCATION: 'HUB1',
        IV_DESCRIPTION: '',
        T_ITEM: [
          {
            ITEM_ID: '',
            ITEM_TYPE: '',
          },
        ],
      };
      dispatch(
        action_MIOA_ZTMI016(payloadTaoTaiMoi, {
          //eslint-disable-next-line max-lines-per-function
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            if (data.Status) {
              if (data.ErrorCode === 1) {
                alert('Error at step 1');
                alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
              } else {
                const payloadGanBangKeVaoTai = {
                  IV_FLAG: '2',
                  IV_TOR_TYPE: 'ZC2',
                  IV_TOR_ID_CU: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                  IV_SLOCATION: 'BHD',
                  IV_DLOCATION: 'HUB1',
                  IV_DESCRIPTION: '',
                  T_ITEM: forwardingItemListState,
                };
                dispatch(
                  action_MIOA_ZTMI016(payloadGanBangKeVaoTai, {
                    //eslint-disable-next-line max-lines-per-function
                    onSuccess: (data: API.MIOAZTMI016Response): void => {
                      if (data.Status) {
                        if (data.ErrorCode === 1) {
                          alert('Error at step 2');
                          alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
                        } else {
                          const idTaoChuyenThu = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
                          const payloadTaoChuyenThu = {
                            IV_FLAG: '1',
                            IV_TOR_TYPE: 'ZC3',
                            IV_TOR_ID_CU: '',
                            IV_SLOCATION: 'BHD',
                            IV_DLOCATION: 'HUB1',
                            IV_DESCRIPTION: '',
                            T_ITEM: [
                              {
                                ITEM_ID: '',
                                ITEM_TYPE: '',
                              },
                            ],
                          };
                          dispatch(
                            action_MIOA_ZTMI016(payloadTaoChuyenThu, {
                              onSuccess: (data: API.MIOAZTMI016Response): void => {
                                if (data.Status) {
                                  if (data.ErrorCode === 1) {
                                    alert('Error at step 3');
                                    alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
                                  } else {
                                    const payloadGanTaiVaoChuyenThu = {
                                      IV_FLAG: '2',
                                      IV_TOR_TYPE: 'ZC3',
                                      IV_TOR_ID_CU: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                                      IV_SLOCATION: 'BHD',
                                      IV_DLOCATION: 'HUB1',
                                      IV_DESCRIPTION: '',
                                      T_ITEM: [
                                        {
                                          ITEM_ID: idTaoChuyenThu,
                                          ITEM_TYPE: 'ZC2',
                                        },
                                      ],
                                    };
                                    dispatch(
                                      action_MIOA_ZTMI016(payloadGanTaiVaoChuyenThu, {
                                        onSuccess: (data: API.MIOAZTMI016Response): void => {
                                          if (data.Status) {
                                            if (data.ErrorCode === 1) {
                                              alert('Error at step 4');
                                              alert(
                                                get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'),
                                              );
                                            } else {
                                              alert(t('Đóng tải thành công!'));
                                              onSuccessSelectedForwardingItem();
                                            }
                                          } else {
                                            alert('Error at step 4');
                                            alert(data.Messages);
                                          }
                                        },
                                      }),
                                    );
                                  }
                                } else {
                                  alert('Error at step 3');
                                  alert(data.Messages);
                                }
                              },
                            }),
                          );
                        }
                      } else {
                        alert('Error at step 2');
                        alert(data.Messages);
                      }
                    },
                  }),
                );
              }
            } else {
              alert('Error at step 1');
              alert(data.Messages);
            }
          },
        }),
      );
    } else {
      alert(t('Vui lòng chọn bảng kê!'));
    }
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

  function handleSelectBangKeItem(event: React.FormEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC1' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (item.ITEM_ID === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState(forwardingItemList);
  }

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
              <Button className="SipTableFunctionIcon" onClick={printTai(row.original)}>
                <i className="fa fa-print fa-lg color-green" />
              </Button>
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
          <Button color="primary" className="ml-2" onClick={handleChuyenVaoTai}>
            <i className="fa fa-cloud-download mr-2 rotate-90"></i>
            {t('Chuyển vào tải')}
          </Button>
          <Button color="primary" className="ml-2" onClick={handleDongTai}>
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
        IV_TOR_TYPE="ZC2"
        IV_FR_LOC_ID="BDH"
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={101}
      />
    </>
  );
};

export default BangKeChuaDongTai;
