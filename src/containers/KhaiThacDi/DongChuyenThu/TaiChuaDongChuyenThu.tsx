/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { forEach, map, get, noop, size } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/DeleteConfirmModal';
import Pagination from 'components/Pagination';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

let forwardingItemList: ForwardingItem[] = [];

interface Props {
  getListTaiChuaDongChuyenThu: (IV_PAGENO?: number, IV_TOR_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiChuaDongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListTaiChuaDongChuyenThu } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listTaiChuaHoanThanh = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const userMaBp = useSelector(makeSelectorMaBP);
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
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

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoChuyenThu(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn tải!'));
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

  function onSuccessSelectedForwardingItem(): void {
    getListTaiChuaDongChuyenThu();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
    forwardingItemList = [];
  }

  useEffect((): void => {
    getListTaiChuaDongChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchTai(): void {
    getListTaiChuaDongChuyenThu(1, torIdSearch);
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
        onFinish: (): void => {
          getListTaiChuaDongChuyenThu();
        },
      }),
    );
  };

  //eslint-disable-next-line max-lines-per-function
  const handleDongChuyenThu = (): void => {
    if (size(forwardingItemListState) > 0) {
      const payloadTaoTaiMoi = {
        IV_FLAG: '1',
        IV_TOR_TYPE: 'ZC3',
        IV_TOR_ID_CU: '',
        IV_SLOCATION: userMaBp,
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
                  IV_TOR_TYPE: 'ZC3',
                  IV_TOR_ID_CU: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                  IV_SLOCATION: userMaBp,
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
                          dispatch(
                            action_MIOA_ZTMI022(
                              {
                                CU_NO: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                                STATUS_ID: '1',
                              },
                              {
                                onSuccess: (data: API.MIOAZTMI022Response): void => {
                                  if (data.Status) {
                                    if (data.ErrorCode === 1) {
                                      alert('Error at step 3');
                                      alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
                                    } else {
                                      alert(t('Đóng chuyến thư thành công!'));
                                      onSuccessSelectedForwardingItem();
                                    }
                                  } else {
                                    alert('Error at step 3');
                                    alert(data.Messages);
                                  }
                                },
                              },
                            ),
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
      alert(t('Vui lòng chọn chuyến thư!'));
    }
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiChuaHoanThanh],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListTaiChuaDongChuyenThu(selectedItem.selected + 1, torIdSearch);
  };

  function handleSelectTaiItem(event: React.FormEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC2' });
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
                onClick={handleSelectTaiItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải'),
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
        accessor: 'CREATED_BY',
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
  const data = map(listTaiChuaHoanThanh, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      CREATED_BY: item.CREATED_BY ? item.CREATED_BY : '',
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
                placeholder={t('Tìm kiếm tải')}
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
          <Button
            color="primary"
            className="ml-2 hide"
            onClick={handleChuyenVaoChuyenThu}
            disabled={disableFunctionalButton}
          >
            <i className="fa fa-download mr-2 rotate-90" />
            {t('Chuyển vào chuyến thư')}
          </Button>
          <Button color="primary" className="ml-2" onClick={handleDongChuyenThu} disabled={disableFunctionalButton}>
            <i className="fa fa-truck mr-2" />
            {t('Đóng chuyến thư')}
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
        modalTitle={t('Chọn chuyến thư')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE="ZC3"
        IV_FR_LOC_ID={userMaBp}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={101}
      />
    </>
  );
};

export default TaiChuaDongChuyenThu;
