import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { UserBank } from './UserBank';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TeamList } from './TeamList';
import { TEAMS, MEMBERS } from './database';
import { TeamState } from './models';
import { add, reorder } from './services';

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

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
