import React, { useState, useRef, useEffect } from 'react';
import { useTable } from 'react-table';

// Components
import { DataCell } from './TableCell';
import { ContextMenu } from '../../shared/ContextMenu';

// Material-UI Components
import MaUTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//custom components
import { ServiceDisplay } from './ServiceDisplay';

// Types
import { TableProps } from '../../../shared/types';

// Styles
import {
  typographyTheme,
  buttonTheme,
  paletteTheme,
} from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fade, darken } from '@material-ui/core/styles';

export const Table = React.memo(
  ({ data, access, selectedCell, onCellClick }: TableProps) => {
    const outerRef = useRef(null);
    const classes = useStyles();
    // const [dataRows, setDataRows] = useState([...data]);

    // console.log('data', data);
    const { columns, services, role, title, view } = data;

    return (
      <>
        <ContextMenu
          outerRef={outerRef}
          addRowHandler={insertRow}
          deleteRowHandler={deleteRow}
        />
        <MaUTable className={classes.table} ref={outerRef}>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell className={classes.headerCell}>{column.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service: any) => (
              <ServiceDisplay
                service={service}
                selectedCell={selectedCell}
                onCellClick={onCellClick}
              />
            ))}
          </TableBody>
        </MaUTable>
      </>
    );

    // make these blank later
    function cleanRow(row: any) {
      Object.keys(row).forEach(function (key) {
        if (key !== 'duty' && key !== 'time')
          row[key] = {
            data: {
              firstName: 'Mike',
              lastName: 'Wazowski',
              userId: 5,
              role: { id: 2, name: 'Interpreter' },
            },
          };
        else row[key] = { data: { display: '' } };
      });
      return row;
    }

    function deleteRow(rowIndex: number) {
      // const newData = [...dataRows];
      // newData.splice(rowIndex, 1);
      // setDataRows(newData);
    }

    function insertRow(rowIndex: number) {
      // const newRow = cleanRow({ ...dataRows[rowIndex] });
      // const tempData = [...dataRows];
      // tempData.splice(rowIndex, 0, newRow);
      // setDataRows(tempData);
    }
  },
);

const normalCellBorderColor = 'rgba(234, 234, 234, 1)';
const normalCellBorder = `1px solid ${normalCellBorderColor}`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      margin: '5px 0 2px',
      height: '2rem',
      width: '200vw',
      position: 'sticky',
      left: '8px',
    },
    titleText: {
      ...theme.typography.h3,
      marginTop: 5,
      marginBottom: 2,
      position: 'sticky',
      left: '8px',
    },
    headerCell: {
      textAlign: 'center',
      padding: '1px 2px',
      color: typographyTheme.common.color,
      border: normalCellBorder,
      fontWeight: 'bold',
    },
    cell: {
      padding: '0px 0px 1px',
      border: normalCellBorder,
      width: '20ch',
      '&:not(:first-child)': {
        minWidth: '2ch',
      },
      '& > div': {
        width: '100%',
        padding: 0,
        margin: 0,
      },
      '& input': {
        // width: '20ch',
        // padding: '10px 15px 3px',
        width: '100%',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        // ...horizontalScrollIndicatorShadow('transparent'),
      },
    },
    table: {
      borderCollapse: 'inherit',
      marginBottom: '1rem',

      // first two columns:
      // '& td:first-child, td:nth-child(2), th:first-child, th:nth-child(2)': {
      //   background: 'white',
      //   position: 'sticky',
      //   zIndex: 1,
      //   border: normalCellBorder,
      //   boxSizing: 'border-box',
      // },

      // first column:
      '& td:first-child, th:first-child': {
        left: '8px',
        width: '12ch', // need this when there's very few columns
        '& input': {
          width: '12ch',
          textAlign: 'center',
        },
        '&:before': {
          content: '""',
          background: 'white',
          position: 'absolute',
          width: '8px',
          top: '-1px',
          left: '-9px',
          height: '106%',
        },
      },

      // second column:
      '& td:nth-child(2), th:nth-child(2)': {
        left: '135px',
        width: '14ch', // need this when there's very few columns
        '& input': {
          width: '14ch',
        },
        borderRightWidth: 0,
        '&:after': {
          content: '""',
          background: fade(paletteTheme.common.lightBlue, 0.15),
          position: 'absolute',
          width: '5px',
          top: '-1px',
          left: 'calc(100% - 2.5px)',
          height: '106%',
        },
      },

      // third column:
      '& td:nth-child(3), th:nth-child(3)': {
        borderLeftWidth: 0,
      },

      // last row:
      '& tr:last-child td': {
        borderBottomWidth: '2px',
        borderBottomColor: darken(normalCellBorderColor, 0.25),
      },
    },
  }),
);
