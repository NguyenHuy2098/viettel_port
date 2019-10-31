/* eslint-disable max-lines-per-function */
import React, { useCallback, useMemo } from 'react';
import { Container, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { formatNumber } from 'utils/common';
import { Row as TableRow, TableOptions, useTable } from 'react-table';
import { groupBy, isEmpty, isFunction, map, noop, size, toString, sumBy, toNumber } from 'lodash';
import noData from './no-data.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends TableOptions<any> {
  columns: any[];
  groupKey: string;
  onRowClick?: (item: any) => void;
  renderGroupedRow?: (group: TableRow<any>[], index: string) => React.ReactNode;
  header?: any;
  isPheDuyet: boolean;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { columns, data, groupKey, onRowClick, renderGroupedRow, header, isPheDuyet } = props;
  const { t } = useTranslation();

  // Use the state and functions returned from useTable to build your UI
  const { rows, prepareRow } = useTable({ columns, data });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const groupedData = useMemo(() => groupBy(rows, `original.${groupKey}`), [rows]);

  const handleClickRow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): ((event: React.MouseEvent) => void) => (): void => {
      if (isFunction(onRowClick)) {
        onRowClick(item);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  // Render the UI for your table
  return (
    <>
      <Table bordered id="bang-ke">
        {header()}
        <tbody>
          {map(groupedData, (groupedRows, index) => {
            return (
              <React.Fragment key={`group-${index}`}>
                <tr key={`group-${index}`}>
                  <td colSpan={size(columns)}>
                    <b>
                      {isFunction(renderGroupedRow)
                        ? renderGroupedRow(groupedRows, index)
                        : t('Nhóm') + ' ' + toString(index)}
                    </b>
                  </td>
                </tr>
                {map(groupedData[index], (row, index) => {
                  return (
                    prepareRow(row) || (
                      <tr className="sipTableBangKeFicoTr" key={`row-${index}`}>
                        {map(row.cells, (cell, index) => {
                          return (
                            <td key={index} onClick={handleClickRow(row.original)} {...cell.getCellProps()}>
                              {cell.value !== null ? cell.render('Cell') : ''}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  );
                })}
                <tr className="sipTableBangKeFicoTr text-right">
                  <td colSpan={7} className="text-center">
                    <b>Tổng nhóm</b>
                  </td>
                  <td className="text-right">
                    <strong>{formatNumber(sumBy(groupedData[index], item => toNumber(item.original.AMOUNT)))}</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(sumBy(groupedData[index], item => toNumber(item.original.PHU_PHI)))}</strong>
                  </td>
                  <td></td>
                  <td>
                    <strong>
                      {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.TAX_AMOUNT)))}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.SUM_AMOUNT)))}
                    </strong>
                  </td>
                  {isPheDuyet && (
                    <>
                      <td>
                        <strong>
                          {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.AMOUNT_INIT)))}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.PHU_PHI_INIT)))}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.TAX_AMOUNT_INIT)))}
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {formatNumber(sumBy(groupedData[index], item => toNumber(item.original.SUM_AMOUNT_INIT)))}
                        </strong>
                      </td>
                      <td>
                        {formatNumber(
                          sumBy(groupedData[index], item => toNumber(item.original.SUM_AMOUNT)) -
                            sumBy(groupedData[index], item => toNumber(item.original.SUM_AMOUNT_INIT)),
                        )}
                      </td>
                      <td />
                    </>
                  )}
                </tr>
              </React.Fragment>
            );
          })}
          <tr className="sipTableBangKeFicoTr text-right">
            <td colSpan={7} className="text-center">
              <strong>Tổng cộng</strong>
            </td>
            <td>
              <strong>{formatNumber(sumBy(data, item => toNumber(item.AMOUNT)))}</strong>
            </td>
            <td>
              <strong>{formatNumber(sumBy(data, item => toNumber(item.PHU_PHI)))}</strong>
            </td>
            <td />
            <td>
              <strong>{formatNumber(sumBy(data, item => toNumber(item.TAX_AMOUNT)))}</strong>
            </td>
            <td>
              <strong>{formatNumber(sumBy(data, item => toNumber(item.SUM_AMOUNT)))}</strong>
            </td>
            {isPheDuyet && (
              <>
                <td>
                  <strong>{formatNumber(sumBy(data, item => toNumber(item.AMOUNT_INIT)))}</strong>
                </td>
                <td>
                  <strong>{formatNumber(sumBy(data, item => toNumber(item.PHU_PHI_INIT)))}</strong>
                </td>
                <td>
                  <strong>{formatNumber(sumBy(data, item => toNumber(item.TAX_AMOUNT_INIT)))}</strong>
                </td>
                <td>
                  <strong>{formatNumber(sumBy(data, item => toNumber(item.SUM_AMOUNT_INIT)))}</strong>
                </td>
                <td>
                  {formatNumber(
                    sumBy(data, item => toNumber(item.SUM_AMOUNT)) -
                      sumBy(data, item => toNumber(item.SUM_AMOUNT_INIT)),
                  )}
                </td>
                <td />
              </>
            )}
          </tr>
        </tbody>
      </Table>
      {isEmpty(rows) && (
        <Container fluid>
          <Row className="align-items-center flex-column mb-3">
            <img alt="no-data" className="w-auto" src={noData} />
          </Row>
          <Row className="align-items-center flex-column">
            <span className="text-bold text-uppercase">{t('Không tìm thấy dữ liệu')}</span>
          </Row>
        </Container>
      )}
    </>
  );
};

DataTable.defaultProps = {
  onRowClick: noop,
};

export default DataTable;
