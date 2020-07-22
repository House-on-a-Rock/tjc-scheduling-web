import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import { MemberStateData } from '../../../store/types';

export interface MembersSidebarProps {
    selectedUser: MemberStateData;
}

export const MembersSidebar = ({selectedUser}: MembersSidebarProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
        <List component={Paper} subheader={
          <ListSubheader className={classes.sidebar} component={Paper}>
            Info
          </ListSubheader>}
        >
          <ListItem key="firstname" button>
            <ListItemText primary={selectedUser.firstName} secondary="firstname"/>
          </ListItem>
          <ListItem key="lastname" button>
            <ListItemText primary={selectedUser.lastName} secondary="lastname"/>
          </ListItem>
          <ListItem key="email" button>
            <ListItemText primary={selectedUser.email} secondary="email"/>
          </ListItem>
          <ListItem key="church" button>
            <ListItemText primary={selectedUser.church.name} secondary="church"/>
          </ListItem>
        </List>
        <Divider/>
        <List component={Paper}
          subheader={
          <ListSubheader className={classes.sidebar} component={Paper}>
            Roles
          </ListSubheader>
          }>
          {selectedUser.roles.map((role: string) => {
            return (
              <ListItem key={role} button>
                <ListItemText primary={role}/>
              </ListItem>
            )
          })}
        </List>
      </Grid>
    )
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    sidebar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)