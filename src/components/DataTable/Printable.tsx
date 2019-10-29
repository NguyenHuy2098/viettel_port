import React, { ReactElement, useCallback } from 'react';
import { TableOptions, useTable } from 'react-table';
import classNames from 'classnames';
import { noop } from 'lodash';
import { Table } from 'reactstrap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props extends TableOptions<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (item: any) => void;
  renderFooter?: () => ReactElement;
}

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props> = ({ columns, data, onRowClick, renderFooter }: Props): JSX.Element => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handleClickRow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): ((event: React.MouseEvent) => void) => (): void => {
      onRowClick && onRowClick(item);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const tableProps = getTableProps();

  // Render the UI for your table
  return (
    <Table
      {...getTableProps()}
      className={classNames('table-bordered', tableProps.className)}
      style={{
        width: '100%',
        ...tableProps.style,
      }}
    >
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          row =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td onClick={handleClickRow(row.original)} {...cell.getCellProps()}>
                      {cell.value !== null ? cell.render('Cell') : ''}
                    </td>
                  );
                })}
              </tr>
            ),
        )}
      </tbody>
      {renderFooter && renderFooter()}
    </Table>
  );
};

DataTable.defaultProps = {
  onRowClick: noop,
};

export default DataTable;
