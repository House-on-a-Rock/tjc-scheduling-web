import React from 'react';
import { TeamCard } from './TeamCard';
import { TeamState, DraggedItem } from './models';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

interface TeamListProps {
  teams: TeamState;
  draggedMember: DraggedItem;
  mode: string;
  handleMode: (mode: string) => void;
}

export const TeamList = ({ teams, draggedMember, mode, handleMode }: TeamListProps) => (
  <>
    <Typography variant="h4">Teams</Typography>
    <Button onClick={() => handleMode(mode === 'view' ? 'edit' : 'view')}>
      {mode === 'view' ? 'edit' : 'view'}
    </Button>
    {Object.keys(teams).map((role, index) => (
      <TeamCard
        key={`team-${index}`}
        role={role}
        members={Object.values(teams)[index]}
        draggedItem={draggedMember}
        mode={mode}
      />
    ))}
    <NewTeamCard />
  </>
);

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
