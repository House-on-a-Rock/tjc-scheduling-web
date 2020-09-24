import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions';

// material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {
  makeStyles,
  createStyles,
  Theme,
  createMuiTheme,
} from '@material-ui/core/styles';

// other components
import { DutyCountColumn } from './DutyCountColumn';
import { UserBank } from '../Teams/UserBank';
import { MembersData } from '../Teams/models';

import { MEMBERS } from '../Teams/database';

const members: MembersData[] = [
  {
    id: '1',
    name: 'Shaun Tung',
  },
  {
    id: '2',
    name: 'Alan Lin',
  },
];
const duties = [
  {
    role: 'AV',
    count: 4,
  },
  {
    role: 'Sermon Speaking',
    count: 2,
  },
];

export const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <button
        onClick={() => {
          // remove from local storage
          dispatch(logout());
        }}
      >
        Log Out
      </button>
      {/* <DroppableTeamMembersList role='AV' members={members} canDrop={function() { return false }} draggedItem={{ member: members[0], source: 'USERBANK'}}/> */}
      {/* <GridList className={classes.gridList} spacing={10} cols={6}> 
        <DutyCountColumn name='Shaun Tung' dutyCounts={duties}></DutyCountColumn>
      </GridList> */}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      width: '100%',
      overflow: 'auto',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    imgFullWidth: {
      width: '500 px',
      position: 'relative',
      transform: 'translateY(-50%)',
      top: '50%',
    },
  }),
);
