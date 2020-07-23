import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UserBank } from './UserBank';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TeamList } from './TeamList';
import { TEAMS, MEMBERS } from './database';
import { TeamState, DraggedItem } from './models';
import { add, reorder } from './services';

export const Teams = () => {
  const classes = useStyles();
  let initialState: TeamState = {};
  TEAMS.map((team) => (initialState[team.role] = team.members));

  const [teams, setTeams] = useState<TeamState>(initialState);
  const [draggedItem, setDraggedItem] = useState<DraggedItem>({
    member: { id: '', name: '' },
    source: '',
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <DragDropContextWrapper
          teams={teams}
          handleTeams={setTeams}
          handleDraggedItem={setDraggedItem}
        >
          <>
            <Grid item xs={2} style={{ paddingLeft: '30px' }}>
              <UserBank members={MEMBERS} droppableId="USERBANK" className="userbank" />
            </Grid>
            <Grid item xs={10}>
              <TeamList teams={teams} draggedMember={draggedItem} />
            </Grid>
          </>
        </DragDropContextWrapper>
      </Grid>
    </div>
  );
};

interface DragDropContextWrapperProps {
  teams: TeamState;
  handleTeams: (state: TeamState) => void;
  handleDraggedItem: (draggedMember: DraggedItem) => void;
  children: JSX.Element;
}

const DragDropContextWrapper = ({
  teams,
  handleTeams,
  handleDraggedItem,
  children,
}: DragDropContextWrapperProps) => {
  const onDragStart: (result: DropResult) => void = useCallback(
    ({ source }: DropResult) => {
      handleDraggedItem({ member: MEMBERS[source.index], source: source.droppableId });
    },
    [handleDraggedItem],
  );

  const onDragEnd: (result: DropResult) => void = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return;
      switch (source.droppableId) {
        case destination.droppableId:
          handleTeams(reorder(teams, source, destination));
          handleDraggedItem({
            member: { id: '', name: '' },
            source: '',
          });
          break;
        case 'USERBANK':
          handleTeams(add(MEMBERS, teams, source, destination));
          handleDraggedItem({
            member: { id: '', name: '' },
            source: '',
          });
          break;
        default:
          break;
      }
    },
    [handleTeams],
  );
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
