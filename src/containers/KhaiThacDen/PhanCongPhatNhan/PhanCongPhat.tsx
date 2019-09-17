import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Input, Label, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { map, find, reject } from 'lodash';
// import moment from 'moment';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI040 } from 'redux/MIOA_ZTMI040/actions';
import { selectPhanCongPhat } from 'redux/MIOA_ZTMI040/selectors';
import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';
import { action_MIOA_ZTMI055 } from 'redux/MIOA_ZTMI055/actions';
import ModalThemPhieuGui from './ModalThemPhieuGui';
import ModalChonNhanVien from './ModalChonNhanVien';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongPhat: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getStatusDisplay = useCallback((statusCode: string) => {
    // if (statusCode === '605') return 'Chờ phát';
    // if (statusCode === '805') return 'Duyệt hoàn';
    return statusCode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dataSelected, setDataSelected] = useState<string[]>([]);
  const [userIdSelected, setUserIdSelected] = useState<string | undefined>(undefined);
  const listPhanCongPhat = useSelector(selectPhanCongPhat);
  const convertData = map(listPhanCongPhat, item => {
    return {
      ...item,
      Total_Charge: (parseFloat(item.COD || '0') + parseFloat(item.Freight_charge || '0')).toFixed(3),
      statusDisplay: getStatusDisplay(item.Status || ''),
    };
  });

  const listStaff = useSelector(makeSelectorGet_MT_ZTMI054_OUT);

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
                  value={row.original.FWO}
                  checked={dataSelected.includes(row.original.FWO)}
                  onChange={handleCheckBoxItemData}
                />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'Package_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Địa chỉ phát'),
        accessor: 'Receiver_address',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'Total_Charge',
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'Created_on',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'statusDisplay',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataSelected],
  );

  const dispatchGetListPhieuGui = useCallback(() => {
    dispatch(
      action_MIOA_ZTMI040(
        {
          FU_STATUS: '604,806',
          Delivery_postman: userIdSelected,
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '50',
          Vourcher: 'N',
          Return: 'N',
        },
        {
          onFinish: () => {
            setDataSelected([]);
          },
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  useEffect(() => {
    dispatchGetListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSelected]);

  const handleSelectUserChange = useCallback(event => {
    if (event.target.value === '') setUserIdSelected(undefined);
    setUserIdSelected(event.target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectStaffChange = useCallback(
    (IV_PARTY_ID: string): void => {
      const a = {
        IV_PARTY_RCO: 'ZTM002',
        IV_TRQ_ID: map(dataSelected, item => {
          return {
            TRQ_ID: item,
          };
        }),
        // IV_PARTY_ID: IV_PARTY_ID,
        IV_PARTY_ID: '3006',
        // IV_UNAME: userIdSelected,
        // ma nhan vien lay tu sso token
        IV_UNAME: 'YenPh',
      };
      dispatch(
        action_MIOA_ZTMI055(a, {
          onFinish: () => {
            dispatchGetListPhieuGui();
          },
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIdSelected, dataSelected],
  );
  const disableButton = listPhanCongPhat.length === 0;

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
                {/*eslint-disable-next-line react/jsx-max-depth*/}
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
            {t('Tổng số')}: <span>{listPhanCongPhat.length}</span>
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
          <ModalThemPhieuGui disabled={disableButton} />
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={convertData} />
      </Row>
    </>
  );
};

export default withRouter<Props & RouteComponentProps, React.ComponentType<Props & RouteComponentProps>>(PhanCongPhat);
