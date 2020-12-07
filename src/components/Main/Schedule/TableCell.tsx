import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { DataCellProps } from '../../../shared/types';
import { typographyTheme } from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
      setReadOnly(true);
      // callback to mark cell as changed
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

    return <Display />;
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
      padding: '1px 0px 2px 0px',
      height: 20,
      width: 100,
      fontSize: 14,
    },
  }),
);
