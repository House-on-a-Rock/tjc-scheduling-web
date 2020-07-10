import React from 'react';
import { useDispatch } from 'react-redux';

// material UI
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
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
import CSS from 'csstype';

// actions
import { getAllUsers } from '../../store/apis';

// dummy data
import data from './MembersData';

// types
import {userType} from '../../shared/types/membersData';

let index = -1;

const styleHead: CSS.Properties = {
  fontWeight: 'bold'
}

export const Members = () => {
    const classes = useStyles();
    const rows = data;
    const [selected, setSelected] = React.useState<string[]>([]);
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const [selectUser, setSelectUser] = React.useState<any>({
      firstName: '',
      lastName: '',
      email: '',
      roles: []
    });

    const handleClick = (event: React.MouseEvent<unknown>, row: userType) => {
      let newSelected: string = row.firstName;
      index = rows.findIndex(rows => rows.firstName === newSelected);
      setSelectUser(row);
      setSelected([newSelected]);
      console.log(typeof(selectUser))
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
                          <TableCell style={styleHead}>First&nbsp;Name</TableCell>
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
                              // console.log(selected)
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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});