import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UserBank } from './UserBank';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TeamList } from './TeamList';
import { AllMembersData, TeamState, TeamData, TEAMS, MEMBERS } from './database';
import { v4 as uuid } from 'uuid';

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
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
export const Teams = () => {
  const classes = useStyles();
  let initialState: TeamState = {};
  TEAMS.map((team) => (initialState[team.role] = team.members));

  const [teams, setTeams] = useState<TeamState>(initialState);
  const [mode, setMode] = useState<string>('view');

  const [draggedItem, setDraggedItem] = useState<any>({
    member: { id: '', name: '' },
    source: '',
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <DragDropContextWrapper
          handleTeams={setTeams}
          handleDraggedItem={setDraggedItem}
          mode={mode}
        >
          <Grid item xs={2} style={{ paddingLeft: '30px' }}>
            <UserBank
              members={MEMBERS}
              droppableId="USERBANK"
              className="userbank"
              mode={mode}
            />
          </Grid>
          <Grid item xs={10}>
            <TeamList
              teams={teams}
              draggedItem={draggedItem}
              mode={mode}
              handleMode={setMode}
            />
          </Grid>
        </DragDropContextWrapper>
      </Grid>
    </div>
  );
};

const DragDropContextWrapper = ({
  handleTeams,
  handleDraggedItem,
  mode,
  children,
}: any) => {
  const onDragStart: (result: DropResult) => void = useCallback(
    ({ source, destination }: DropResult) => {
      handleDraggedItem({ member: MEMBERS[source.index], source: source.droppableId });
    },
    [handleDraggedItem],
  );

  const onDragEnd: (result: DropResult) => void = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;
      switch (source.droppableId) {
        case destination.droppableId:
          handleTeams((state: TeamState) => reorder(state, source, destination));
          break;
        case 'USERBANK':
          handleTeams((state: TeamState) => add(MEMBERS, state, source, destination));
          break;
        default:
          break;
      }
    },
    [handleTeams],
  );
  return mode === 'edit' ? (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  ) : (
    children
  );
};
