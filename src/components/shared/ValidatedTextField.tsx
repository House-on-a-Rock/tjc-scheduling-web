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

//use this hook to handle error and state
export function useValidatedTextInput<T>(initialState: T, message: string) {
  const [inputState, setInputState] = useState<TextFieldState<T>>(
    createTextFieldState(initialState),
  );

  const setInputStateError = (condition: boolean) => {
    if (condition)
      setInputState({
        ...inputState,
        valid: false,
        message: message,
      });
  };
  const resetInputState = () =>
    setInputState({ ...inputState, valid: true, message: '' });

  //not really sure why i need the 'as const' but i need it to work
  return [inputState, setInputState, setInputStateError, resetInputState] as const;
}

const createTextFieldState: <T>(arg: T) => TextFieldState<T> = (value) => ({
  value: value,
  message: '',
  valid: true,
});

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
