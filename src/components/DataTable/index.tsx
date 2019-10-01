import React, { useCallback } from 'react';
import { Container, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { TableOptions, useTable } from 'react-table';
import { isEmpty, noop } from 'lodash';
import noData from './no-data.svg';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends TableOptions<any> {
  columns: any[];
  onRowClick?: (item: any) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const DataTable: React.FC<Props> = ({ columns, data, onRowClick }: Props): JSX.Element => {
  const { t } = useTranslation();

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

  // Render the UI for your table
  return (
    <>
      <Table striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index}>
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
