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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

interface TeamCardProps {
  role: string;
  members: MembersData[];
  draggedItem: DraggedItem;
}

export const TeamCard = ({ role, members, draggedItem }: TeamCardProps) => {
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
      <CardContent className={classes.list} style={{ overflow: 'auto' }}>
        <DroppableMembers
          role={role}
          canDrop={canDrop}
          members={members}
          draggedItem={draggedItem}
        />
      </CardContent>
    </Card>
  );
};

interface DroppableMembersProps {
  role: string;
  members: MembersData[];
  canDrop: () => boolean;
  draggedItem: DraggedItem;
}

const DroppableMembers = ({
  role,
  members,
  canDrop,
  draggedItem,
}: DroppableMembersProps) => {
  const classes = useStyles();
  console.log(draggedItem);
  return (
    <Droppable droppableId={role} key={role} isDropDisabled={canDrop()}>
      {(provided: DroppableProvided) => (
        <List dense ref={provided.innerRef} className={classes.list}>
          {members.map((member: MembersData, index: number) => {
            return draggedItem.source === '' || !(draggedItem.source === 'USERBANK') ? (
              <Draggable draggableId={member.id} index={index} key={member.id}>
                {(provided: DraggableProvided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItemText id={member.id} primary={member.name} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => console.log(member, role, index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ) : (
              <>
                <ListItem>
                  <ListItemText id={member.id} primary={member.name} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => console.log(member, role, index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </>
            );
          })}
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
