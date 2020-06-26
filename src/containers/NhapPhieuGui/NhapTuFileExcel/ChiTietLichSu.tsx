import React, { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Button } from 'reactstrap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectorBPOrg, makeSelectorBPCode } from 'redux/GetProfileByUsername/selectors';
import { get, map } from 'lodash';
import { action_HISTORY_DETAIL } from 'redux/GetHistoryDetail/actions';
import { match, Link, generatePath } from 'react-router-dom';
import Pagination from 'components/Pagination/PaginationExcel';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';
import { action_CHECK_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';

interface Props {
  match: match;
}
// eslint-disable-next-line max-lines-per-function
const ChiTietLichSu: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataDetail, setDataDetail] = useState<any[]>([]);
  const userMaBp = useSelector(makeSelectorBPOrg);
  const userId = useSelector(makeSelectorBPCode);
  const dt_upload = get(props, 'match.params.created_dt', '');
  const id = get(props, 'match.params.id', '');
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);
  //  const [packageId, setPackageId] = useState<string>('');
  const handleRedirectUploadFile = useCallback((): void => {
    dispatch(push(generatePath(routesMap.NHAP_TU_FILE_EXCEL)));
  }, [dispatch]);

  React.useEffect((): void => {
    const max = pageCurrent * 10 > dataDetail.length ? dataDetail.length : pageCurrent * 10;
    if (pageCurrent !== 1)
      for (let i = (pageCurrent - 1) * 10; i < max; i++) {
        if (!dataDetail[i].packageId || !dataDetail[i].fwo_id) {
          dispatch(
            action_CHECK_MIOA_ZTMI031(
              {
                FWO_ID: dataDetail[i].fwo_id,
                BUYER_REFERENCE_NUMBER: '',
              },
              {
                onSuccess: (data: API.RowMTZTMI031OUT): void => {
                  dataDetail[i].packageId = get(data, 'MT_ZTMI031_OUT.Row[0].PACKAGE_ID', '');
                },
              },
            ),
          );
        }
      }
  }, [pageCurrent, dataDetail, dispatch]);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Chi Tiết Tải File')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={handleRedirectUploadFile}>
            <i className="fa fa-upload mr-2" />
            Tải file mới
          </Button>
        </div>
      </Row>
    );
  }

  React.useEffect((): void => {
    dispatch(
      action_HISTORY_DETAIL(
        {
          id_user: userId,
          id_po: userMaBp,
          dt_upload: dt_upload,
          id_file: id,
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (data: any): void => {
            setDataDetail(data);
            let size = 0;
            if (data.length % 10 !== 0) size = Math.floor(data.length / 10) + 1;
            else size = Math.floor(data.length / 10);
            setPageSize(size);
            for (let i = 0; i < 10; i++) {
              dispatch(
                action_CHECK_MIOA_ZTMI031(
                  {
                    FWO_ID: data[i].fwo_id,
                    BUYER_REFERENCE_NUMBER: '',
                  },
                  {
                    onSuccess: (data1: API.RowMTZTMI031OUT): void => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const dataUpdate = map(data, (item: any, index: any) => {
                        if (index >= 0 && index < 10)
                          return {
                            packageId: get(data1, 'MT_ZTMI031_OUT.Row[0].PACKAGE_ID', ''),
                            ...item,
                          };
                        return item;
                      });
                      setDataDetail(dataUpdate);
                    },
                  },
                ),
              );
            }
          },
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMaBp, userId]);
  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('STT'),
        Cell: ({ row }: Cell<ImportDataType>): JSX.Element => {
          const data = get(row.original, 'doc', '');
          return <>{data.STT}</>;
        },
      },
      {
        Header: t('Thông tin đơn hàng'),
        Cell: ({ row }: Cell<ImportDataType>): JSX.Element => {
          const data = get(row.original, 'doc', '');
          return (
            <>
              <div>
                {t('Mã phiếu')}: {data.FWO}
              </div>
              <div>
                {t('Mã khách hàng')}: {data.BPCode}
              </div>
              <div>
                {t('Ngày nhập')}: {data.DATE_IMPORT}
              </div>
            </>
          );
        },
      },
      {
        Header: t('Địa chỉ nguời gửi'),
        Cell: ({ row }: Cell<ImportDataType>): JSX.Element => {
          const data = get(row.original, 'doc', '');
          return (
            <>
              <div>
                {t('Tên khách hàng')}: {data.NAME_OP}
              </div>
              <div>
                {t('Điện thoại')}: {data.TEL_SRC}
              </div>
              <div>
                {t('Địa chỉ')}: {data.ADDRESS_OP}
              </div>
            </>
          );
        },
      },
      {
        Header: t('Địa chỉ nguời nhận'),
        Cell: ({ row }: Cell<ImportDataType>): JSX.Element => {
          const data = get(row.original, 'doc', '');
          return (
            <>
              <div>
                {t('Tên khách hàng')}: {data.NAME_CONSIG}
              </div>
              <div>
                {t('Điện thoại')}: {data.TEL_DES}
              </div>
              <div>
                {t('Địa chỉ')}: {data.ADDRESS_CONSIG}
              </div>
            </>
          );
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<ImportDataType>): JSX.Element => {
          const FWO_ID = get(row.original, 'fwo_id');
          return (
            <>
              {FWO_ID ? (
                <Link
                  className="SipTableFunctionIcon"
                  to={`/in-don-hang/${FWO_ID}?idChuyenThu=${get(row.original, 'packageId', '')}`}
                  target="_blank"
                  //  onClick={() => getPackageId(FWO_ID)}
                >
                  <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" title={t('In')} />
                </Link>
              ) : (
                <Button color="danger" title="Đơn chưa được tạo">
                  <i className="fa fa-exclamation-circle" />
                </Button>
              )}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      {renderTitle()}
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataDetail.filter(
            // eslint-disable-next-line
            (item: any) => parseInt(item.doc.STT) > pageCurrent * 10 - 10 && parseInt(item.doc.STT) <= pageCurrent * 10,
          )}
        />
      </Row>
      <Pagination
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageSize}
        onGetPageCurrent={setPageCurrent}
      />
    </>
  );
};
export default ChiTietLichSu;
