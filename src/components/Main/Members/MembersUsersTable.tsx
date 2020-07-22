import React from 'react';

import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    fontWeight: 'bold'
}

export interface MembersUsersTableProps {
    selectedRows: number[];
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filteredUsers: MemberStateData[];
    isSelected: (id: number) => boolean;
    handleRowClick: (event: React.MouseEvent<unknown>, row: MemberStateData) => void;
}

export const MembersUsersTable = ({selectedRows, handleSelectAllClick, filteredUsers, isSelected, handleRowClick}: MembersUsersTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length > 0}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell style={styleHead}>First&nbsp;Name</TableCell>
                  <TableCell style={styleHead} align="left">Last&nbsp;Name</TableCell>
                  <TableCell style={styleHead} align="left">Email</TableCell>
                  <TableCell style={styleHead} align="left">Disabled</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((row) => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={event => {
                        handleRowClick(event, row)
                      }}
                      selected={isItemSelected} 
                      key={row.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell component="th" variant="body" scope="row">
                          {row.firstName}
                      </TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.lastName}</TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.email}</TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.disabled.toString()}</TableCell>
                    </TableRow>
                )})  
                }
              </TableBody>
            </Table>
        </TableContainer>
    )
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)