import React, { useState } from 'react';
import { FormField } from '../../shared/FormField';

import { TextField, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// TODO hook up with db
// not sure if form control is needed

interface NewScheduleFormProps {
  onSubmit: (
    scheduleTitle: string,
    startDate: string,
    endDate: string,
    view: string,
    team: number,
  ) => void;
}

export const NewScheduleForm = ({ onSubmit }: NewScheduleFormProps) => {
  const [scheduleTitle, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState(toDateString(new Date()));
  const [endDate, setEndDate] = useState(toDateString(new Date()));
  const [view, setView] = useState<string>('');
  const [team, setTeam] = useState<number>(0);
  const classes = useStyles();

  //needed to format date so that the date picker can display it properly
  function toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  return (
    <div className={classes.root}>
      New Schedule Form
      <form className={classes.formStyle}>
        <FormField
          className={classes.nameInput}
          name="Name"
          label="Schedule Name"
          value={scheduleTitle}
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
        <FormControl className={classes.selectInput}>
          <InputLabel>View Type</InputLabel>
          <Select
            value={view}
            required={true}
            variant="outlined"
            onChange={(e: React.ChangeEvent<{ name: string; value: string }>) =>
              setView(e.target.value)
            }
          >
            <MenuItem value={'weekly'}>Weekly</MenuItem>
            <MenuItem value={'monthly'}>Monthly</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.selectInput}>
          <InputLabel>Team</InputLabel>
          <Select
            value={team}
            required={true}
            variant="outlined"
            onChange={(e: React.ChangeEvent<{ name: string; value: number }>) =>
              setTeam(e.target.value)
            }
          >
            <MenuItem value={1}>Dishwashing</MenuItem>
            <MenuItem value={2}>Laundry</MenuItem>
          </Select>
        </FormControl>
      </form>
      <button onClick={() => onSubmit(scheduleTitle, startDate, endDate, view, team)}>
        Create a new schedule
      </button>
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
    formStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameInput: {
      width: 300,
    },
    selectInput: {
      width: 300,
    },
  }),
);
