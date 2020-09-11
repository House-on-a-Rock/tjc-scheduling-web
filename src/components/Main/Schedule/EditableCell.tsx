import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { EditableCellProps } from '../../../shared/types';

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: EditableCellProps) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  // We'll update the external data when the input is blurred or entered
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  const handleEnter = (e: any) => {
    e = e || window.event;
    e.key === 'Enter' && updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return initialValue ? (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={(e) => handleEnter(e)}
    />
  ) : (
    ''
  );
};
