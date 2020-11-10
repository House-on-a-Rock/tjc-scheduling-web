import React, { useState } from 'react';
import { FormField } from '../../shared/FormField';

import { TextField, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// TODO hook up with db

export const NewScheduleForm = () => {
  const [scheduleName, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState(toDateString(new Date()));
  const [endDate, setEndDate] = useState(toDateString(new Date()));
  const [team, setTeam] = useState<number>(0);
  const classes = useStyles();

  function toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  const teamsArray = [];

  return (
    <div className={classes.root}>
      New Schedule Form
      <FormField
        name="Name"
        label="Schedule Name"
        value={scheduleName}
        handleChange={setScheduleName}
      />
      <TextField
        id="start date"
        label="Start Date"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        id="end date"
        label="End Date"
        type="date"
        defaultValue={new Date().toISOString}
        InputLabelProps={{
          shrink: true,
        }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <FormControl>
        <InputLabel>Team</InputLabel>
        <Select
          value={team}
          onChange={(e: React.ChangeEvent<{ name: string; value: number }>) =>
            setTeam(e.target.value)
          }
          autoWidth={true}
          placeholder="Team"
        >
          <MenuItem value={1}>Dishwashing</MenuItem>
          <MenuItem value={2}>Laundry</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: '25%',
      left: '25%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%',
      width: '50%',
      backgroundColor: 'white',
      padding: 20,
      zIndex: 10,
    },
  }),
);
