import React from 'react';
import { MembersData, DraggedItem } from './models';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { DroppableTeamMembersList } from './DroppableTeamMemberList';

interface TeamCardProps {
  type: string;
  members: MembersData[];
  draggedItem: DraggedItem;
}

export const TeamCard = ({ type, members, draggedItem }: TeamCardProps) => {
  const classes = useStyles();
  const canDrop: () => boolean = () =>
    draggedItem.source === 'USERBANK'
      ? members
          .map((member: MembersData) => member.name)
          .includes(draggedItem.member.name)
      : !(draggedItem.source === type);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>
        <Typography component="h5" variant="h5">
          {type}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Write a long form description here
        </Typography>
      </CardContent>
      <Divider orientation="vertical" flexItem />
      <CardContent className={classes.list} style={{ overflow: 'auto' }}>
        <DroppableTeamMembersList
          role={type}
          canDrop={canDrop}
          members={members}
          draggedItem={draggedItem}
        />
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
    flexDirection: 'column',
    width: '15vw',
    // backgroundColor: 'red',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    width: '79%',
  },
}));
