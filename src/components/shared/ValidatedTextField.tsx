import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextFieldState } from '../../shared/types/models';

interface IValidatedTextFieldProps<T> {
  label: string;
  input: TextFieldState<T>;
  className?: string;
  handleChange: (input: TextFieldState<T>) => void;
  [x: string]: any;
}

//wip hook
export function useValidatedTextInput(
  initialState: TextFieldState<string>,
  condition: boolean,
  msg: string,
) {
  const [inputState, setInputState] = useState(createTextFieldState(initialState));
}

export const createTextFieldState: <T>(arg: T) => TextFieldState<T> = (value) => ({
  value: value,
  message: '',
  valid: true,
});

export const constructError: <T>(
  condition: boolean,
  messsage: string,
  state: TextFieldState<T>,
  setStateCallback: React.Dispatch<React.SetStateAction<TextFieldState<T>>>,
) => void = (condition, message, state, setStateCallback) => {
  if (condition)
    setStateCallback({
      ...state,
      valid: false,
      message: message,
    });
};

export const ValidatedTextField: (
  arg: IValidatedTextFieldProps<string>, //couldn't get this to work with type <T>
) => JSX.Element = ({ label, input, handleChange, className, ...extraProps }) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id={label}
    label={label}
    name={label}
    value={input.value}
    onChange={({ target }) => handleChange({ ...input, value: target.value })}
    className={className}
    error={!input.valid}
    helperText={input.valid ? '' : input.message}
    {...extraProps}
  />
);
