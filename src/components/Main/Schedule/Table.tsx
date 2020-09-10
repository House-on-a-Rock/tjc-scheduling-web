import React, { useMemo, useState, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions';
import { EditableCell } from './EditableCell';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useTable } from 'react-table';

const defaultColumn = {
  Cell: EditableCell,
};

export function Table({ columns, data, updateMyData }: any) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  return (
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
  );
}
