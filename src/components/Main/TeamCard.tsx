import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const TeamCard = ({ name, members }: any) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.details}>
        <Typography component="h5" variant="h5">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Write a long form description here
        </Typography>
      </CardContent>
      <Divider orientation="vertical" flexItem />
      <CardContent className={classes.list}>
        <Droppable droppableId={name} key={name}>
          {(provided, snapshot) => (
            <List dense ref={provided.innerRef} className={classes.list}>
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
