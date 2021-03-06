/* eslint-disable max-lines */
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Row, Col, ButtonProps } from 'reactstrap';
import { get, size, sumBy, toNumber, map } from 'lodash';
import moment from 'moment';

import PrintTableBangKe from 'components/DataTable/PrintTableBangKe';
import { numberFormat, getValueOfNumberFormat } from 'utils/common';
import convertMoneyToString from 'utils/convertMoneyToString';
import { action_ZFI007M } from 'redux/ZFI007M/actions';
import { select_ZFI007M_collection } from 'redux/ZFI007M/selectors';
import useLoggedInUser from 'hooks/useLoggedInUser';

interface Props extends ButtonProps {
  ids: string[];
}

const PrintableBangKe = (props: Props): JSX.Element => {
  const { ids } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!size(ids)) return;
    const payload = {
      BK_INPUT: map(ids, (id: string) => ({ ID: id })),
    };
    dispatch(action_ZFI007M(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const lists = useSelector(select_ZFI007M_collection);

  return (
    <div>
      {lists.map(
        (item: API.Collection, index: number): JSX.Element => {
          return <Item key={index} MT_DETAIL_RECEIVER_ZFI007={item.header} data={item.list} />;
        },
      )}
    </div>
  );
};

interface PropsPrintTableBangKe extends ButtonProps {
  data: API.LISTMTDETAILRECEIVERM[] | undefined;
  MT_DETAIL_RECEIVER_ZFI007: API.HEADERMTDETAILRECEIVERM | undefined;
}

// eslint-disable-next-line max-lines-per-function
const Item = (props: PropsPrintTableBangKe): JSX.Element => {
  const { data, MT_DETAIL_RECEIVER_ZFI007 } = props;
  const { t } = useTranslation();

  const isPheDuyet = React.useMemo(() => {
    const status = get(MT_DETAIL_RECEIVER_ZFI007, 'BK_STATUS', -1);
    return status === 2 || status === 3;
  }, [MT_DETAIL_RECEIVER_ZFI007]);

  // eslint-disable-next-line max-lines-per-function
  function renderHeader(): JSX.Element {
    if (!isPheDuyet) {
      return (
        <thead className="bang-ke-header">
          <tr className="text-center">
            <th rowSpan={3}>{t('STT')}</th>
            <th colSpan={11}>{t('B??u c???c k?? khai')}</th>
            {/* <th colSpan={4}>{t('C??ng ty ph?? duy???t')}</th>
            <th rowSpan={3}>{t('Kh??ng duy???t')}</th>
            <th rowSpan={3}>{t('L?? do')}</th> */}
          </tr>

          <tr className="text-center">
            <th colSpan={3}>{t('H??a ????n mua h??ng')}</th>
            <th rowSpan={2}>{t('T??n ng?????i b??n')}</th>
            <th rowSpan={2}>{t('M?? s??? thu??? ng?????i b??n')}</th>
            <th rowSpan={2}>{t('H??ng h??a, D???ch v???')}</th>
            <th rowSpan={2}>{t('H??ng h??a d???ch v??? ch??a thu???')}</th>
            <th rowSpan={2}>{t('Ph??? ph??')}</th>
            <th rowSpan={2}>{t('Thu??? su???t')}</th>
            <th rowSpan={2}>{t('Thu??? GTGT')}</th>
            <th rowSpan={2}>{t('T???ng c???ng')}</th>
            {/* <th rowSpan={2}>{t('H??ng h??a d???ch v??? ch??a thu???')}</th>
            <th rowSpan={2}>{t('Ph??? ph??')} </th>
            <th rowSpan={2}>{t('Thu??? GTGT')}</th>
            <th rowSpan={2}>{t('C???ng')} </th> */}
          </tr>

          <tr className="text-center">
            <th>{t('K?? hi???u')}</th>
            <th>{t('Ng??y')}</th>
            <th>{t('S???')}</th>
          </tr>
          <tr className="text-center">
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            {/* <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th> */}
          </tr>
        </thead>
      );
    }
    return (
      <thead className="bang-ke-header">
        <tr className="text-center">
          <th rowSpan={3}>{t('STT')}</th>
          <th colSpan={11}>{t('B??u c???c k?? khai')}</th>
          <th colSpan={4}>{t('C??ng ty ph?? duy???t')}</th>
          <th rowSpan={3}>{t('Kh??ng duy???t')}</th>
          <th rowSpan={3}>{t('L?? do')}</th>
        </tr>

        <tr className="text-center">
          <th colSpan={3}>{t('H??a ????n mua h??ng')}</th>
          <th rowSpan={2}>{t('T??n ng?????i b??n')}</th>
          <th rowSpan={2}>{t('M?? s??? thu??? ng?????i b??n')}</th>
          <th rowSpan={2}>{t('H??ng h??a, D???ch v???')}</th>
          <th rowSpan={2}>{t('H??ng h??a d???ch v??? ch??a thu???')}</th>
          <th rowSpan={2}>{t('Ph??? ph??')}</th>
          <th rowSpan={2}>{t('Thu??? su???t')}</th>
          <th rowSpan={2}>{t('Thu??? GTGT')}</th>
          <th rowSpan={2}>{t('T???ng c???ng')}</th>
          <th rowSpan={2}>{t('H??ng h??a d???ch v??? ch??a thu???')}</th>
          <th rowSpan={2}>{t('Ph??? ph??')} </th>
          <th rowSpan={2}>{t('Thu??? GTGT')}</th>
          <th rowSpan={2}>{t('C???ng')} </th>
        </tr>

        <tr className="text-center">
          <th>{t('K?? hi???u')}</th>
          <th>{t('Ng??y')}</th>
          <th>{t('S???')}</th>
        </tr>
        <tr className="text-center">
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
          <th>11</th>
          <th>12</th>
          <th>13</th>
          <th>14</th>
          <th>15</th>
          <th>16</th>
          <th>17</th>
          <th>18</th>
        </tr>
      </thead>
    );
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('STT'),
        accessor: 'LINE_ITEM',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.LINE_ITEM', '');
        },
      },
      {
        Header: t('K?? hi???u'),
        accessor: 'KIHIEU_HD',
      },
      {
        Header: t('Ng??y'),
        accessor: 'NGAY_HD',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return moment(get(row, 'original.NGAY_HD')).format('DD/MM/YYYY');
        },
      },
      {
        Header: t('S???'),
        accessor: 'SO_HD',
      },
      {
        Header: t('T??n ng?????i b??n'),
        accessor: 'NGUOI_BAN',
      },
      {
        Header: t('M?? s??? thu???'),
        accessor: 'MST',
      },
      {
        Header: t('H??ng h??a d???ch v???'),
        accessor: 'DESCR',
      },
      {
        Header: t('H??ng h??a d???ch v??? ch??a thu???'),
        // accessor: 'AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.AMOUNT_INIT'));
        },
      },
      {
        Header: t('Ph??? ph??'),
        // accessor: 'PHU_PHI',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.PHU_PHI_INIT'));
        },
      },
      {
        Header: t('Thu??? su???t'),
        // accessor: 'TAX',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <div className="text-right">{get(row, 'original.TAX_INIT')}</div>;
        },
      },
      {
        Header: t('Thu??? gi?? tr??? gia t??ng'),
        // accessor: 'TAX_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return <div className="column-11">{numberFormat(get(row, 'original.TAX_AMOUNT_INIT'))}</div>;
        },
      },
      {
        Header: t('T???ng c???ng'),
        // accessor: 'SUM_AMOUNT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return numberFormat(get(row, 'original.SUM_AMOUNT_INIT'));
        },
      },
      {
        Header: t('H??ng h??a d???ch v??? ch??a thu??? (1)'),
        // accessor: 'AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.AMOUNT'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Ph??? ph?? (1)'),
        // accessor: 'PHU_PHI_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.PHU_PHI'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Thu??? gi?? tr??? gia t??ng (1)'),
        // accessor: 'TAX_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.TAX_AMOUNT'))
            : '0';
        },
        show: isPheDuyet,
      },
      {
        Header: t('T???ng c???ng(1)'),
        // accessor: 'SUM_AMOUNT_INIT',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.STATUS_ITEM') === 2 || get(row, 'original.STATUS_ITEM') === 3
            ? numberFormat(get(row, 'original.SUM_AMOUNT'))
            : '';
        },
        show: isPheDuyet,
      },
      {
        Header: t('Kh??ng duy???t'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          let value =
            toNumber(getValueOfNumberFormat(get(row, 'original.SUM_AMOUNT_INIT'))) -
            toNumber(getValueOfNumberFormat(get(row, 'original.SUM_AMOUNT')));
          if (value < 0) {
            value = 0;
          }
          return numberFormat(value.toString());
        },
        className: 'khong-duyet',
        show: isPheDuyet,
      },
      {
        Header: t('L?? do'),
        // accessor: 'NOTE',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.NOTE', '');
        },
        show: isPheDuyet,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  function renderTotal(): JSX.Element {
    const SUM_AMOUNT = sumBy(data, item => toNumber(item.SUM_AMOUNT));
    const SUM_AMOUNT_INIT = sumBy(data, item => toNumber(item.SUM_AMOUNT_INIT));
    const NOT_SUM_AMOUNT = !isPheDuyet ? 0 : SUM_AMOUNT_INIT - SUM_AMOUNT;

    return (
      <Row>
        <Col className="pl-5">
          <div>
            <i>{t('S??? ti???n ????? ngh??? thanh to??n') + ': ' + convertMoneyToString(SUM_AMOUNT_INIT)}</i>
          </div>
          {isPheDuyet && (
            <>
              <div>
                <i>{t('S??? ti???n ???????c duy???t') + ': ' + convertMoneyToString(SUM_AMOUNT)}</i>
              </div>
              <div>
                <i>{t('S??? ti???n kh??ng ???????c duy???t') + ': ' + convertMoneyToString(NOT_SUM_AMOUNT)}</i>
              </div>
            </>
          )}
        </Col>
      </Row>
    );
  }

  const userLogin = useLoggedInUser();

  const renderGroupedRow = (rows: TableRow<API.LISTMTDETAILRECEIVER>[], index: string): JSX.Element => {
    const row = rows.filter(item => get(item, 'original.KHOAN_MUC') === index)[0];
    const ten_km = get(row, 'original.TEN_KM', '');
    if (index === 'null') return <></>;
    return <div>{`${index} - ${ten_km}`}</div>;
  };

  if (!data || !MT_DETAIL_RECEIVER_ZFI007) return <div></div>;

  return (
    <div className="in-bang-ke">
      <div className="page-break">
        <div className="row">
          <div className="col-4">
            <div>
              <strong>{t('T???ng c??ng ty c??? ph???n B??u ch??nh Viettel')}</strong>
            </div>
            <div className="pl-5">
              <strong>{get(userLogin, 'user.profile.bp_org_unit', '')} </strong>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4 text-right">
            {t('S???')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_ID', '')}
          </div>
        </div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} className={'text-center'}>
            <h5>
              <strong>{t('B???NG K?? DUY???T CH???NG T??? G???C THANH TO??N CHI PH??')}</strong>
            </h5>
            <p>
              {t('Th??ng')} {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_MONTH', '')} {t('n??m')}{' '}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_YEAR', '')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="info pb-3 c-font">
            <div className="col-6 pl-0">
              {t('V??? vi???c')}: {t('Thanh to??n chi ph?? theo ng??n s??ch ')}
              {t('T')}
              {get(MT_DETAIL_RECEIVER_ZFI007, 'BK_MONTH', '')}/{get(MT_DETAIL_RECEIVER_ZFI007, 'BK_YEAR', '')}
            </div>
            <div className="col-6 pl-0">
              {t('H??? v?? t??n')}: {get(MT_DETAIL_RECEIVER_ZFI007, 'CRE_BY', '')}
            </div>
            <div className="col-6 pl-0">
              {t('Ch???c danh')}: {get(userLogin, 'user.profile.bp_role_id', '')}
            </div>
            <div className="col-6 pl-0">{t('????? ngh??? thanh to??n s??? ti???n theo b???ng k?? nh?? sau')}:</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="text-right">??VT: VN??</div>
          </Col>
        </Row>
        <PrintTableBangKe
          columns={columns}
          header={renderHeader}
          data={data}
          groupKey="KHOAN_MUC"
          renderGroupedRow={renderGroupedRow}
          isPheDuyet={isPheDuyet}
        />
        {renderTotal()}
        <Row className="text-center pt-5 pb-5">
          <div className="col-4">
            <strong>{t('K??? TO??N CHUY??N QU???N')}</strong>
          </div>
          <div className="col-4">
            <strong>{t('TR?????NG PH??NG T??I CH??NH')}</strong>
          </div>
          <div className="col-4">
            <strong>{t('T???NG GI??M ?????C')}</strong>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default PrintableBangKe;
