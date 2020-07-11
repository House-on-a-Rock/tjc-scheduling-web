import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
import InputBase from '@material-ui/core/InputBase';
import CSS from 'csstype';

// actions
import { getAllUsers } from '../../store/apis';

// dummy data
import data from './membersDatabase';

// types
import {UserType} from '../../shared/types/membersModel';

let index = -1;

const styleHead: CSS.Properties = {
  fontWeight: 'bold'
}

export const Members = () => {
    const classes = useStyles();
    const rows = data;
    const [selected, setSelected] = useState<string[]>([]);
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const [selectUser, setSelectUser] = useState<UserType>({
      firstName: '',
      lastName: '',
      email: '',
      church: '',
      roles: []
    });

    const handleClick = (event: React.MouseEvent<unknown>, row: UserType) => {
      let newSelected: string = row.firstName;
      index = rows.findIndex(rows => rows.firstName === newSelected);
      setSelectUser(row);
      setSelected([newSelected]);
    }
    return (
      <Grid container spacing={3}>
        <Grid component={Paper} item xs={3}>
          <List component="nav" subheader={
            <ListSubheader component="div">
              Info
            </ListSubheader>}
          >
            <ListItem button>
              <ListItemText primary={selectUser.firstName} secondary="firstname"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary={selectUser.lastName} secondary="lastname"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary={selectUser.email} secondary="email"/>
            </ListItem>
            <ListItem button>
              <ListItemText primary={selectUser.church} secondary="church"/>
            </ListItem>
          </List>
          <Divider/>
          <List component="nav"
            subheader={
            <ListSubheader component="div">
              Roles
            </ListSubheader>
            }>
            {selectUser.roles.map((role: string) => {
              return (
                <ListItem button>
                  <ListItemText primary={role}/>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow >
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </div>
                      </TableRow>
                      <TableRow >
                          <TableCell style={styleHead} align="left">First&nbsp;Name</TableCell>
                          <TableCell style={styleHead} align="left">Last&nbsp;Name</TableCell>
                          <TableCell style={styleHead} align="left">Email</TableCell>
                          <TableCell style={styleHead} align="left">Church</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => {
                        const isitemSelected = isSelected(row.firstName);

                        return (
                          <TableRow
                            hover
                            onClick={event => {
                              handleClick(event, row)
                            }}
                            selected={isitemSelected} 
                            key={row.firstName}
                          >
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell align="left">{row.lastName}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.church}</TableCell>
                          </TableRow>
                      )})  
                      }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
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
        marginLeft: theme.spacing(3),
        width: 'auto',
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
    },
    table: {
      minWidth: 650,
    }
  })
)