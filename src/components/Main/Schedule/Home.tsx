import React, { useState } from 'react';
import { makeData } from './services';
import { useDispatch } from 'react-redux';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const Home = () => {
  const classes = useStyles();

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
        className={classes.logoutButton}
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoutButton: {
      position: 'fixed',
      zIndex: 9002,
    },
  }),
);
