import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

export const TeamCard = ({ role, members, draggedItem, mode }: any) => {
  const classes = useStyles();
  const canDrop: () => boolean = () =>
    draggedItem.source === 'USERBANK'
      ? members.map((member: any) => member.name).includes(draggedItem.member.name)
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
          <DroppableMembers
            role={role}
            canDrop={canDrop}
            members={members}
            classes={classes}
          />
        ) : (
          <List dense className={classes.list}>
            {members.map((member: any, index: number) => (
              <ListItem>{member.name}</ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

const DroppableMembers = ({ role, canDrop, members, classes }: any) => (
  <Droppable droppableId={role} key={name} isDropDisabled={canDrop()}>
    {(provided) => (
      <List dense ref={provided.innerRef} className={classes.list}>
        {members.map((member: any, index: number) => (
          <Draggable draggableId={member.id} index={index} key={member.id}>
            {(provided) => (
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
