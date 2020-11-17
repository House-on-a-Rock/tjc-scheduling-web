import React, { useState } from 'react';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Tooltip } from './Tooltip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ValidatedFieldState } from '../../shared/types/models';

interface IValidatedSelectProps {
  input: ValidatedFieldState<number>;
  onChange: (arg: ValidatedFieldState<number>) => void;
  toolTip: { id: string; text: string };
  children: any[];
  [x: string]: any;
}

export const ValidatedSelect = ({
  input,
  onChange,
  toolTip,
  children,
  ...restProps
}: IValidatedSelectProps) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.selectContainer} error={!input.valid}>
      <InputLabel>Team</InputLabel>
      <Select
        className={classes.selectInput}
        value={input.value}
        required={true}
        variant="outlined"
        onChange={(e: React.ChangeEvent<{ name: string; value: number }>) =>
          onChange({ valid: true, message: '', value: e.target.value })
        }
        {...restProps}
      >
        {children}
      </Select>
      <FormHelperText style={{ color: 'red' }}>{input.message}</FormHelperText>
      <Tooltip id={toolTip.id} text={toolTip.text} />
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectContainer: {
      width: 400,
    },
    selectInput: {
      width: 300,
    },
  }),
);
