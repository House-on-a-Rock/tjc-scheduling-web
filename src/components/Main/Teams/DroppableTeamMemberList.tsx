import React, { useState } from 'react';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MembersData, DraggedItem } from './models';
import { v4 as uuid } from 'uuid';

// Material UI Components
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { TextField } from '@material-ui/core';
import { TeamMemberRow } from './TeamMemberRow';

interface DroppableTeamMembersListProps {
  role: string;
  members: MembersData[];
  canDrop: () => boolean;
  draggedItem: DraggedItem;
}

export const DroppableTeamMembersList = ({
  role,
  members,
  canDrop,
  draggedItem,
}: DroppableTeamMembersListProps) => {
  const classes = useStyles();

  const [memberInput, setMemberInput] = useState({ value: '', error: '' });

  // handleSubmit and handleDelete are placeholder functions
  function handleSubmit(event: any) {
    event.preventDefault();
    // useSelector if name doesn't exist in reducer, return invalid
    if (members.find((member: any) => member.name === memberInput.value)) {
      setMemberInput({ ...memberInput, error: 'User already exists' });
    } else {
      members.push({ id: uuid(), name: memberInput.value });
      setMemberInput({ ...memberInput, value: '', error: '' });
    }
  }

  function handleDelete(selectedMember: any, role: any, index: any) {
    if (members.find((member) => member.name === selectedMember.name)) {
      members.splice(index, 1);
      setMemberInput({ ...memberInput, value: '', error: '' });
    }
  }

  return (
    <Droppable droppableId={role} key={role} isDropDisabled={canDrop()}>
      {(provided: DroppableProvided) => (
        <List dense ref={provided.innerRef} className={classes.list}>
          {members.map((member: MembersData, index: number) => {
            console.log('List', members);
            return draggedItem.source === '' || !(draggedItem.source === 'USERBANK') ? (
              <Draggable draggableId={member.id} index={index} key={member.id}>
                {(provided: DraggableProvided) => (
                  <TeamMemberRow
                    member={member}
                    role={role}
                    index={index}
                    providedRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    onDelete={handleDelete}
                  />
                )}
              </Draggable>
            ) : (
              <>
                <TeamMemberRow
                  member={member}
                  role={role}
                  index={index}
                  onDelete={handleDelete}
                />
              </>
            );
          })}
          {provided.placeholder}
          <ListItem>
            <form onSubmit={handleSubmit}>
              <TextField
                size="small"
                value={memberInput.value}
                onChange={(event) =>
                  setMemberInput({ ...memberInput, value: event.target.value })
                }
                placeholder="New name"
                onBlur={(event) => event.target.value && handleSubmit(event)}
                error={!!memberInput.error}
                helperText={memberInput.error}
              ></TextField>
            </form>
          </ListItem>
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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '15vw',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '79%',
  },
}));
