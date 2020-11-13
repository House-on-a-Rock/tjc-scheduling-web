import React, { useState } from 'react';
import { NewLineText } from '../../shared/NewLineText';

import { FormField } from '../../shared/FormField';
import { Tooltip } from '../../shared/Tooltip';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface NewServiceFormProps {
  order?: number;
  onSubmit: (name: string, order: number, dayOfWeek: number) => void;
  onClose: () => void;
}

//are these used anywhere else?
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const NewServiceForm = ({ order, onSubmit, onClose }: NewServiceFormProps) => {
  const [serviceName, setServiceName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<number>(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const serviceOrder = order + 1;

  function onSubmitForm() {
    setErrorMessage('');
    let msg: string = '';
    if (serviceName.length === 0 || serviceName.length >= 32)
      msg = '-Title must be not be blank and be under 32 characters long'; //line breaks don't work ahhh
    if (dayOfWeek < 0) msg += '\n-Must select a day of the week';
    if (msg.length > 0) return setErrorMessage(msg);

    onSubmit(serviceName, serviceOrder, dayOfWeek);
  }

  // function NewlineText(props: { text: string }) {
  //   const text = props.text;
  //   const newText = text.split('\n').map((str) => <p>{str}</p>);
  //   return <div>{newText}</div>;
  // }

  return (
    <div className={classes.root}>
      New Service Form
      {errorMessage.length > 0 && (
        <div style={{ color: 'red' }}>
          <NewLineText text={errorMessage} style={{ color: 'red' }} />
        </div>
      )}
      <form>
        <FormField
          className={classes.formInput}
          name="serviceName"
          label="Service Name"
          value={serviceName}
          handleChange={setServiceName}
        />

        <FormControl>
          <Select
            className={classes.selectInput}
            required
            value={dayOfWeek}
            variant="outlined"
            onChange={(e: React.ChangeEvent<{ name: string; value: number }>) =>
              setDayOfWeek(e.target.value)
            }
          >
            <MenuItem value={-1}>
              Select which day of the week this schedule is for
            </MenuItem>
            {daysOfWeek.map((day, index) => (
              <MenuItem key={index.toString()} value={index}>
                {day}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Day of Week</FormHelperText>
          <Tooltip
            id="Day of week"
            text="Select which day of the week this service occurs"
          />
        </FormControl>
      </form>
      <button onClick={onSubmitForm}>Create new service</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 400,
      width: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    formInput: { width: 300 },
    selectInput: {
      width: 300,
    },
  }),
);
