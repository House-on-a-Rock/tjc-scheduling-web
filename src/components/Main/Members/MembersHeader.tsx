import React from 'react';
import { themeExtension } from '../../../shared/styles/theme.js';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
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

export const MembersHeader = ({
  localChurch,
  onSearchChange,
  handleAddOpen,
  handleDeleteOpen,
}: MembersHeaderProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="members table controls">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>
              <div className={classes.search}>
                <SearchIcon className={classes.searchIcon} />
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
            <TableCell className={classes.localChurchName}>
              {localChurch || 'Local Church Name'}
            </TableCell>
            <TableCell align="right">
              <IconButton component="span" onClick={handleAddOpen}>
                <AddCircleIcon className={classes.addIcon} />
              </IconButton>
              <IconButton component="span" onClick={handleDeleteOpen}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
    },
    header: {
      backgroundColor: themeExtension.card.backgroundColor,
    },
    search: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: themeExtension.sideBar.backgroundColor,
      color: themeExtension.typography.common.color,
      transition: themeExtension.transition.fast,
      '&:hover': {
        backgroundColor: themeExtension.palette.common.lightBlue,
        color: 'white',
      },
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
    addIcon: {
      fontSize: 35,
      ...themeExtension.button.icon,
    },
    deleteIcon: {
      fontSize: 35,
      ...themeExtension.button.icon,
    },
    localChurchName: {
      fontSize: 25,
      color: themeExtension.typography.common.color,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    table: {
      minWidth: 650,
    },
  }),
);
