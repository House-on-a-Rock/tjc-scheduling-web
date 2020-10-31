import React from 'react';
import { SCHEDULE } from './database';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';

import { ScheduleTabsProps } from '../../../shared/types';

import { tabGroupTheme, tabTheme } from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const ScheduleTabs = ({ tabIdx, handleChange }: ScheduleTabsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={tabIdx}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}
      >
        {SCHEDULE.map((schedule: any, index: number) => (
          <Tab
            key={`${schedule.title}-${index}`}
            label={schedule.title}
            className={classes.tab}
          />
        ))}
        <Tab label={<AddIcon />} disabled className={classes.tab} />
      </Tabs>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '3.5rem',
    },
    tabs: {
      ...tabGroupTheme,
      position: 'fixed',
      width: '100%',
      left: 0,
      top: '4rem',
      paddingTop: '1rem',
      background: 'white',
      zIndex: 9001,
    },
    tab: {
      ...tabTheme,
    },
  }),
);
