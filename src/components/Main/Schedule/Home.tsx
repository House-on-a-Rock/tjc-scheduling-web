import React, { useState, useEffect } from 'react';
import { makeData } from './services';

import { Schedule } from './Schedule';
import { ScheduleTabs } from './ScheduleTabs';

export const Home = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(makeData(0));

  function handleChange(e: React.ChangeEvent, value: any) {
    setTabIdx(value);
    setSchedules(makeData(value));
  }

  return (
    <>
      <ScheduleTabs tabIdx={tabIdx} handleChange={handleChange} />
      {schedules.map((schedule, idx) => (
        <Schedule schedule={schedule} key={idx} />
      ))}
    </>
  );
};
