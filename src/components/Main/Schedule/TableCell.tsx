import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { DataCellProps, UpdatableCellProps } from '../../../shared/types';
import { typographyTheme } from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const UpdatableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: UpdatableCellProps) => {
  const classes = useStyles();

  // We need to keep and update the state of the cell normally

  const [value, setValue] = useState(initialValue?.data);
  const [display, setDisplay] = useState('');

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

  // If the initialValue is changed externally, sync it up with our state
  useEffect(() => {
    const initialData = initialValue?.data;
    setValue(initialValue?.data);
    if (initialData)
      initialData?.display
        ? setDisplay(initialData.display)
        : setDisplay(`${initialData.firstName} ${initialData.lastName}`);
  }, [initialValue]);

  if (initialValue)
    return (
      <Input
        className={classes.cell}
        value={display}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={(e) => handleEnter(e)}
      />
    );
};

const Display = (text: string) => <div>{text}</div>;

export const DataCell = React.memo(
  ({ value: initialValue, onCellClick, isSelected }: DataCellProps) => {
    const classes = useStyles();
    if (!initialValue) return <></>;

    const [value, setValue] = useState(() => {
      return initialValue.data.display
        ? initialValue.data.display
        : `${initialValue.data.firstName} ${initialValue.data.lastName}`;
    });
    const [readOnly, setReadOnly] = useState<boolean>(true);

    function onDoubleClick(e: any) {
      e.preventDefault();
      setReadOnly(false);
    }

    function onBlur() {
      console.log('calling onBlur');
      setReadOnly(true);
    }

    const inputStyle = isSelected ? classes.selected : classes.cell;

    function Display() {
      return readOnly ? (
        <div onClick={onCellClick} onDoubleClick={onDoubleClick} className={inputStyle}>
          {value}
        </div>
      ) : (
        <Input
          onClick={onCellClick}
          className={classes.editable}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onDoubleClick={onDoubleClick}
          onBlur={onBlur}
          autoFocus
        />
      );
    }

    return initialValue ? <Display /> : <></>;
  },
  arePropsEqual,
);

function arePropsEqual(prevProps: DataCellProps, nextProps: DataCellProps) {
  return (
    prevProps.value === nextProps.value && prevProps.isSelected === nextProps.isSelected
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      color: typographyTheme.common.color,
      textAlign: 'center',
      '&:focus': {
        outline: 'none',
      },
    },
    selected: {
      color: typographyTheme.common.color,
      textAlign: 'center',
      border: '16px solid rgb(93, 93, 177)',
      borderWidth: 1,
      '&:focus': {
        outline: 'none',
      },
      'user-select': 'none',
    },
    editable: {
      color: typographyTheme.common.color,
      textAlign: 'center',
      border: '16px solid rgb(93, 93, 177)',
      borderWidth: 1,
      'user-select': 'none',
      padding: '0px 0px 1px',
      height: 20,
      width: 100,
    },
  }),
);
