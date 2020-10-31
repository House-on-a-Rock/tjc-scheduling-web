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
import { typographyTheme, buttonTheme } from '../../../shared/styles/theme.js';
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
  console.log(headerGroups[0].headers[0].getHeaderProps());

  return (
    <>
      {title && (
        <h3 style={{ margin: '5px 0 2px' }}>
          <span className={classes.title}>{title}</span>
        </h3>
      )}
      <MaUTable {...getTableProps()} className={classes.table}>
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

const normalCellBorder = '1px solid rgba(224, 224, 224, 1)';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      ...theme.typography.h3,
      marginTop: 5,
      marginBottom: 2,
      position: 'sticky',
      left: 0,
    },
    headerCell: {
      textAlign: 'center',
      padding: '1px 5px',
      color: typographyTheme.common.color,
      border: normalCellBorder,
      fontWeight: 'bold',
    },
    cell: {
      padding: '1px 5px',
      border: normalCellBorder,
      '&:not(:first-child)': {
        minWidth: '12ch',
      },
      '& div:before': {
        borderBottom: 'none',
      },
      '&:hover': {
        background: `${buttonTheme.filled.hover.backgroundColor} !important`,
        '& > div': {
          color: 'white',
        },
      },
      '& input': {
        // ...horizontalScrollIndicatorShadow('transparent'),
      },
    },
    table: {
      borderCollapse: 'inherit',

      // first two columns:
      '& td:first-child, td:nth-child(2), th:first-child, th:nth-child(2)': {
        background: 'white',
        position: 'sticky',
        zIndex: 1,
        border: normalCellBorder,
        boxSizing: 'border-box',
      },

      // first column:
      '& td:first-child, th:first-child': {
        left: 0,
        width: '8ch', // if few columns
        '& > div': {
          width: '8ch', // if many columns
        },
      },

      // second column:
      '& td:nth-child(2), th:nth-child(2)': {
        left: '75px',
        width: '14ch', // if few columns
        '& > div': {
          width: '14ch', // if many columns
        },
      },
    },
  }),
);
