import React from 'react';
import { EditableCell } from './EditableCell';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useTable } from 'react-table';
import { ColumnFields, WeeklyAssignmentInterface } from '../../../shared/types';

const defaultColumn = {
  Cell: EditableCell,
};

interface TableProps {
  columns: ColumnFields[];
  data: WeeklyAssignmentInterface[];
  updateMyData: (rowIndex: number, columnId: string, value: string) => void;
  title: string;
}

export function Table(props: TableProps) {
  const { columns, data, updateMyData, title } = props;
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  return (
    <>
      {title}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </>
  );
}
