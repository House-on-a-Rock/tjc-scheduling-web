import React from 'react';
import { cardTheme } from '../../../shared/styles/theme.js';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { MemberStateData } from '../../../store/types';

import CSS from 'csstype';

const styleHead: CSS.Properties = {
  fontWeight: 'bold',
};

export interface MembersUsersTableProps {
  selected: boolean;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  members: MemberStateData[];
  isSelected: (id: number) => boolean;
  handleClick: (event: React.MouseEvent<unknown>, row: MemberStateData) => void;
}

export const MembersUsersTable = ({
  selected,
  handleCheck,
  members,
  isSelected,
  handleClick,
}: MembersUsersTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="members table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox checked={selected} onChange={handleCheck} />
            </TableCell>
            <TableCell style={styleHead}>First&nbsp;Name</TableCell>
            <TableCell style={styleHead} align="left">
              Last&nbsp;Name
            </TableCell>
            <TableCell style={styleHead} align="left">
              Email
            </TableCell>
            <TableCell style={styleHead} align="left">
              Disabled
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((row) => {
            const isItemSelected = isSelected(row.userId);

            return (
              <TableRow
                hover
                onClick={(event) => {
                  handleClick(event, row);
                }}
                selected={isItemSelected}
                key={row.userId}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} />
                </TableCell>
                <TableCell component="th" variant="body" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell component="th" variant="body" scope="row" align="left">
                  {row.lastName}
                </TableCell>
                <TableCell component="th" variant="body" scope="row" align="left">
                  {row.email}
                </TableCell>
                <TableCell component="th" variant="body" scope="row" align="left">
                  {row.disabled.toString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: cardTheme.backgroundColor,
      boxShadow: cardTheme.boxShadow,
    },
    table: {
      minWidth: 650,
    },
  }),
);
