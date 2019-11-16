import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Input, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { get, isEmpty, map, find } from 'lodash';
import { getPageItems } from 'utils/common';
import moment from 'moment';

import DataTable from 'components/DataTable';
import ButtonChonNhanVien from 'components/Button/ButtonChonNhanVien';
import { action_MIOA_ZTMI035 } from 'redux/MIOA_ZTMI035/actions';
import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';
import { action_MIOA_ZTMI055 } from 'redux/MIOA_ZTMI055/actions';
import { toast } from 'react-toastify';
import { action_MIOA_ZTMI054 } from 'redux/MIOA_ZTMI054/actions';
import { makeSelectorMaBP } from 'redux/auth/selectors';
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
  const [listPhanCongNhan, setListPhanCongNhan] = useState<API.RowResponseZTMI035[]>([]);
  const convertData = map(listPhanCongNhan, item => {
    return {
      ...item,
      Total_Charge: (parseFloat(item.COD || '0') + parseFloat(item.TOTAL_AMOUNT || '0')).toFixed(3),
      statusDisplay: getStatusDisplay(item.STATUS || ''),
    };
  });
  const [userIdSelected, setUserIdSelected] = useState<string | undefined>(undefined);

  const handleSelectUserChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') setUserIdSelected(undefined);
    else setUserIdSelected(event.currentTarget.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const pageItems = getPageItems();

  const dispatchAPI035 = useCallback(() => {
    dispatch(
      action_MIOA_ZTMI035(
        {
          row: {
            USER_ID: userIdSelected,
          },

          IV_PAGENO: '1',
          IV_NO_PER_PAGE: pageItems,
        },

        {
          onSuccess: (data: API.MIOAZTMI035Response): void => {
            setListPhanCongNhan(get(data, 'data.MT_ZTMI035_OUT.row', []));
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
            setDataSelected([]);
          },
        },
        { stateless: true },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  useEffect((): void => {
    if (isEmpty(userIdSelected)) {
      return;
    }
    dispatchAPI035();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected, pageItems]);

  // const handleCheckBoxItemData = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const value = event.target.value;
  //   const insideArray = find(dataSelected, item => item === value);
  //   if (!insideArray) setDataSelected([...dataSelected, value]);
  //   else setDataSelected(reject(dataSelected, item => item === value));
  // };

  const columns = useMemo(
    () => [
      // {
      //   id: 'select',
      //   Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
      //     console.log(row);
      //     return (
      //       <>
      //         <Label check>
      //           <Input
      //             type="checkbox"
      //             value={row.original.TRQ_ID || ''}
      //             checked={dataSelected.includes(row.original.TRQ_ID)}
      //             onChange={handleCheckBoxItemData}
      //           />
      //         </Label>
      //       </>
      //     );
      //   },
      // },
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
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'Created_on',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.CREATED_ON'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY');
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
      dispatch(
        action_MIOA_ZTMI055(
          {
            IV_PARTY_RCO: 'ZTM001',
            IV_TRQ_ID: map(dataSelected, item => {
              return {
                TRQ_ID: item,
              };
            }),
            IV_PARTY_ID: findBPFromUser(IV_PARTY_ID),
            IV_UNAME: userIdSelected,
          },
          {
            onFinish: (): void => {
              dispatchAPI035();
            },
          },
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIdSelected, dataSelected],
  );

  const disableButton = !listPhanCongNhan || listPhanCongNhan.length === 0;

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="select" className="pl-4" onChange={handleSelectUserChange}>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value={''}>{t('Chọn nhân viên')}</option>
                {map(listStaff, item => (
                  <option value={item.UNAME} key={item.UNAME}>
                    {item.NAME_TEXT}
                  </option>
                ))}
                {/* eslint-disable-next-line react/jsx-max-depth */}
                {/*<option value={'PM02'} key={'PM02'}>*/}
                {/*  User test (need remove)*/}
                {/*</option>*/}
              </Input>
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{listPhanCongNhan && listPhanCongNhan.length}</span>
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
        <DataTable columns={columns} data={convertData} showCheckboxes renderCheckboxValues={'LOC_ID'} />
      </Row>
    </>
  );
};

export default withRouter<Props & RouteComponentProps, React.ComponentType<Props & RouteComponentProps>>(PhanCongNhan);
