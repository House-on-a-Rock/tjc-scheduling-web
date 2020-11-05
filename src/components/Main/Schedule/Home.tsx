import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { getScheduleData } from '../../../query/schedules';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // React-query
  const { churchId, name: churchName } = useSelector((state) => state.profile);
  const { isLoading, error, data = [] } = useQuery(
    ['schedulesData', churchId],
    getScheduleData,
    {
      enabled: churchId,
      refetchOnWindowFocus: false,
      staleTime: 100000000000000,
    },
  );

  if (status === 'loading') return <div>loading...</div>; // loading state

  // Component state
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(data[tabIdx]);

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(data[tabIdx]?.services);
  }

  useEffect(() => {
    setSchedules(data[tabIdx]?.services);
  }, [data, tabIdx]);

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem('access_token');
          dispatch(logout());
        }}
        className={classes.logoutButton}
      >
        Log Out
      </button>
      <ScheduleTabs
        tabIdx={tabIdx}
        handleChange={handleChange}
        titles={data.map((schedule: any) => schedule.title)}
      />
      {schedules?.map((schedule: any, idx: any) => (
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
