import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Input, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { get, map, find, size, toNumber } from 'lodash';
import { getPageItems } from 'utils/common';
// import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import ButtonChonNhanVien from 'components/Button/ButtonChonNhanVien';
import { action_MIOA_ZTMI035 } from 'redux/MIOA_ZTMI035/actions';
import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';
import { action_MIOA_ZTMI055 } from 'redux/MIOA_ZTMI055/actions';
import { toast } from 'react-toastify';
import { action_MIOA_ZTMI054 } from 'redux/MIOA_ZTMI054/actions';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import HttpRequestError from 'utils/HttpRequetsError';
import { toastError, toastSuccess } from 'components/Toast';
import ModalThemPhieugui from './ModalThemPhieuGui';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

  const getStatusDisplay = useCallback((statusCode: string) => {
    // if (statusCode === '301') return 'Chờ lấy hàng';
    return statusCode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dataSelected, setDataSelected] = useState<string[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.RowResponseZTMI035[]>([]);
  const convertData = map(listPhanCongNhan, item => {
    return {
      ...item,
      Total_Charge: (parseFloat(item.COD || '0') + parseFloat(item.TOTAL_AMOUNT || '0')).toFixed(3),
      statusDisplay: getStatusDisplay(item.STATUS || ''),
    };
  });
  const [userIdSelected, setUserIdSelected] = useState<string>('');

  const handleSelectUserChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdSelected(event.currentTarget.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageItems = getPageItems();

  useEffect((): void => {
    dispatchAPI035();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  const handleSearchUser = useCallback(() => {
    dispatchAPI035();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  const dispatchApi054 = (): void => {
    dispatch(
      action_MIOA_ZTMI054({
        iv_post: userMaBp,
        row: [
          {
            iv_position: 'NVBH',
          },
        ],
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      }),
    );
  };

  useEffect((): void => {
    dispatchApi054();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchAPI035 = useCallback(
    (payload = {}) => {
      if (userIdSelected) {
        dispatch(
          action_MIOA_ZTMI035(
            {
              row: {
                USER_ID: userIdSelected,
              },

              IV_PAGENO: '1',
              IV_NO_PER_PAGE: pageItems,
              ...payload,
            },

            {
              onSuccess: (data: API.MIOAZTMI035Response): void => {
                setListPhanCongNhan(get(data, 'data.MT_ZTMI035_OUT.row', []));
                setTotalPage(toNumber(get(data, 'data.MT_ZTMI035_OUT.PAGING[0].EV_TOTAL_PAGE', 0)));
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
                setListPhanCongNhan([]);
              },
              onFinish: (): void => {
                // setDataSelected([]);
              },
            },
            { stateless: true },
          ),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [userIdSelected, totalPage, pageItems],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_PAGENO: selectedItem.selected + 1,
    };
    dispatchAPI035(payload);
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Mã bưu gửi'),
        accessor: 'PACKET_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Địa chỉ nhận'),
        accessor: 'ADD_SHIPPER',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'Total_Charge',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${get(row, 'original.Total_Charge')} đ`;
        },
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'Created_on',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          // return moment(get(row, 'original.CREATED_ON'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY');
          return 'Thiếu Api';
        },
      },
      {
        Header: t('Trạng thái'),
        accessor: 'statusDisplay',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataSelected],
  );

  const listStaff = useSelector(makeSelectorGet_MT_ZTMI054_OUT);

  const findBPFromUser = (userName: string): string | undefined => {
    const user = find(listStaff, { UNAME: userName });
    if (user) return user.BP;
    return;
  };
  const handleSelectStaffChange = useCallback(
    (IV_PARTY_ID: string): void => {
      const payload055 = {
        IV_PARTY_RCO: 'ZTM001',
        IV_TRQ_ID: map(dataSelected, item => {
          return {
            TRQ_ID: item,
          };
        }),
        IV_PARTY_ID: findBPFromUser(IV_PARTY_ID),
        IV_UNAME: userIdSelected,
      };
      dispatch(
        action_MIOA_ZTMI055(payload055, {
          onSuccess: (data: API.MIOAZTMI055Response): void => {
            if (get(data, 'MT_ZTMI055_OUT.EV_ERROR') === 0) {
              toastError(get(data, 'MT_ZTMI055_OUT.RETURN_MESSAGE[0].MESSAGE', 'Có lỗi xảy ra'));
            } else {
              toastSuccess(get(data, 'MT_ZTMI055_OUT.RETURN_MESSAGE[0].MESSAGE', 'Thành công'));
            }
          },
          onFailure: (error: HttpRequestError): void => {
            if (error) {
              toastError(error.messages);
            } else {
              toastError(t('Lỗi không xác định khi chuyển vào.'));
            }
          },
          onFinish: (): void => {
            dispatchAPI035();
          },
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIdSelected, dataSelected],
  );

  const disableButton = size(listPhanCongNhan) === 0;

  const handleSelectTableItem = (selectedIds: string[]): void => {
    setDataSelected(selectedIds);
  };

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="select" className="pl-4" value={userIdSelected} onChange={handleSelectUserChange}>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value={''}>{t('Chọn nhân viên')}</option>
                {map(listStaff, item => (
                  <option value={item.UNAME} key={item.UNAME}>
                    {item.NAME_TEXT}
                  </option>
                ))}
              </Input>
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchUser} disabled={userIdSelected === ''}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{size(listPhanCongNhan)}</span>
          </p>
        </Col>
      </Row>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Danh sách phân công')}</h1>
        <div className="sipTitleRightBlock">
          <Button color="primary" disabled={disableButton}>
            <img className="mr-2" src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
            {t('In phiếu phân công')}
          </Button>
          <ButtonChonNhanVien
            onApplyChosen={handleSelectStaffChange}
            className="ml-2"
            color="primary"
            currentUserId={userIdSelected}
            disabled={disableButton || dataSelected.length === 0}
          />
          <ModalThemPhieugui disabled={disableButton} />
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={convertData}
          showCheckboxes
          onCheckedValuesChange={handleSelectTableItem}
          renderCheckboxValues={'LOC_ID'}
        />
        {size(convertData) > 0 && (
          <Pagination
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            onThisPaginationChange={onPaginationChange}
          />
        )}
      </Row>
    </>
  );
};

export default withRouter<Props & RouteComponentProps, React.ComponentType<Props & RouteComponentProps>>(PhanCongNhan);
