import React from 'react';
import { TeamCard } from './TeamCard';
import { TeamState } from './Teams';
import Paper from '@material-ui/core/Paper';

interface TeamListProps {
  teams: TeamState;
}

export const TeamList = ({ teams }: TeamListProps) => (
  <Paper>
    {Object.keys(teams).map((list, index) => (
      <TeamCard key={`team-${index}`} name={list} members={Object.values(teams)[index]} />
    ))}
  </Paper>
);
