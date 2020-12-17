import React, { useState, useEffect } from 'react';

// mat ui
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DataCellProps } from '../../../shared/types';
import { typographyTheme } from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const DataCell = React.memo(
  ({ data, onCellClick, isSelected, service, row, column, members }: DataCellProps) => {
    const classes = useStyles();

    const [value, setValue] = useState(data);
    const [inputValue, setInputValue] = useState(
      // `${data.user.firstName} ${data.user.lastName}`,
      null,
    );
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

    // console.log('inputValue', inputValue);

    return readOnly ? (
      <TableCell
        onClick={() => onCellClick(`${service.name}_${column}_${row}`)}
        onDoubleClick={onDoubleClick}
        className={inputStyle}
      >
        {data.display}
      </TableCell>
    ) : (
      <TableCell
        onClick={() => onCellClick(`${service.name}_${column}_${row}`)}
        onDoubleClick={onDoubleClick}
      >
        <Autocomplete
          id="combo-box"
          options={members}
          className={classes.editable}
          renderInput={(params) => {
            return <TextField {...params} value={value} />;
          }}
          // renderOption={(option) => {
          //   // console.log('option', option);
          //   return `${option.firstName} ${option.lastName}`;
          // }}
          getOptionLabel={(option: any) => `${option.firstName} ${option.lastName}`}
          onBlur={onBlur}
          getOptionSelected={(option, value) => {
            return option.userId === value.userId;
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          selectOnFocus
          disableClearable
          fullWidth
          clearOnBlur
          autoHighlight
          openOnFocus
        />
      </TableCell>
    );
  },
  arePropsEqual,
);

function arePropsEqual(prevProps: DataCellProps, nextProps: DataCellProps) {
  return (
    // prevProps.value === nextProps.value && prevProps.isSelected === nextProps.isSelected
    prevProps.isSelected === nextProps.isSelected
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
