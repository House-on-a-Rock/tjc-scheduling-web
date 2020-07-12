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
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface AddUserProps {
    title: string;
    open: boolean;
    selectedValue: boolean;
    onClose: (value: boolean, firstname: string, lastname: string, email: string, church: string) => void;
}

export function AddUserDialog(props: AddUserProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [church, setChurch] = useState<string>('');

  let { onClose, selectedValue, open, title } = props;

  const handleClose = () => {
    onClose(selectedValue, firstName, lastName, email, church);
  };

  const handleOptionClick = (value: boolean) => {
    onClose(value, firstName, lastName, email, church);
  };
  
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleChurchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChurch(event.target.value);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id='confirm-dialog'>{title} </DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField onChange={handleFirstNameChange} id="firstname" label="firstname" /><br/>
        <TextField onChange={handleLastNameChange} id="lastname" label="lastname" /><br/>
        <TextField onChange={handleEmailChange} id="email" label="email" /><br/>
        <TextField onChange={handleChurchChange} id="church" label="church" /><br/>
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