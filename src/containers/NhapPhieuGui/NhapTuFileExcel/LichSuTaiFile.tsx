import React, { useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'reactstrap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable/TaoDonExcelTable';
import routesMap from 'utils/routesMap';
import { generatePath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { get, map } from 'lodash';
import moment from 'moment';
import Pagination from 'components/Pagination/PaginationExcel';
import DatetimePicker from './DateTimePicker';
// import replaceUrlParam from 'utils/replaceUrlParam';
import { action_HISTORY_IMPORT } from '../../../redux/GetHistoryImportFile/actions';
import { makeSelectorBPCode, makeSelectorBPOrg } from '../../../redux/GetProfileByUsername/selectors';

interface Props {
  updateCount: (count: number) => void;
  getTab: string;
}

// eslint-disable-next-line max-lines-per-function
const HistoryImport: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorBPOrg);
  const userId = useSelector(makeSelectorBPCode);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [tuNgay, setTuNgay] = useState<string>(
    moment()
      .startOf('month')
      .format(),
  );
  const [denNgay, setDenNgay] = useState<string>(moment(new Date()).format());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataTable, setDataTable] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(1);

  React.useEffect((): void => {
    if (props.getTab.toString() === '?tab=2') {
      dispatch(
        action_HISTORY_IMPORT(
          {
            id_user: userId,
            id_po: userMaBp,
            fd: moment(tuNgay).format('YYYY-MM-DDTHH:mm:ss.SSS'),
            td: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS'),
          },
          {
            onSuccess: (data: []): void => {
              let size = 0;
              if (data.length % 10 !== 0) size = Math.floor(data.length / 10) + 1;
              else size = Math.floor(data.length / 10);
              setPageSize(size);
              let count = 0;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const dataTa = map(data, (item: any) => {
                count++;
                return {
                  key: count,
                  ...item,
                };
              });
              props.updateCount(dataTa.length);
              setDataTable(dataTa);
            },
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getTab, dispatch, userMaBp, userId, tuNgay, denNgay]);

  const handleRedirectDetail = useCallback(
    // eslint-disable-next-line
    (item: any): void => {
      const dtime = get(item, 'dt_upload');
      const id_fi = get(item, 'id_file');
      dispatch(push(generatePath(routesMap.CHI_TIET_LICH_SU, { created_dt: dtime, id: id_fi })));
    },
    [dispatch],
  );

  // const pushSearchConditionToUrl = (tuNgay: string, denNgay: string, status: string, searchKey?: string): void => {
  //   const url = replaceUrlParam(window.location.pathname + window.location.search, {
  //     start: tuNgay,
  //     end: denNgay,
  //     status: status === '' ? '-1' : status,
  //     searchKey,
  //   });
  //   dispatch(replace(generatePath(url)));
  // };

  const handleClearFilter = (): void => {
    setTuNgay(
      moment()
        .startOf('month')
        .format(),
    );
    setDenNgay(moment(new Date()).format());
  };

  const columns = useMemo(
    () => [
      {
        Header: t('STT'),
        accessor: 'key',
      },
      {
        Header: t('Ngày tải lên'),
        Cell: ({ row }: Cell<HistoryImport>): JSX.Element => {
          const datetime = moment(get(row.original, 'dt_upload', ''), moment.ISO_8601)
            .utc()
            .format('YYYY-MM-DD HH:mm:ss');
          return <>{datetime}</>;
        },
      },
      // {
      //   Header: 'Tên file',

      // },
      {
        Header: t('Số lượng'),
        accessor: 'total_order',
      },
      // {
      //   Header: t('Quản trị'),
      //   Cell: ({ row }: Cell<HistoryImport>): JSX.Element => {
      //     return (
      //       <>
      //         <Button color="info" onClick={handleRedirectDetail}>
      //           {/*<img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />*/}
      //           {/*<i className = 'fa fa-info-circle mr-2'/>*/}
      //           Chi tiết
      //         </Button>
      //       </>
      //     );
      //   },
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function handleSelectStartDate(date: Date): void {
    setTuNgay(moment(date).format());
  }

  function handleSelectEndDate(date: Date): void {
    setDenNgay(
      moment(date)
        .endOf('day')
        .format(),
    );
  }

  return (
    <>
      <Row className="sipBgWhiteContainer sipFilterContainer">
        <Col className="sipFilterCol">
          <DatetimePicker
            startDate={moment(tuNgay, 'YYYYMMDD').toDate()}
            endDate={moment(denNgay, 'YYYYMMDD').toDate()}
            handleSelectEndDate={handleSelectEndDate}
            handleSelectStartDate={handleSelectStartDate}
          />
        </Col>
        <Col className="sipFilterCol sipFilterColBtn">
          <Button className="sipTitleRightBlockBtnIcon m-0" onClick={handleClearFilter} title="Refesh">
            <img src={'../../assets/img/icon/iconRefresh.svg'} alt="VTPostek" />
          </Button>
        </Col>
      </Row>
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable.filter(
            (item: HistoryImport) =>
              parseInt(item.key) > pageCurrent * 10 - 10 && parseInt(item.key) <= pageCurrent * 10,
          )}
          onRowClick={handleRedirectDetail}
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
export default HistoryImport;
