import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { DataCellProps } from '../../../shared/types';
import { ContextMenu } from '../../shared/ContextMenu';

export const DataCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: DataCellProps) => {
  // We need to keep and update the state of the cell normally

  const [value, setValue] = useState(initialValue?.data);
  const [display, setDisplay] = useState('');

  // value.display ? value.display : `${value.firstName} ${value.lastName}`;
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // Doesn't blur on enter
  const handleEnter = (e: any) => {
    e = e || window.event;
    e.key === 'Enter' && updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    const initialData = initialValue?.data;
    setValue(initialValue?.data);
    if (initialData)
      initialData?.display
        ? setDisplay(initialData.display)
        : setDisplay(`${initialData.firstName} ${initialData.lastName}`);
  }, [initialValue]);

  return initialValue ? (
    <ContextMenu menuId={`${index}-${id}-${display}`} value={display}>
      <Input
        value={display}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={(e) => handleEnter(e)}
      />
    </ContextMenu>
  ) : (
    ''
  );
};
