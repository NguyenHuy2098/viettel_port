import React, { useCallback, useMemo } from 'react';
import { Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Row as TableRow, TableOptions, useTable } from 'react-table';
import { groupBy, isEmpty, isFunction, map, noop, size, toString, get } from 'lodash';

import NoData from './NoData';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends TableOptions<any> {
  columns: any[];
  groupKey: string;
  onRowClick?: (item: any) => void;
  renderGroupedRow?: (group: TableRow<any>[], index: string) => React.ReactNode;
  renderUtilityDropDown?: (row: TableRow<any>, index: number) => JSX.Element;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props> = (props: Props): JSX.Element => {
  const { columns, data, groupKey, onRowClick, renderGroupedRow, renderUtilityDropDown } = props;
  const { t } = useTranslation();

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
      <Table striped hover {...getTableProps()}>
        <thead>
          {map(headerGroups, (headerGroup, index) => (
            <tr key={index}>
              {map(headerGroup.headers, (column, index) => (
                <th key={index}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {map(groupedData, (groupedRows, index) => (
            <React.Fragment key={`group-${index}`}>
              <tr key={`group-${index}`}>
                <td colSpan={size(columns)}>
                  {isFunction(renderGroupedRow)
                    ? renderGroupedRow(groupedRows, index)
                    : toString(index) !== 'null'
                    ? t('Nhóm') + ' ' + toString(index)
                    : ''}
                </td>
              </tr>
              {map(groupedData[index], (row, index) => {
                if (get(row, 'original.IS_GROUP_DATA_TABLE', false)) {
                  return <React.Fragment key={`row-empty-${index}`} />;
                }
                return (
                  prepareRow(row) || (
                    <tr key={`row-${index}`}>
                      {map(row.cells, (cell, index) => {
                        if (index + 1 === size(row.cells) && isFunction(renderUtilityDropDown)) {
                          return <td key={`controllers-${index}`}>{renderUtilityDropDown(row, index)}</td>;
                        }
                        return (
                          <td className="min-width-90px" key={index} onClick={handleClickRow(row.original)}>
                            {cell.value !== null ? cell.render('Cell') : ''}
                          </td>
                        );
                      })}
                    </tr>
                  )
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {isEmpty(rows) && <NoData />}
    </>
  );
};

DataTable.defaultProps = {
  onRowClick: noop,
};

export default DataTable;
