import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Input, Label, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { map, find, reject } from 'lodash';

import DataTable from 'components/DataTable';
import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';
import { action_MIOA_ZTMI035 } from 'redux/MIOA_ZTMI035/actions';
import { selectPhanCongNhan } from 'redux/MIOA_ZTMI035/selectors';
import { action_MIOA_ZTMI055 } from 'redux/MIOA_ZTMI055/actions';
import ModalChonNhanVien from './ModalChonNhanVien';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();

  const getStatusDisplay = useCallback((statusCode: string) => {
    // if (statusCode === '301') return 'Chờ lấy hàng';
    return statusCode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const [dataSelected, setDataSelected] = useState<string[]>([]);
  const listPhanCongNhan = useSelector(selectPhanCongNhan);
  const convertData = map(listPhanCongNhan, item => {
    return {
      ...item,
      Total_Charge: (parseFloat(item.COD || '0') + parseFloat(item.TOTAL_AMOUNT || '0')).toFixed(3),
      statusDisplay: getStatusDisplay(item.STATUS || ''),
    };
  });
  const [userIdSelected, setUserIdSelected] = useState<string | undefined>(undefined);

  const handleSelectUserChange = useCallback(event => {
    if (event.target.value === '') setUserIdSelected(undefined);
    setUserIdSelected(event.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchAPI035 = useCallback(() => {
    dispatch(
      action_MIOA_ZTMI035(
        {
          row: [
            {
              USER_ID: userIdSelected,
            },
          ],
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '11',
        },
        {
          onFinish: (): void => {
            setDataSelected([]);
          },
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  useEffect((): void => {
    dispatchAPI035();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  const handleCheckBoxItemData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const insideArray = find(dataSelected, item => item === value);
    if (!insideArray) setDataSelected([...dataSelected, value]);
    else setDataSelected(reject(dataSelected, item => item === value));
  };
  const columns = useMemo(
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Label check>
                <Input
                  type="checkbox"
                  value={row.original.TRQ_ID || ''}
                  checked={dataSelected.includes(row.original.TRQ_ID)}
                  onChange={handleCheckBoxItemData}
                />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
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
        Header: t('Địa chỉ phát'),
        accessor: 'ADD_SHIPPER',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'Total_Charge',
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'Created_on',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thiếu Api</>;
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
                <option value="">{t('Chọn nhân viên')}</option>
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
        <h1 className="sipTitle">Danh sách phân công</h1>
        <div className="sipTitleRightBlock">
          <Button disabled={disableButton}>
            <i className="fa fa-print" />
            In phiếu phân công
          </Button>
          <ModalChonNhanVien
            onApplyChoosen={handleSelectStaffChange}
            disabled={disableButton || dataSelected.length === 0}
            currentUserId={userIdSelected}
          />
          {/*<ModalThemPhieuGui disabled={disableButton} />*/}
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={convertData} />
      </Row>
    </>
  );
};

export default withRouter<Props & RouteComponentProps, React.ComponentType<Props & RouteComponentProps>>(PhanCongNhan);
