import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';

export const TeamCard = ({ name, members }: any) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container alignItems="center" className={classes.root}>
        <p>{name}</p>
        <Divider orientation="vertical" flexItem />
        <Droppable droppableId={name} key={name}>
          {(provided, snapshot) => (
            <List dense ref={provided.innerRef}>
              {members.map((member: any, index: number) => (
                <Draggable draggableId={member.id} index={index} key={member.id}>
                  {(provided, snapshot) => (
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
      </Grid>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);
