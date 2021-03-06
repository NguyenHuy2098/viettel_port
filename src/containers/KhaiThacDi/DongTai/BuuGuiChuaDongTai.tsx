import React, { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map, noop, get } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';

// eslint-disable-next-line max-lines-per-function
const BuuGuiChuaDongTai: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorBPOrg);

  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);
  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: event.target.value,
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: userMaBp,
      IV_CUST_STATUS: '101',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }

  function printBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('print', bangKe.TOR_ID);
    };
  }

  function editBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('edit', bangKe.TOR_ID);
    };
  }

  function deleteBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: bangKe.TOR_ID,
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
      if (!window.confirm('B???n c?? ch???c ch???n?')) return;
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onSuccess: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC1',
              IV_FR_LOC_ID: userMaBp,
              IV_CUST_STATUS: '101',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  }

  const columns = useMemo(
    () => [
      {
        Header: t('M?? t???i'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('??i???m ?????n'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('S??? l?????ng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Ng?????i nh???p'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ng??y nh???p'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi ch??'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Qu???n tr???'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={printBangKe(row.original)} title={t('In')}>
                <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={editBangKe(row.original)} title={t('S???a')}>
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={deleteBangKe(row.original)} title={t('X??a')}>
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(get(listBangKeChuaDongTai, ''), (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      PERSONAL: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY'),
      NOTE_OF: thisDescription ? thisDescription : '',
    };
  });
  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('T??m ki???m t???i')} onChange={handleSearch} />
            </div>
            <Button color="primary" className="ml-2">
              {t('T??m ki???m')}
            </Button>
            {/*_______________temporary hide because of no requirement______________*/}
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
              <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('T???ng s???')}: <span>{countBangKeChuaDongTai}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default BuuGuiChuaDongTai;
