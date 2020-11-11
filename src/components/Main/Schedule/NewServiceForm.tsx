import React, { useState } from 'react';

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
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);

  const classes = useStyles();
  const serviceOrder = order + 1;

  return (
    <div className={classes.root}>
      New Service Form
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
      <button onClick={() => onSubmit(serviceName, serviceOrder, dayOfWeek)}>
        Create new service
      </button>
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
