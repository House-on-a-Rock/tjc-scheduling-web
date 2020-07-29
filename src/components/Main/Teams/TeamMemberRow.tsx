import React from 'react';

// Material UI Components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export const TeamMemberRow = ({
  member,
  role,
  index,
  providedRef,
  draggableProps,
  dragHandleProps,
  onDelete,
}: any) => (
  <div ref={providedRef} {...draggableProps} {...dragHandleProps}>
    <ListItem>
      <ListItemText id={member.id} primary={member.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onDelete(member, role, index)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </div>
);
