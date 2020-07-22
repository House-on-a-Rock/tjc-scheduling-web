import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../shared/types/useSelector';

// material UI
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

import CSS from 'csstype';

// shared components
import { ConfirmationDialog } from '../shared/ConfirmationDialog';
import { FormDialog } from '../shared/FormDialog';

// member page components
import { MembersSidebar } from './Members/MembersSidebar';
import { MembersHeader } from './Members/MembersHeader';
import { MembersUsersTable } from './Members/MembersUsersTable';

// actions
import { onLoadMembers, onLoadUser, onDeleteMembers, onAddMember } from '../../store/actions';

// other stuffs
import { validateEmail } from '../../store/actions/helper_functions';

// types
import {MemberStateData} from '../../store/types';

const styleHead: CSS.Properties = {
  fontWeight: 'bold'
}

export const Members = () => {
  // hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  // reducer state
  const members = useSelector(({members}) => members.members);
  const selectedUser = useSelector(({members}) => members.selectedUser);
  const localChurch = useSelector(({members}) => members.localChurch);

  // component state
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchfield, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

  useEffect(() => {
    dispatch(onLoadMembers());
  }, [])

  const handleDeleteOpen = () => {
    if (selectedRows.length > 0) setIsConfirmDialogOpen(true);
  };
  
  const handleAddOpen = () => {
    setIsAddDialogOpen(true);
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = members.map((member) => member.id);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  }

  const handleDeleteClose = async (value: boolean) => {
    setIsConfirmDialogOpen(false);
    if (value) {
      await dispatch(onDeleteMembers(selectedRows))
      setSelectedRows([]);
      dispatch(onLoadMembers());
    }
  };

  const handleAddClose = async (value: boolean, firstName: string, lastName: string, email: string, password: string) => {
    setIsAddDialogOpen(false);
    if (value && firstName && lastName && email && password && validateEmail(email)) {
      await dispatch(onAddMember(firstName, lastName, email, password));
      dispatch(onLoadMembers());
    }
  }

  const handleRowClick = (event: React.MouseEvent<unknown>, row: MemberStateData) => {
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(row.id);
    console.log(selectedRows, selectedIndex, selectedRows.slice(1));
    let newSelectedRows: number[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows, row.id);
      } else if (selectedIndex === 0) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedRows = newSelectedRows.concat(
          selectedRows.slice(0, selectedIndex), 
          selectedRows.slice(selectedIndex + 1),
        );
      }
      // switch (true) {
      //   case selectedIndex === -1:
      //     newSelectedRows = newSelectedRows.concat(selectedRows, row.id);
      //   case selectedIndex === 0:
      //     newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
      //   case selectedIndex === selectedRows.length -1:
      //     newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
      //   case selectedIndex > 0:
      //     newSelectedRows = newSelectedRows.concat(
      //       selectedRows.slice(0, selectedIndex), 
      //       selectedRows.slice(selectedIndex + 1),
      //     );
      // }
    } else {
      if (selectedIndex === -1)
        newSelectedRows = [row.id]
      else
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }
    dispatch(onLoadUser(row));
    setSelectedRows(newSelectedRows);
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(members)
    setSearchField(event.target.value);
  }

  const filteredUsers = members.filter(function(row: any) {
    for (var key in row) {
      console.log(key)
      if (key === 'roles' || key === 'id' || key === 'ChurchId' || key === 'disabled') continue;
      if (key !== 'church') {
        if (row[key].toLowerCase().includes(searchfield.toLowerCase())) return true;
      } else {
        if (row[key].name.toLowerCase().includes(searchfield.toLowerCase())) return true;
      }
    }
    return false;
  })

  return (
    <Grid container spacing={3}>
      <MembersSidebar selectedUser={selectedUser} />
      <Grid item xs={9}>
        <MembersHeader 
          localChurch={localChurch}
          onSearchChange={onSearchChange}
          handleAddOpen={handleAddOpen}
          handleDeleteOpen={handleDeleteOpen}
        />
        <MembersUsersTable 
          selectedRows={selectedRows}
          handleSelectAllClick={handleSelectAllClick}
          filteredUsers={filteredUsers}
          isSelected={isSelected}
          handleRowClick={handleRowClick}
        />
      </Grid>
      <ConfirmationDialog isOpen={isConfirmDialogOpen} handleClose={handleDeleteClose} title='Confirm Delete Action'/>
      <FormDialog isOpen={isAddDialogOpen} handleClose={handleAddClose} title='Add User'/>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    header: {
      backgroundColor: theme.palette.primary.light
    },
    sidebar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
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
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)