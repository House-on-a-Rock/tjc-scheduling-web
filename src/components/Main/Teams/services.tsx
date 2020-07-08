import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { AllMembersData, TeamData, TeamState } from './models';
import { v4 as uuid } from 'uuid';

export const getRenderItem = (items: any, className: any) => (
  provided: any,
  snapshot: any,
  rubric: any,
) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <ListItem
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={snapshot.isDragging ? 'dragging' : ''}
        key={item.id}
      >
        {item.name}
      </ListItem>
    </React.Fragment>
  );
};

export function add(
  members: AllMembersData[],
  teamsState: TeamState,
  droppableSource: any,
  droppableDestination: any,
): TeamState {
  const stateClone: TeamData[] = teamsState[droppableDestination.droppableId];
  const member = members[droppableSource.index];
  if (stateClone.map((item) => item.name).includes(member.name)) return teamsState;
  stateClone.splice(droppableDestination.index, 0, { ...member, id: uuid() });
  return { ...teamsState, [droppableDestination.droppableId]: stateClone };
}

export function reorder(state: TeamState, start: any, end: any) {
  const list = state[start.droppableId];
  const [removed] = list.splice(start.index, 1);
  list.splice(end.index, 0, removed);
  return { ...state, [start.droppableId]: list };
}
