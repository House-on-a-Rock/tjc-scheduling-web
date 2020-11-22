import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ValidatedFieldState } from '../../shared/types/models';

interface IValidatedTextFieldProps {
  label: string;
  input: ValidatedFieldState<string>;
  className?: string;
  handleChange: (input: ValidatedFieldState<string>) => void;
  [x: string]: any;
}

//commonly used error checks
export const stringLengthCheck: (arg: string) => boolean = (title: string) =>
  title.length === 0 || title.length >= 32;

export const ValidatedTextField: (arg: IValidatedTextFieldProps) => JSX.Element = ({
  label,
  input,
  handleChange,
  className,
  ...restProps
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id={label}
    label={label}
    name={label}
    value={input.value}
    onChange={({ target }) =>
      handleChange({ valid: true, message: '', value: target.value })
    }
    className={className}
    error={!input.valid}
    helperText={input.valid ? '' : input.message}
    {...restProps}
  />
);
