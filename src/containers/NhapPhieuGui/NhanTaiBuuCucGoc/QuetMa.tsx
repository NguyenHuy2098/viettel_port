/* eslint-disable max-lines */
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Row } from 'reactstrap';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import { get, toString, map } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI063 } from 'redux/MIOA_ZTMI063/actions';
import { action_MIOA_ZTMI235 } from 'redux/ZTMI235/actions';
import { action_ZTMI239 } from 'redux/ZTMI239/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import { action_ZTMI240 } from 'redux/ZTMI240/actions';
import { SipDataState, SipDataType } from 'utils/enums';

// eslint-disable-next-line max-lines-per-function
const QuetMa: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const _dataNhanChuyenThu = useSelector(makeSelectorListChuyenThu);
  const userMaBp = useSelector(makeSelectorBPOrg);
  const userId = useSelector(makeSelectorPreferredUsername);
  const [dataNhanChuyenThu, setDataNhanChuyenThu] = useState<API.RowResponseZTMI023OUT[]>([]);
  const [codeChuyenThu, setCodeChuyenThu] = useState<string>('');
  const [totalRecords, setTotalRecords] = useState(0);

  // eslint-disable-next-line max-lines-per-function
  function handleSearchCodeChuyenThu(): void {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: codeChuyenThu,
        },
        {
          // eslint-disable-next-line max-lines-per-function
          onSuccess: (data: API.MIOAZTMI023Response): void => {
            const dataChuyenThu = data;
            if (data.Status) {
              if (data.ErrorCode === 1) {
                toast(
                  <>
                    <i className="fa fa-window-close-o mr-2" />
                    {get(data, 'MT_ZTMI023_OUT.RETURN_MESSAGE[0].MESSAGE', t('???? c?? l???i x???y ra '))}
                  </>,
                  {
                    type: 'error',
                  },
                );
              } else {
                if (get(data, 'MT_ZTMI023_OUT.row[0].TO_LOG_ID', '').search(userMaBp) !== -1) {
                  if (get(data, 'MT_ZTMI023_OUT.row[0].ZVTP_CUST_STATUS', 0) === 304) {
                    const data023 = get(data, 'MT_ZTMI023_OUT.row[0]', '');
                    dispatch(
                      action_MIOA_ZTMI063(
                        {
                          row: [{
                            TOR_ID: get(data023, 'TOR_ID', ''),
                          }],
                          IV_LOC_ID: userMaBp,
                          IV_USER: userId,
                        },
                        {
                          // eslint-disable-next-line max-lines-per-function
                          onSuccess: (data: API.MIOAZTMI063Response): void => {
                            if (data.Status) {
                              if (get(data023, 'TOR_TYPE', '') === 'ZBIG') {
                                toast(
                                  <>
                                    <i className="fa fa-check-square mr-2" />
                                    {t('Qu??t b??u g???i')} {get(data023, 'PACKAGE_ID', '')} {t('th??nh c??ng')}
                                  </>,
                                  {
                                    type: 'success',
                                  },
                                );
                                dispatch(
                                  action_ZTMI240({
                                    IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
                                  }),
                                );
                              } else {
                                const payload235 = {
                                  mabuupham: get(data023, 'PACKAGE_ID', ''),
                                  gtc: get(data023, 'DEFINE_GTC', ''),
                                  comtype: get(data023, 'CCODE_TYPE', ''),
                                  nhomdichvu: get(data023, 'SERVGROUP', ''),
                                  loaidichvu: get(data023, 'TRANSSRVREQ_CODE', ''),
                                  diemdi: get(data023, 'RECENT_LOC', ''),
                                  tinhden: get(data023, 'DEST_LOC', ''),
                                };
                                dispatch(
                                  action_MIOA_ZTMI235(payload235, {
                                    // eslint-disable-next-line max-lines-per-function
                                    onSuccess: (data: ZTMI235Response): void => {
                                      const payload239 = {
                                        IV_PACKAGE_ID: codeChuyenThu,
                                        IV_FLAG: '1',
                                        IV_USER: userId,
                                        IV_COMMODITY: get(data, 'loaiHangHoa', ''),
                                        IV_SERVICE: get(data, 'loaiDichVu', ''),
                                        IV_LINE: get(data, 'line', ''),
                                        IV_MANIFEST_LOC: get(data, 'dongBangKe', ''),
                                      };
                                      dispatch(
                                        action_ZTMI239(payload239, {
                                          onSuccess: (data: API.ZTMI239Response): void => {
                                            dataNhanChuyenThu.push(get(dataChuyenThu, 'MT_ZTMI023_OUT.row[0]', {}));
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            const data1 = map(dataNhanChuyenThu, (item: any) => {
                                              return item;
                                            });
                                            // setDataNhanChuyenThu(get(dataChuyenThu, 'MT_ZTMI023_OUT.row', []));
                                            setDataNhanChuyenThu(data1);
                                            setTotalRecords(data1.length);
                                            setTimeout(function() {
                                              const thisId = get(data, 'MT_ZTMI239_OUT.PACKAGE_ID', '');
                                              toast(
                                                <>
                                                  <i className="fa fa-check-square mr-2" />
                                                  {t('Qu??t b??u g???i')} {thisId} {t('th??nh c??ng')}
                                                </>,
                                                {
                                                  type: 'success',
                                                },
                                              );
                                              dispatch(
                                                action_ZTMI240({
                                                  IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
                                                }),
                                              );
                                            }, 2000);
                                          },
                                          onFailure: (error: HttpRequestErrorType): void => {
                                            toast(
                                              <>
                                                <i className="fa fa-window-close-o mr-2" />
                                                {get(error, 'messages', t('???? c?? l???i x???y ra '))}
                                              </>,
                                              {
                                                type: 'error',
                                              },
                                            );
                                          },
                                          onFinish: (): void => {
                                            setCodeChuyenThu('');
                                          },
                                        }),
                                      );
                                    },
                                  }),
                                );
                              }
                            } else {
                              toast(
                                <>
                                  <i className="fa fa-window-close-o mr-2" />
                                  {get(data, 'Messages', t('???? c?? l???i x???y ra '))}
                                </>,
                                {
                                  type: 'error',
                                },
                              );
                            }
                          },
                          onFailure: (error: HttpRequestErrorType): void => {
                            toast(
                              <>
                                <i className="fa fa-window-close-o mr-2" />
                                {get(error, 'messages', t('???? c?? l???i x???y ra '))}
                              </>,
                              {
                                type: 'error',
                              },
                            );
                            setCodeChuyenThu('');
                          },
                        },
                      ),
                    );
                  } else {
                    setCodeChuyenThu('');
                    toast(
                      <>
                        <i className="fa fa-window-close-o mr-2" />
                        {t('B??u g???i kh??ng h???p l???')}
                      </>,
                      {
                        type: 'error',
                      },
                    );
                  }
                } else {
                  toast(
                    <>
                      <i className="fa fa-window-close-o mr-2" />
                      {t('TO_LOG_ID kh??ng kh???p v???i b??u c???c hi???n t???i')}
                    </>,
                    {
                      type: 'error',
                    },
                  );
                }
              }
            } else {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(data, 'Messages', t('???? c?? l???i x???y ra '))}
                </>,
                {
                  type: 'error',
                },
              );
            }
          },
          onFailure: (error: HttpRequestErrorType): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'message', t('???? c?? l???i x???y ra '))}
              </>,
              {
                type: 'error',
              },
            );
            setCodeChuyenThu('');
          },
        },
      ),
    );
  }

  function handleChangeCodeChuyenThu(e: ChangeEvent<HTMLInputElement>): void {
    setCodeChuyenThu(e.target.value);
  }

  const handleKeyPressCodeChuyenThu = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13) {
      handleSearchCodeChuyenThu();
    }
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('S??? v???n ????n'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          if (get(row, 'original.TOR_TYPE', '') === SipDataType.BUU_GUI) {
            return get(row, 'original.PACKAGE_ID', '');
          }
          return get(row, 'original.TOR_ID', '');
        },
        accessor: 'TOR_ID',
      },
      {
        Header: t('B??u c???c ?????n'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thi???u Api</>;
        },
      },
      {
        Header: t('S??? l?????ng'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return get(row, 'original.CHILD_COUNT', '');
        },
      },
      {
        Header: t('Tr???ng l?????ng'),
        accessor: 'GRO_WEI_VAL',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const weight = parseFloat(get(row, 'values.GRO_WEI_VAL', '')).toFixed(2);
          return <>{weight}</>;
        },
      },
      {
        Header: t('Ng??y g???i'),
        accessor: 'CREATED_ON',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const date = get(row, 'values.CREATED_ON', '');
          return <>{moment(date, 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY')}</>;
        },
      },
      {
        Header: t('Qu???n tr???'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" title={t('S???a')}>
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon" title={t('X??a')}>
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
  function renderForwardingOrderCodeScan(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input
            value={codeChuyenThu}
            onChange={handleChangeCodeChuyenThu}
            onKeyPress={handleKeyPressCodeChuyenThu}
            type="text"
            placeholder="Qu??t m?? b??u g???i"
          />
          <Button onClick={handleSearchCodeChuyenThu} color="primary">
            Qu??t m??
          </Button>
        </div>
        <p className="pull-right m-0">T???ng s???: {totalRecords}</p>
      </div>
    );
  }
  return (
    <>
      {renderForwardingOrderCodeScan()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataNhanChuyenThu} />
      </Row>
    </>
  );
};

export default QuetMa;
