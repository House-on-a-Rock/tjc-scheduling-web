import React, { useState } from 'react';
import { makeData } from './services';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

export const Home = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(makeData(0));

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(makeData(value));
  }

  return (
    <>
      <ScheduleTabs tabIdx={tabIdx} handleChange={handleChange} />
      {schedules.map((schedule, idx) => (
        <Scheduler schedule={schedule} key={idx} />
      ))}
    </>
  );
};
