import React, { useState } from 'react';
import { FormField } from '../../shared/FormField';

import { TextField, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
// import InfoIcon from '@material-ui/icons/Info';

// import ReactTooltip from 'react-tooltip';
import { Tooltip } from '../../shared/Tooltip';

// TODO hook up teams with data from DB

interface NewScheduleFormProps {
  onSubmit: (
    scheduleTitle: string,
    startDate: string,
    endDate: string,
    view: string,
    team: number,
  ) => void;
  onClose: () => void;
}

export const NewScheduleForm = ({ onSubmit, onClose }: NewScheduleFormProps) => {
  const [scheduleTitle, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState(toDateString(new Date()));
  const [endDate, setEndDate] = useState(toDateString(new Date()));
  const view = 'weekly';
  const [team, setTeam] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  //needed to format date so that the date picker can display it properly
  function toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function NewlineText(props: { text: string }) {
    const text = props.text;
    const newText = text.split('\n').map((str) => <p>{str}</p>);
    return <div>{newText}</div>;
  }

  function onSubmitForm() {
    setErrorMessage('');
    let msg: string = '';
    if (scheduleTitle.length === 0 || scheduleTitle.length >= 32)
      msg = '-Title must be not be blank and be under 32 characters long'; //line breaks don't work ahhh
    if (new Date(endDate) <= new Date(startDate)) msg += '\n-Invalid Date Range';
    if (team === 0) msg += '\n-Please assign a team to this schedule';
    if (msg.length > 0) return setErrorMessage(msg);

    onSubmit(scheduleTitle, startDate, endDate, view, team);
  }

  return (
    <div className={classes.root}>
      New Schedule Form
      {errorMessage.length > 0 && (
        <div style={{ color: 'red' }}>
          <NewlineText text={errorMessage} />
        </div>
      )}
      <form className={classes.formStyle}>
        <div className={classes.tooltipContainer}>
          <FormField
            className={classes.nameInput}
            name="Name"
            label="Schedule Name"
            value={scheduleTitle}
            handleChange={setScheduleName}
          />
          <Tooltip
            id="scheduleName"
            text="Example name: Jan-Mar Schedule. Must be unique"
          />
        </div>
        <div className={classes.tooltipContainer}>
          <TextField
            className={classes.datePicker}
            variant="outlined"
            id="start date"
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            className={classes.datePicker}
            variant="outlined"
            id="end date"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Tooltip
            id="datePicker"
            text="Select the begin date and end date for this schedule"
          />
        </div>

        <FormControl className={classes.selectContainer}>
          {/* <InputLabel>Team</InputLabel> */}
          <Select
            className={classes.selectInput}
            value={team}
            required={true}
            variant="outlined"
            onChange={(e: React.ChangeEvent<{ name: string; value: number }>) =>
              setTeam(e.target.value)
            }
          >
            <MenuItem value={0}>Assign this schedule to a team</MenuItem>
            <MenuItem value={1}>Church Council</MenuItem>
            <MenuItem value={2}>RE</MenuItem>
          </Select>
          <FormHelperText>Team</FormHelperText>
          <Tooltip id="Team" text="Select who is able to edit this schedule" />
        </FormControl>
      </form>
      <button onClick={onSubmitForm}>Create a new schedule!</button>
      <button onClick={onClose}>Cancel</button>
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
      justifyContent: 'space-around',
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
    datePicker: {
      margin: 5,
    },
    tooltipContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    nameInput: {
      width: 300,
    },
    selectContainer: {
      width: 400,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selectInput: {
      width: 300,
    },
  }),
);
