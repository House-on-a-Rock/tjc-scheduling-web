import React, { useState, useEffect } from 'react';
import { SCHEDULE } from './database';
import { memoizeData, makeData } from './services';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

export const ScheduleTabs = ({ tabIdx, handleChange }: any) => {
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
