import React, { useCallback, useMemo, useState } from 'react';
import { Input, Label, Table } from 'reactstrap';
import { Row as TableRow, TableOptions, useTable } from 'react-table';
import { concat, difference, get, includes, isEmpty, isFunction, isString, map, noop, pull } from 'lodash';
import produce from 'immer';

import NoData from './NoData';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends TableOptions<any> {
  columns: any[];
  onCheckedValuesChange?: (values: string[]) => void;
  onRowCheck?: (value: string, item?: any, row?: TableRow<any>) => void;
  onRowClick?: (rowData: any, row?: TableRow<any>) => void;
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

  if (showCheckboxes === true && !isString(renderCheckboxValues) && !isFunction(renderCheckboxValues)) {
    throw new Error('renderCheckboxValues is required if showCheckboxes is true.');
  }

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const currentPageCheckboxValues = useMemo(() => {
    if (isString(renderCheckboxValues)) return map(data, renderCheckboxValues);
    if (isFunction(renderCheckboxValues)) return map(data, renderCheckboxValues);
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const currentPageYetCheckedValues = useMemo(() => {
    return difference(currentPageCheckboxValues, checkedValues);
  }, [checkedValues, currentPageCheckboxValues]);

  const isPageAllChecked = useMemo(() => isEmpty(currentPageYetCheckedValues), [currentPageYetCheckedValues]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCheckboxValue = (row: TableRow<any>): string => {
    if (isString(renderCheckboxValues)) {
      return get(row, `original.${renderCheckboxValues}`) || '';
    } else if (isFunction(renderCheckboxValues)) {
      return renderCheckboxValues(row);
    }
    return '';
  };

  const handleCheckAllRows = useCallback(() => {
    let newCheckedValues: string[] = [];
    if (!isPageAllChecked) {
      newCheckedValues = concat(checkedValues, currentPageYetCheckedValues);
    }
    setCheckedValues(newCheckedValues);
    if (isFunction(onCheckedValuesChange)) onCheckedValuesChange(newCheckedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValues, currentPageYetCheckedValues, isPageAllChecked]);

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
    (rowOriginal: any, row: TableRow<any>) => (): void => {
      onRowClick && onRowClick(rowOriginal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const renderCheckAll = (): JSX.Element => (
    <th>
      {showCheckAll && (
        <Label check>
          <Input type="checkbox" onChange={handleCheckAllRows} />
        </Label>
      )}
    </th>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCheckRow = (row: TableRow<any>): JSX.Element => {
    const value = getCheckboxValue(row);
    return (
      <td>
        <Label check>
          <Input
            checked={includes(checkedValues, value)}
            onChange={handleCheckRow(get(row, 'original'), row)}
            type="checkbox"
            value={value}
          />
        </Label>
      </td>
    );
  };

  // Render the UI for your table
  return (
    <>
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index}>
              {showCheckboxes && renderCheckAll()}
              {headerGroup.headers.map((column, index) => (
                <th key={index}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              prepareRow(row) || (
                <tr className="cursor-pointer" key={index}>
                  {showCheckboxes && renderCheckRow(row)}
                  {row.cells.map((cell, index) => {
                    return (
                      <td className="min-width-90px" key={index} onClick={handleClickRow(get(row, 'original'), row)}>
                        {cell.value !== null ? cell.render('Cell') : ''}
                      </td>
                    );
                  })}
                </tr>
              )
            );
          })}
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
