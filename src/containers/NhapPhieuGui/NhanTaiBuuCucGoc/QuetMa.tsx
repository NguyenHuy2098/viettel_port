import React, { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Row } from 'reactstrap';
import { get } from 'lodash';
import { Cell } from 'react-table';
import moment from 'moment';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI063 } from 'redux/MIOA_ZTMI063/actions';
import { action_MIOA_ZTMI235 } from 'redux/ZTMI235/actions';
import { action_ZTMI239 } from 'redux/ZTMI239/actions';
import { makeSelectorListChuyenThu } from 'redux/MIOA_ZTMI023/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { toast } from 'react-toastify';

interface Props {
  handleChangeTab: (tab: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const QuetMa: React.FC<Props> = ({ handleChangeTab }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataNhanChuyenThu = useSelector(makeSelectorListChuyenThu);
  const userMaBp = useSelector(makeSelectorMaBP);
  const userId = useSelector(makeSelectorPreferredUsername);

  const [codeChuyenThu, setCodeChuyenThu] = useState<string>('');

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
            if (data.Status) {
              if (data.ErrorCode === 1) {
                toast(
                  <>
                    <i className="fa fa-window-close-o mr-2" />
                    {get(data, 'MT_ZTMI023_OUT.RETURN_MESSAGE[0].MESSAGE', t('Đã có lỗi xảy ra '))}
                  </>,
                  {
                    type: 'error',
                  },
                );
              } else {
                if (get(data, 'MT_ZTMI023_OUT.row[0].EXT_LOG_ID', '') === userMaBp) {
                  const data023 = get(data, 'MT_ZTMI023_OUT.row[0]', '');
                  dispatch(
                    action_MIOA_ZTMI063(
                      {
                        row: {
                          TOR_ID: get(data023, 'TOR_ID', ''),
                        },
                        IV_LOC_ID: userMaBp,
                        IV_USER: userId,
                      },
                      {
                        // eslint-disable-next-line max-lines-per-function
                        onSuccess: (data: API.MIOAZTMI063Response): void => {
                          if (data.Status) {
                            const payload235 = {
                              MaBuuPham: get(data023, 'PACKAGE_ID', ''),
                              GTC: get(data023, 'DEFINE_GTC', ''),
                              COMTYPE: get(data023, 'CCODE_TYPE', ''),
                              NHOMDICHVU: get(data023, 'SERVGROUP', ''),
                              LOAIDICHVU: get(data023, 'TRANSSRVREQ_CODE', ''),
                              DIEMDI: get(data023, 'RECENT_LOC', ''),
                              TINHDEN: get(data023, 'DEST_LOC', ''),
                            };
                            // const payload235 = {
                            //   MaBuuPham: '2100030867',
                            //   GTC: 'Y',
                            //   COMTYPE: 'V3',
                            //   NHOMDICHVU: 'V02',
                            //   LOAIDICHVU: 'VTH',
                            //   DIEMDI: 'HCM',
                            //   TINHDEN: 'HNI',
                            // };
                            dispatch(
                              action_MIOA_ZTMI235(payload235, {
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
                                        toast(
                                          <>
                                            <i className="fa fa-window-close-o mr-2" />
                                            {get(data, 'MT_ZTMI239_OUT.RETURN_MESSAGE[0].MESSAGE', t('Thành công!'))}
                                          </>,
                                          {
                                            type: 'success',
                                          },
                                        );
                                        handleChangeTab(2);
                                      },
                                      onFailure: (error: HttpRequestErrorType): void => {
                                        toast(
                                          <>
                                            <i className="fa fa-window-close-o mr-2" />
                                            {get(error, 'messages', t('Đã có lỗi xảy ra '))}
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
                          } else {
                            toast(
                              <>
                                <i className="fa fa-window-close-o mr-2" />
                                {get(data, 'Messages', t('Đã có lỗi xảy ra '))}
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
                              {get(error, 'messages', t('Đã có lỗi xảy ra '))}
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
                  toast(
                    <>
                      <i className="fa fa-window-close-o mr-2" />
                      {t('EXT_LOG_ID không khớp với bưu cục hiện tại')}
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
                  {get(data, 'Messages', t('Đã có lỗi xảy ra '))}
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
                {get(error, 'messages', t('Đã có lỗi xảy ra '))}
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
        Header: t('Số vận đơn'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const weight = parseFloat(get(row, 'values.GRO_WEI_VAL', '')).toFixed(2);
          return <>{weight}</>;
        },
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const date = get(row, 'values.CREATED_ON', '');
          return <>{moment(date, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY ')}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataNhanChuyenThu],
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
            placeholder="Quét mã phiếu gửi"
          />
          <Button onClick={handleSearchCodeChuyenThu} color="primary">
            Quét mã
          </Button>
        </div>
        <p className="pull-right m-0">Tổng số: 50</p>
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
