import React from 'react';
import { useTable } from 'react-table';

// Components
import { DataCell } from './TableCell';

// Material-UI Components
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Types
import { TableProps } from '../../../shared/types';

// Styles
import { typographyTheme } from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { horizontalScrollIndicatorShadow } from '../../../shared/styles/scroll-indicator-shadow';

export const Table = (props: TableProps) => {
  const classes = useStyles();

  const { columns, data, updateMyData, title } = props;
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn: { Cell: DataCell },
    updateMyData,
  });

  return (
    <>
      {title && <h3 className={classes.title}>{title}</h3>}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell className={classes.headerCell} {...column.getHeaderProps()}>
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
                  <TableCell className={classes.cell} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      ...theme.typography.h3,
      marginBottom: 0,
    },
    headerCell: {
      textAlign: 'center',
      padding: '1px 5px',
      color: typographyTheme.common.color,
      border: '1px solid rgba(224, 224, 224, 1)',
      fontWeight: 'bold',
    },
    cell: {
      padding: '1px 5px',
      border: '1px solid rgba(224, 224, 224, 1)',
      '& div:before': {
        borderBottom: 'none',
      },
      '& input': {
        // ...horizontalScrollIndicatorShadow('transparent'),
      },
    },
  }),
);
