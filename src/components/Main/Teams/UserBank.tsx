import React from 'react';
import { getRenderItem } from './services';
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableId,
} from 'react-beautiful-dnd';
import './UserBank.css';

// Material UI Components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { MembersData } from './models';

interface UserBankProps {
  members: MembersData[];
  className: string;
  droppableId: DroppableId;
  mode: string;
}

export const UserBank = ({ members, className, droppableId, mode }: UserBankProps) => {
  const classes = useStyles();
  const churchName = 'Philadelphia';
  console.log('className', className);
  return (
    <Paper>
      {mode === 'edit' ? (
        <DroppableBank
          members={members}
          className={className}
          droppableId={droppableId}
          church={churchName}
        />
      ) : (
        <List dense className={classes.root}>
          <ListSubheader>{`List of ${churchName} church members`}</ListSubheader>
          {members.map((member: MembersData, index: number) => {
            return (
              <React.Fragment key={member.id}>
                <ListItem>
                  <ListItemText id={member.id} primary={member.name} />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

interface DroppableBankProps {
  members: MembersData[];
  className: string;
  droppableId: DroppableId;
  church: string;
}

const DroppableBank = ({
  members,
  className,
  droppableId,
  church,
}: DroppableBankProps) => {
  const classes = useStyles();
  return (
    <Droppable
      renderClone={getRenderItem(members, className)}
      droppableId={droppableId}
      isDropDisabled={true}
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <List dense className={classes.root} ref={provided.innerRef}>
          <ListSubheader>{`List of ${church} church members`}</ListSubheader>
          {members.map((member: MembersData, index: number) => {
            const shouldRenderClone = member.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={member.id}>
                {shouldRenderClone ? (
                  <ListItem className="react-beautiful-dnd-copy">
                    <ListItemText id={member.id} primary={member.name} />
                  </ListItem>
                ) : (
                  <Draggable index={index} draggableId={member.id}>
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? 'dragging' : ''}
                      >
                        <ListItemText id={member.id} primary={member.name} />
                      </ListItem>
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    placeHolder: {
      display: 'none',
    },
  }),
);
