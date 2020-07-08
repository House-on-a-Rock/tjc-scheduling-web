import React from 'react';
import { getRenderItem } from './services';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './UserBank.css';

// Material UI Components
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';

export const UserBank = ({ members, className, droppableId, mode }: any) => {
  const classes = useStyles();
  const church = { name: 'Philadelphia' };
  return (
    <Paper>
      {mode === 'edit' ? (
        <DroppableBank
          members={members}
          className={className}
          droppableId={droppableId}
          classes={classes}
          church={church}
        />
      ) : (
        <List dense className={classes.root}>
          <ListSubheader>{`List of ${church.name} church members`}</ListSubheader>
          {members.map((member: any, index: any) => {
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

const DroppableBank = ({ members, className, droppableId, classes, church }: any) => (
  <Droppable
    renderClone={getRenderItem(members, className)}
    droppableId={droppableId}
    isDropDisabled={true}
  >
    {(provided, snapshot) => (
      <List dense className={classes.root} ref={provided.innerRef}>
        <ListSubheader>{`List of ${church.name} church members`}</ListSubheader>
        {members.map((member: any, index: any) => {
          const shouldRenderClone = member.id === snapshot.draggingFromThisWith;
          return (
            <React.Fragment key={member.id}>
              {shouldRenderClone ? (
                <ListItem className="react-beautiful-dnd-copy">
                  <ListItemText id={member.id} primary={member.name} />
                </ListItem>
              ) : (
                <Draggable index={index} draggableId={member.id}>
                  {(provided, snapshot) => (
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
