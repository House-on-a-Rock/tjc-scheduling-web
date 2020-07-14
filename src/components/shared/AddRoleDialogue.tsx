import React, { useState } from 'react';

// material ui
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red, amber } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

// other data
import {roles} from '../Main/membersDatabase';

export interface AddRolesProps {
    title: string;
    open: boolean;
    selectedValue: boolean;
    onClose: (value: boolean, role: string) => void;
}

export function AddRoleDialog(props: AddRolesProps) {
  const classes = useStyles();
  const [role, setRole] = React.useState<string>(roles[0]);

  let { onClose, selectedValue, open, title } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  }

  const handleClose = () => {
    onClose(selectedValue, role);
  };

  const handleOptionClick = (value: boolean) => {
    onClose(value, role);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="roles"
          select
          label="roles"
          value={role}
          onChange={handleChange}
          helperText="Please select a role"
        >
          {roles.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <List>
        <ListItem button onClick={() => handleOptionClick(true)} key="yes-button">
          <ListItemIcon style={{color: green[500] }}>
            <CheckIcon/>
          </ListItemIcon>
          <ListItemText primary="CONFIRM"/>
        </ListItem>
        <ListItem button onClick={() => handleOptionClick(false)} key="no-button">
          <ListItemIcon style={{color: '#ba000d' }}>
            <ClearIcon/>
          </ListItemIcon>
          <ListItemText primary="CANCEL"/>
        </ListItem>
      </List>
    </Dialog>
  )
}

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);