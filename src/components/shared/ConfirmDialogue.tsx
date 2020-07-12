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
import { fade, makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface SimpleDialogProps {
    title: string;
    open: boolean;
    selectedValue: boolean;
    onClose: (value: boolean) => void;
}

export function ConfirmDialog(props: SimpleDialogProps) {
    let { onClose, selectedValue, open, title } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleOptionClick = (value: boolean) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
        <List>
          <ListItem button onClick={() => handleOptionClick(true)} key="yes-button">
            <ListItemIcon style={{color: green[500] }}>
              <CheckIcon/>
            </ListItemIcon>
            <ListItemText primary="YES"/>
          </ListItem>
          <ListItem button onClick={() => handleOptionClick(false)} key="no-button">
            <ListItemIcon style={{color: '#ba000d' }}>
              <ClearIcon/>
            </ListItemIcon>
            <ListItemText primary="NO"/>
          </ListItem>
        </List>
      </Dialog>
    )
  }