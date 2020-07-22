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
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface AddUserProps {
    title: string;
    isOpen: boolean;
    handleClose: (value: boolean, firstname: string, lastname: string, email: string, password: string) => void;
}

export function FormDialog({ handleClose, isOpen, title }: AddUserProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // validations needed
  // valid email provided
  // add to corresponding church

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  return (
    <Dialog onClose={() => handleClose(!isOpen, firstName, lastName, email, password)} open={isOpen}>
      <DialogTitle id='confirm-dialog'>{title} </DialogTitle>
      <form className={classes.root} noValidate autoComplete="off">
        <InputLabel>firstname</InputLabel>
        <Input onChange={(event) => setFirstName(event.target.value)} id="firstname" /><br/>
        <InputLabel>lastname</InputLabel>
        <Input onChange={(event) => setLastName(event.target.value)} id="lastname" /><br/>
        <InputLabel>email</InputLabel>
        <Input onChange={(event) => setEmail(event.target.value)} id="email" /><br/>
        <InputLabel>password</InputLabel>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </form>
      <List>
        <ListItem button onClick={() => handleClose(true, firstName, lastName, email, password)} key="yes-button">
          <ListItemIcon style={{color: green[500] }}>
            <CheckIcon/>
          </ListItemIcon>
          <ListItemText primary="CONFIRM"/>
        </ListItem>
        <ListItem button onClick={() => handleClose(false, firstName, lastName, email, password)} key="no-button">
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