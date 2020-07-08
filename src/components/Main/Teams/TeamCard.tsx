import React from 'react';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MembersData, DraggedItem } from './models';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

interface TeamCardProps {
  role: string;
  members: MembersData[];
  draggedItem: DraggedItem;
  mode: string;
}

export const TeamCard = ({ role, members, draggedItem, mode }: TeamCardProps) => {
  const classes = useStyles();
  const canDrop: () => boolean = () =>
    draggedItem.source === 'USERBANK'
      ? members
          .map((member: MembersData) => member.name)
          .includes(draggedItem.member.name)
      : !(draggedItem.source === role);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>
        <Typography component="h5" variant="h5">
          {role}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Write a long form description here
        </Typography>
      </CardContent>
      <Divider orientation="vertical" flexItem />
      <CardContent className={classes.list}>
        {mode === 'edit' ? (
          <DroppableMembers role={role} canDrop={canDrop} members={members} />
        ) : (
          <List dense className={classes.list} key={role}>
            {members.map((member: MembersData, index: number) => (
              <ListItem key={`${role}-${index}`}>{member.name}</ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

interface DroppableMembersProps {
  role: string;
  members: MembersData[];
  canDrop: () => boolean;
}

const DroppableMembers = ({ role, members, canDrop }: DroppableMembersProps) => {
  const classes = useStyles();
  return (
    <Droppable droppableId={role} key={role} isDropDisabled={canDrop()}>
      {(provided: DroppableProvided) => (
        <List dense ref={provided.innerRef} className={classes.list}>
          {members.map((member: MembersData, index: number) => (
            <Draggable draggableId={member.id} index={index} key={member.id}>
              {(provided: DraggableProvided) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {member.name}
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
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
