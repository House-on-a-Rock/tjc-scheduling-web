import React, { useState } from 'react';
import { makeData } from './services';
import { useDispatch } from 'react-redux';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';
import { MonthView } from '../Calendar/MonthView';

export const Home = () => {
  const dispatch = useDispatch();
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(makeData(0));
  const [viewType, setViewType] = useState(true);

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(makeData(value));
  }

  const tabs = (
    <>
      <ScheduleTabs tabIdx={tabIdx} handleChange={handleChange} />
      {schedules.map((schedule, idx) => (
        <Scheduler schedule={schedule} key={idx} />
      ))}
    </>
  );

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
      <button onClick={() => setViewType((d) => !d)}>Switch Views</button>
      {viewType ? tabs : <MonthView />}
    </>
  );
};
