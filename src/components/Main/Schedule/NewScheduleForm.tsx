import React from 'react';
import {
  ValidatedTextField,
  // useValidatedTextField,
  stringLengthCheck,
} from '../../shared/ValidatedTextField';
import { ValidatedSelect } from '../../shared/ValidatedSelect';
import { useValidatedField } from '../../shared/Hooks/useValidatedField';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Tooltip } from '../../shared/Tooltip';

import { addSchedule } from '../../../store/apis/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
// TODO hook up teams with data from DB

interface NewScheduleFormProps {
  // error: any;
  // onSubmit: (
  //   title: string,
  //   startDate: string,
  //   endDate: string,
  //   view: string,
  //   team: number,
  // ) => void;
  onClose: () => void;
}

export const NewScheduleForm = ({ onClose }: NewScheduleFormProps) => {
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const classes = useStyles();

  const [title, setTitle, setTitleError, resetTitleError] = useValidatedField(
    '',
    'Title must not be blank and be under 32 characters long',
  );
  const [startDate, setStartDate, setStartError, resetStartError] = useValidatedField(
    toDateString(new Date()),
    'Invalid date range',
  );
  const [endDate, setEndDate, setEndError, resetEndError] = useValidatedField(
    toDateString(new Date(tomorrow)),
    'Invalid date range',
  );
  const [team, setTeam, setTeamError, resetTeamError] = useValidatedField(
    0,
    'Please assign a team to this schedule',
  );

  //needed to format date so that the date picker can display it properly
  function toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const cache = useQueryCache();
  const [
    mutateAddSchedule,
    { status: addScheduleStatus, error: addScheduleError },
  ] = useMutation(addSchedule, {
    onSuccess: () => cache.invalidateQueries('scheduleTabs'),
  });

  async function onNewScheduleSubmit(
    scheduleTitle: string,
    startDate: string,
    endDate: string,
    view: string,
    team: number,
  ) {
    const response = await mutateAddSchedule({
      scheduleTitle,
      startDate,
      endDate,
      view,
      team,
      churchId: 2,
    });
    // console.log('response', response);
    // console.log('addScheduleError', addScheduleError);
    // setIsNewScheduleVisible(false);
    // setAlert({ message: response.data, status: 'success' }); //response.statusText = "OK", response.status == 200
  }

  function onSubmitForm() {
    resetTitleError();
    resetStartError();
    resetEndError();
    resetTeamError();

    if (
      title.value.length > 0 &&
      title.value.length < 32 &&
      endDate.value > startDate.value &&
      team.value > 0
    )
      onNewScheduleSubmit(
        title.value,
        startDate.value,
        endDate.value,
        'weekly',
        team.value,
      );

    setTitleError(stringLengthCheck(title.value));
    setStartError(endDate.value < startDate.value);
    setEndError(endDate.value < startDate.value);
    setTeamError(team.value === 0);
  }

  return (
    <div className={classes.root}>
      New Schedule Form
      <form className={classes.formStyle}>
        {/* {error && <div> oops </div>} */}
        <div className={classes.tooltipContainer}>
          <ValidatedTextField
            className={classes.nameInput}
            label="Schedule Title"
            input={title}
            handleChange={setTitle}
            autoFocus
          />
          <Tooltip
            id="scheduleName"
            text="Example name: Jan-Mar Schedule. Must be unique"
          />
        </div>
        <div className={classes.tooltipContainer}>
          <ValidatedTextField
            className={classes.datePicker}
            label="Start Date"
            input={startDate}
            handleChange={setStartDate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <ValidatedTextField
            className={classes.datePicker}
            label="End Date"
            input={endDate}
            handleChange={setEndDate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Tooltip
            id="datePicker"
            text="Select the begin date and end date for this schedule"
          />
        </div>
        <ValidatedSelect
          className={classes.selectContainer}
          input={team}
          onChange={setTeam}
          toolTip={{ id: 'team', text: 'Select someone' }}
        >
          <MenuItem value={0}>Assign this schedule to a team</MenuItem>
          <MenuItem value={1}>Church Council</MenuItem>
          <MenuItem value={2}>RE</MenuItem>
        </ValidatedSelect>
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
    },
    selectInput: {
      width: 300,
    },
  }),
);
