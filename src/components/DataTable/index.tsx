import React, { useCallback, useState } from 'react';
import { Input, Label, Table } from 'reactstrap';
import { Row as TableRow, TableOptions, useTable } from 'react-table';
import { concat, get, includes, isEmpty, isFunction, isString, map, noop, pull, size } from 'lodash';
import produce from 'immer';

import NoData from './NoData';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends TableOptions<any> {
  columns: any[];
  onCheckedValuesChange?: (values: string[]) => void;
  onRowCheck?: (value: string, item?: any, row?: TableRow<any>) => void;
  onRowClick?: (row: any) => void;
  showCheckAll?: boolean;
  showCheckboxes?: boolean;
  renderCheckboxValues?: string | ((item: any) => string);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    columns,
    data,
    onCheckedValuesChange,
    onRowCheck,
    onRowClick,
    showCheckAll,
    showCheckboxes,
    renderCheckboxValues,
  } = props;
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  if (showCheckboxes === true && !isString(renderCheckboxValues) && !isFunction(renderCheckboxValues)) {
    throw new Error('renderCheckboxValues is required if showCheckboxes is true.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCheckboxValue = (row: TableRow<any>): string => {
    if (isString(renderCheckboxValues)) {
      return get(row, `original.${renderCheckboxValues}`) || '';
    } else if (isFunction(renderCheckboxValues)) {
      return renderCheckboxValues(row);
    }
    return '';
  };

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleCheckAllRows = useCallback(() => {
    let newCheckedValues = [];
    if (size(data) > size(checkedValues)) {
      // @ts-ignore
      newCheckedValues = map(data, renderCheckboxValues);
    }
    setCheckedValues(newCheckedValues);
    if (isFunction(onCheckedValuesChange)) onCheckedValuesChange(newCheckedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValues, data]);

  const handleCheckRow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any, row: TableRow<any>) => (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;
      const newCheckedValues = produce(checkedValues, (draftState: string[]): string[] => {
        if (includes(draftState, value)) {
          return pull(draftState, value);
        } else {
          return concat(draftState, value);
        }
      });
      if (isFunction(onRowCheck)) onRowCheck(value, item, row);
      if (isFunction(onCheckedValuesChange)) onCheckedValuesChange(newCheckedValues);
      setCheckedValues(newCheckedValues);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedValues, data],
  );

  const handleClickRow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): ((event: React.MouseEvent) => void) => (): void => {
      onRowClick && onRowClick(item);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  // Render the UI for your table
  return (
    <>
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index}>
              {showCheckboxes && (
                <th>
                  {showCheckAll && (
                    <Label check>
                      <Input
                        checked={size(data) === size(checkedValues)}
                        type="checkbox"
                        onChange={handleCheckAllRows}
                      />
                    </Label>
                  )}
                </th>
              )}
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <tr key={index} {...row.getRowProps()}>
                  {showCheckboxes && (
                    <td>
                      <Label check>
                        <Input
                          checked={includes(checkedValues, getCheckboxValue(row))}
                          type="checkbox"
                          value={getCheckboxValue(row)}
                          onChange={handleCheckRow(get(row, 'original'), row)}
                        />
                      </Label>
                    </td>
                  )}
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} onClick={handleClickRow(row.original)} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              ),
          )}
        </tbody>
      </Table>
      {isEmpty(rows) && <NoData />}
    </>
  );
};

DataTable.defaultProps = {
  onRowClick: noop,
  showCheckAll: true,
  showCheckboxes: false,
};

export default DataTable;
