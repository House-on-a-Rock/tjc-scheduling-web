import React, { useState } from 'react';
import { makeData } from './services';
import { useDispatch } from 'react-redux';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';

export const Home = () => {
  const dispatch = useDispatch();
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(makeData(0));

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(makeData(value));
  }

  return (
    <>
      <button
        onClick={() => {
          // remove from local storage
          dispatch(logout());
        }}
      >
        Log Out
      </button>
      <ScheduleTabs tabIdx={tabIdx} handleChange={handleChange} />
      {schedules.map((schedule, idx) => (
        <Scheduler schedule={schedule} key={idx} />
      ))}
    </>
  );
};
