import React, { useMemo, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import produce from 'immer';
import { concat, get, includes, map, pull, size } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Search from 'components/Input/Search';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import Pagination from 'components/Pagination';
import ChonChuyenThuModal from 'components/SelectForwardingItemModal/Index';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorZTMI236OUTPagingTotalPage, makeSelectorZTMI236OUTRow } from 'redux/ZTMI236/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';
import { action_MIOA_ZTMI022 } from '../../../redux/MIOA_ZTMI022/actions';

interface Props {
  getListKienChuaDongChuyenThu: (IV_PAGENO?: number, IV_PACKAGE_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const KienChuaDongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListKienChuaDongChuyenThu } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showChonChuyenThuModal, setShowChonChuyenThuModal] = useState<boolean>(false);
  const [selectedKienIds, setSelectedKienIds] = useState<string[]>([]);
  const maBP = useSelector(makeSelectorMaBP);
  const userId = useSelector(makeSelectorPreferredUsername);
  const totalPage = useSelector(makeSelectorZTMI236OUTPagingTotalPage);
  const listKienChuaDongChuyenThu = useSelector(makeSelectorZTMI236OUTRow);

  const selectedKienItems = useMemo(
    () => map(selectedKienIds, (id: string) => ({ ITEM_ID: id, ITEM_TYPE: SipDataType.KIEN })),
    [selectedKienIds],
  );

  const onPaginationChange = ({ selected }: { selected: number }): void => {
    getListKienChuaDongChuyenThu(selected + 1);
  };

  const handleTimKiemKien = (searchText: string): void => {
    getListKienChuaDongChuyenThu(1, searchText);
  };

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    };
  };

  const handleChuyenVaoChuyenThu = (): void => {
    setShowChonChuyenThuModal(true);
  };

  const handleHideChonChuyenThuModal = (): void => {
    setShowChonChuyenThuModal(false);
  };

  const handleSelectKien = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const selectedKienId = event.currentTarget.value;
    if (includes(selectedKienIds, selectedKienId)) {
      setSelectedKienIds(produce(selectedKienIds, draftState => pull(draftState, selectedKienId)));
    } else {
      setSelectedKienIds(produce(selectedKienIds, draftState => concat(draftState, selectedKienId)));
    }
  };

  const handleSuccessChuyenThuAction = (): void => {
    getListKienChuaDongChuyenThu();
    setSelectedKienIds([]);
  };

  const handleDeleteKien = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.KIEN,
        IV_FR_LOC_ID: maBP,
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: SipDataState.TAO_MOI,
        IV_FR_DATE: moment()
          .subtract(1, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '20',
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
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  // eslint-disable-next-line max-lines-per-function
  const handleDongChuyenThu = (): void => {
    if (size(selectedKienItems) > 0) {
      const payloadTaoTaiMoi = {
        IV_FLAG: '1',
        IV_TOR_TYPE: SipDataType.CHUYEN_THU,
        IV_TOR_ID_CU: '',
        IV_SLOCATION: maBP,
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
                  IV_TOR_TYPE: SipDataType.CHUYEN_THU,
                  IV_TOR_ID_CU: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                  IV_SLOCATION: maBP,
                  IV_DLOCATION: '',
                  IV_DESCRIPTION: '',
                  T_ITEM: selectedKienItems,
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
                          const payloadDongChuyenThu = {
                            row: {
                              CU_NO: get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
                              FU_NO: '',
                              STATUS_ID: '1',
                              USER_ID: userId,
                              LOC_ID: maBP,
                            },
                          };
                          dispatch(
                            action_MIOA_ZTMI022(payloadDongChuyenThu, {
                              onSuccess: (data: API.MIOAZTMI022Response): void => {
                                if (data.Status) {
                                  if (data.ErrorCode === 1) {
                                    alert('Error at step 3');
                                    alert(get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
                                  } else {
                                    alert(t('Đóng chuyến thư thành công!'));
                                    handleSuccessChuyenThuAction();
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
      alert(t('Vui lòng chọn chuyến thư!'));
    }
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const freightUnit = get(row, 'original.FREIGHT_UNIT', '');
          return (
            <Label check>
              <Input
                defaultChecked={includes(selectedKienIds, freightUnit)}
                onClick={handleSelectKien}
                type="checkbox"
                value={freightUnit}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã kiện'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'NEXT_LOC',
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.CREADTED_ON'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={handleRedirectDetail(row.original)}>
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <ModalPopupConfirm handleDoSomething={handleDeleteKien} />
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKienIds],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col lg={4} xs={12}>
        <Search onSubmitSearch={handleTimKiemKien} placeholder={t('Tìm kiếm kiện')} />
      </Col>
      <Col lg={1}>
        <Button color="white" className="sipTitleRightBlockBtnIcon sipBoxShadow">
          <i className="fa fa-trash-o" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button className="mr-3" color="primary" onClick={handleChuyenVaoChuyenThu}>
          <i className="fa fa-folder mr-1" />
          {t('Chuyển vào CT')}
        </Button>
        <Button color="primary" onClick={handleDongChuyenThu}>
          <i className="fa fa-truck mr-1" />
          {t('Đóng CT')}
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listKienChuaDongChuyenThu} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
      <ChonChuyenThuModal
        onSuccessSelected={handleSuccessChuyenThuAction}
        visible={showChonChuyenThuModal}
        onHide={handleHideChonChuyenThuModal}
        modalTitle={t('Chọn chuyến thư')}
        forwardingItemList={selectedKienItems}
        IV_TOR_TYPE={SipDataType.CHUYEN_THU}
        IV_FR_LOC_ID={maBP}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
      />
    </>
  );
};

export default KienChuaDongChuyenThu;
