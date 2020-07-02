import React from 'react';
import { TeamCard } from './TeamCard';
import { TeamState } from './Teams';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

interface TeamListProps {
  teams: TeamState;
}

export const TeamList = ({ teams }: TeamListProps) => {
  return (
    <>
      <Typography variant="h4">Teams</Typography>
      {Object.keys(teams).map((list, index) => (
        <TeamCard
          key={`team-${index}`}
          name={list}
          members={Object.values(teams)[index]}
        />
      ))}
      <NewTeamCard />
    </>
  );
};

const NewTeamCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>
        <IconButton>
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: '.5em',
    height: '20vh',
    // backgroundColor: 'yellow',
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15vw',
    // backgroundColor: 'red',
  },
  list: {
    flexGrow: 10,
    // backgroundColor: 'blue',
  },
}));
