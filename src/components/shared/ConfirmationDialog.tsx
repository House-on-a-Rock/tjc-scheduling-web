import React from 'react';

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

export interface SimpleDialogProps {
    title: string;
    isOpen: boolean;
    handleClose: (value: boolean) => void;
}

export function ConfirmationDialog({ handleClose, isOpen, title }: SimpleDialogProps) {
  
    return (
      <Dialog onClose={() => handleClose(!open)} open={isOpen}>
        <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
        <List>
          <ListItem button onClick={() => handleClose(true)} key="yes-button">
            <ListItemIcon style={{color: green[500] }}>
              <CheckIcon/>
            </ListItemIcon>
            <ListItemText primary="YES"/>
          </ListItem>
          <ListItem button onClick={() => handleClose(false)} key="no-button">
            <ListItemIcon style={{color: '#ba000d' }}>
              <ClearIcon/>
            </ListItemIcon>
            <ListItemText primary="NO"/>
          </ListItem>
        </List>
      </Dialog>
    )
  }