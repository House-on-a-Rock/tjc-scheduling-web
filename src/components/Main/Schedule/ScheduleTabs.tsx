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
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      ...tabGroupTheme,
    },
    tab: {
      ...tabTheme,
    },
  }),
);
