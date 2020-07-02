import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { UserBank } from './UserBank';
import { DragDropContext } from 'react-beautiful-dnd';
import { TeamList } from './TeamList';
import { v4 as uuid } from 'uuid';

const MEMBERS: AllMembersData[] = [
  { id: uuid(), name: 'Shaun Tung' },
  { id: uuid(), name: 'Ted Chen' },
  { id: uuid(), name: 'Ian Lin' },
  { id: uuid(), name: 'Michelle Lin' },
  { id: uuid(), name: 'Alan Lin' },
];

export interface BackendTeamsData {
  name: string;
  members: TeamData[];
}
export interface TeamData {
  id: string;
  name: string;
}

export interface AllMembersData {
  id: string;
  name: string;
}

export interface TeamState {
  [key: string]: TeamData[];
}

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

export const Teams = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
  }));
  const classes = useStyles();
  let initialState: TeamState = {};
  TEAMS.map((team) => (initialState[team.name] = team.members));

  const [teams, setTeams] = useState<TeamState>(initialState);

  const onDragEnd: any = useCallback(
    (result: any) => {
      const { source, destination } = result;

      if (!destination) return;

      switch (source.droppableId) {
        case destination.droppableId:
          setTeams((state): TeamState => reorder(state, source, destination));
          break;
        case 'USERBANK':
          setTeams((state): TeamState => add(MEMBERS, state, source, destination));
          break;
        default:
          break;
      }
    },
    [setTeams],
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid item xs={2} style={{ paddingLeft: '30px' }}>
            <UserBank members={MEMBERS} droppableId="USERBANK" className="userbank" />
          </Grid>
          <Grid item xs={10}>
            <TeamList teams={teams} />
          </Grid>
        </DragDropContext>
      </Grid>
    </div>
  );
};

const TEAMS: BackendTeamsData[] = [
  {
    name: 'Sermon Speakers',
    members: [
      { id: uuid(), name: 'Tom Nook' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Jane Doe' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
  {
    name: 'Pianists',
    members: [
      { id: uuid(), name: 'Tom Nook' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Michelle Nook' },
      { id: uuid(), name: 'Wells Doe' },
    ],
  },
  {
    name: 'Announcers',
    members: [
      { id: uuid(), name: 'Ted Nook' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Jane Nook' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
  {
    name: 'Senior Class Teachers',
    members: [
      { id: uuid(), name: 'Isabel Nook' },
      { id: uuid(), name: 'Ian Doe' },
      { id: uuid(), name: 'Jane Nook' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
];
