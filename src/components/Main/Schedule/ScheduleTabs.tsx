import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';

import { ScheduleTabsProps } from '../../../shared/types';

import {
  tabGroupTheme,
  tabTheme,
  tabIndicatorTheme,
} from '../../../shared/styles/theme.js';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const ScheduleTabs = ({ tabIdx, onTabClick, titles }: ScheduleTabsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs
        value={tabIdx}
        onChange={onTabClick}
        textColor="primary"
        centered
        className={classes.tabs}
        TabIndicatorProps={{
          style: {
            ...tabIndicatorTheme,
          },
        }}
      >
        {titles.map((title, index) => (
          <Tab key={`${title}-${index}`} label={title} className={classes.tab} />
        ))}
        <Tab label={<AddIcon />} className={classes.tab} />
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
      zIndex: 100,
    },
    tab: {
      ...tabTheme,
    },
  }),
);
