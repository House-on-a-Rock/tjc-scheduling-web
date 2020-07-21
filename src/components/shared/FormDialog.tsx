import React, { useState } from 'react';

// material ui
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface AddUserProps {
    title: string;
    isOpen: boolean;
    handleClose: (value: boolean, firstname: string, lastname: string, email: string, church: string) => void;
}

export function FormDialog({ handleClose, isOpen, title }: AddUserProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [church, setChurch] = useState<string>(''); // not needed

  // validations needed
  // valid email provided
  // add to corresponding church

  return (
    <Dialog onClose={() => handleClose(!isOpen, firstName, lastName, email, church)} open={isOpen}>
      <DialogTitle id='confirm-dialog'>{title} </DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField onChange={(event) => setFirstName(event.target.value)} id="firstname" label="firstname" /><br/>
        <TextField onChange={(event) => setLastName(event.target.value)} id="lastname" label="lastname" /><br/>
        <TextField onChange={(event) => setEmail(event.target.value)} id="email" label="email" /><br/>
        <TextField onChange={(event) => setChurch(event.target.value)} id="church" label="church" /><br/>
      </form>
      <List>
        <ListItem button onClick={() => handleClose(true, firstName, lastName, email, church)} key="yes-button">
          <ListItemIcon style={{color: green[500] }}>
            <CheckIcon/>
          </ListItemIcon>
          <ListItemText primary="CONFIRM"/>
        </ListItem>
        <ListItem button onClick={() => handleClose(false, firstName, lastName, email, church)} key="no-button">
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