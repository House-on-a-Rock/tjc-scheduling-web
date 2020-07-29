import React from 'react';

import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

export interface MembersHeaderProps {
    localChurch: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddOpen: () => void;
    handleDeleteOpen: () => void;
}

export const MembersHeader = ({localChurch, onSearchChange, handleAddOpen, handleDeleteOpen}: MembersHeaderProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="members table controls">
            <TableHead className={classes.header}>
              <TableRow >
                <TableCell>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon style={{color: '#FFFAF0'}}/>
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={onSearchChange}
                    />
                  </div>
                </TableCell>
                <TableCell 
                  align="left"
                  style={{ 
                    fontSize: 25, 
                    color: '#FFFAF0'
                  }}
                >
                  {localChurch}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    component="span"
                    onClick={handleAddOpen}
                  >
                    <AddCircleIcon 
                      style={{ 
                        fontSize: 35, 
                        color: '#FFFAF0'
                      }}
                    />
                  </IconButton>
                  <IconButton 
                    component="span"
                    onClick={handleDeleteOpen}
                  >
                    <DeleteIcon 
                      style={{ 
                        fontSize: 35, 
                        color: '#FFFAF0'
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
    )
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.light
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '200px',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
      color: '#FFFAF0'
    },
    table: {
      minWidth: 650,
    },
  })
)