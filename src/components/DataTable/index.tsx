import React, { useCallback } from 'react';
import { Table } from 'reactstrap';
import { TableProps, useTable } from 'react-table';
import { noop } from 'lodash';

import Pagination from 'components/Pagination';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (item: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependency?: any;
}

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props & TableProps> = ({
  columns,
  data,
  onRowClick,
  dependency,
}: Props & TableProps): JSX.Element => {
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
    [dependency && dependency],
  );

  // Render the UI for your table
  return (
    <>
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
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
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              ),
          )}
        </tbody>
      </Table>
      <Pagination pageRangeDisplayed={5} marginPagesDisplayed={2} pageCount={100} />
    </>
  );
};

DataTable.defaultProps = {
  onRowClick: noop,
};

export default DataTable;
