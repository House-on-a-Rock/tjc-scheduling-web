import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../shared/types/useSelector';
import { Redirect } from 'react-router-dom';

// material UI
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { green, red, amber } from '@material-ui/core/colors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CSS from 'csstype';

// other components
import { ConfirmDialog } from '../shared/ConfirmDialogue';
import { AddUserDialog } from '../shared/AddUserDialogue';
import { AddRoleDialog } from '../shared/AddRoleDialogue';

// actions
import { onLoadMembers } from '../../store/actions';

// dummy data
// import {userData} from './membersDatabase';

// types
import {MemberStateData} from '../../store/types';

// var rows = userData;

const styleHead: CSS.Properties = {
  fontWeight: 'bold'
}

export const Members = () => {
  const access_token = localStorage.getItem('access_token');
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [database, setDatabase] = useState<UserType[]>(userData);
  const members = useSelector(({members}) => members.members)
  const [selected, setSelected] = useState<number[]>([]);
  const [searchfield, setSearchField] = useState<string>('');
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<boolean>(false);
  const [selectionExists, setSelectionExists] = useState<boolean>(true);
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const [selectUser, setSelectUser] = useState<MemberStateData>({
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    church: {name: ''},
    roles: []
  });

  useEffect(() => {
    dispatch(onLoadMembers(access_token));
    console.log(members);
  }, [])

  const handleDeleteOpen = () => {
    console.log(selected)
    if (selected.length > 0) setOpenConfirm(true);
  };
  
  const handleAddOpen = () => {
    setOpenAdd(true);
  }
  const handleDeleteClose = (value: boolean) => {
    setOpenConfirm(false);
    setSelectedValue(value);
    if (value) {
      selected.map(selectedRow => {
        // rows = rows.filter(function(row) { return row.id !== selectedRow})
      })
      setSelected([]);
      // setDatabase(rows);
    }
  };

  const handleAddClose = (value: boolean, firstName: string, lastName: string, email: string, church: string) => {
    setOpenAdd(false);
    setSelectedValue(value);
    if (value && firstName && lastName && email && church) {
      // rows.push({
      //   id: uuid(),
      //   firstName: firstName,
      //   lastName: lastName,
      //   email: email,
      //   church: {name: church},
      //   roles: []
      // })
      // setDatabase(rows);
    }
  }

  const handleRowClick = (event: React.MouseEvent<unknown>, row: MemberStateData) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: number[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row.id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length -1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
    } else {
      newSelected = [row.id]
    }
    setSelectUser(row);
    setSelected(newSelected);
    if (newSelected.length > 0) {
      setSelectionExists(false);
    } else {
      setSelectionExists(true);
    }
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(members)
    setSearchField(event.target.value);
  }

  const filteredUsers = members.filter(function(row: any) {
    // const keys = Object.keys(row)
    // return keys.map(key => {
    //   return key !== "roles" ? row[key].toLowerCase().includes(searchfield.toLowerCase()) : false
    // })
    for (var key in row) {
      if (key === 'roles' || key === 'id' || key === 'ChurchId') continue;
      console.log(key)
      if (key !== 'church') {
        if (row[key].toLowerCase().includes(searchfield.toLowerCase())) return true;
      } else {
        if (row[key].name.toLowerCase().includes(searchfield.toLowerCase())) return true;
      }
    }
    return false;
  })

  if (!access_token){
    return <Redirect to='/' />
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <List component={Paper} subheader={
          <ListSubheader className={classes.sidebar} component={Paper}>
            Info
          </ListSubheader>}
        >
          <ListItem key="firstname" button>
            <ListItemText primary={selectUser.firstName} secondary="firstname"/>
          </ListItem>
          <ListItem key="lastname" button>
            <ListItemText primary={selectUser.lastName} secondary="lastname"/>
          </ListItem>
          <ListItem key="email" button>
            <ListItemText primary={selectUser.email} secondary="email"/>
          </ListItem>
          <ListItem key="church" button>
            <ListItemText primary={selectUser.church.name} secondary="church"/>
          </ListItem>
        </List>
        <Divider/>
        <List component={Paper}
          subheader={
          <ListSubheader className={classes.sidebar} component={Paper}>
            Roles
          </ListSubheader>
          }>
          {/* {selectUser.roles.map((role: string) => {
            return (
              <ListItem key={role} button>
                <ListItemText primary={role}/>
              </ListItem>
            )
          })} */}
        </List>
      </Grid>
      <Grid item xs={9}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
                  <TableCell>
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
                      <RemoveCircleIcon 
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
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow >
                    <TableCell style={styleHead}>First&nbsp;Name</TableCell>
                    <TableCell style={styleHead} align="left">Last&nbsp;Name</TableCell>
                    <TableCell style={styleHead} align="left">Email</TableCell>
                    <TableCell style={styleHead} align="left">Church</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((row) => {
                  const isitemSelected = isSelected(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={event => {
                        handleRowClick(event, row)
                      }}
                      selected={isitemSelected} 
                      key={row.id}
                    >
                      <TableCell component="th" variant="body" scope="row">
                          {row.firstName}
                      </TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.lastName}</TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.email}</TableCell>
                      <TableCell component="th" variant="body" scope="row" align="left">{row.church.name}</TableCell>
                    </TableRow>
                )})  
                }
              </TableBody>
            </Table>
        </TableContainer>
      </Grid>
      <ConfirmDialog selectedValue={selectedValue} open={openConfirm} onClose={handleDeleteClose} title='Confirm Delete Action'/>
      <AddUserDialog selectedValue={selectedValue} open={openAdd} onClose={handleAddClose} title='Add User'/>
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