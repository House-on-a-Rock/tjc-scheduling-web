import React from 'react';
import { SCHEDULE } from './database';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { ScheduleTabsProps } from '../../../shared/types';

export const ScheduleTabs = ({ tabIdx, handleChange }: ScheduleTabsProps) => {
  return (
    <Tabs
      value={tabIdx}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {SCHEDULE.map((schedule: any, index: number) => (
        <Tab key={`${schedule.title}-${index}`} label={schedule.title} />
      ))}
      <Tab label="+" disabled />
    </Tabs>
  );
};
