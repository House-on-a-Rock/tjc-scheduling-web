import React from 'react';
import { SCHEDULE } from './database';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { ScheduleTabsProps } from '../../../shared/types';

export const ScheduleTabs = ({ tabIdx, handleChange, titles }: ScheduleTabsProps) => {
  return (
    <Tabs
      value={tabIdx}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {titles.map((title, index) => (
        <Tab key={`${title}-${index}`} label={title} />
      ))}
      <Tab label="+" disabled />
    </Tabs>
  );
};
