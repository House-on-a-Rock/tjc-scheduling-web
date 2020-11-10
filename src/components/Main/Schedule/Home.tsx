import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';
import { NewScheduleForm } from './NewScheduleForm';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { getScheduleData } from '../../../query/schedules';

import { Dialog } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { buttonTheme } from '../../../shared/styles/theme.js';
import { useSpinner } from '../../../shared/styles/loading-spinner';

export const Home = () => {
  const classes = useStyles();
  useSpinner();

  const dispatch = useDispatch();

  // React-query
  const { churchId, name: churchName } = useSelector((state) => state.profile);
  const { isLoading, error, data = [] } = useQuery(
    ['schedulesData', churchId],
    getScheduleData,
    {
      enabled: churchId,
      refetchOnWindowFocus: false,
      staleTime: 100000000000000, //1157407.4 days fyi l o l
    },
  );

  if (status === 'loading') return <div>loading...</div>; // loading state

  // Component state
  const [tabIdx, setTabIdx] = useState(0);
  const [schedules, setSchedules] = useState(data[tabIdx]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(data[tabIdx]?.services);
  }

  useEffect(() => {
    setSchedules(data[tabIdx]?.services);
  }, [data, tabIdx]);

  function onNewScheduleHandler() {
    console.log('new schedule clicked');
    setIsDialogVisible(true);
  }

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
      <Dialog open={isDialogVisible} onClose={() => setIsDialogVisible(false)}>
        <NewScheduleForm />
      </Dialog>
      <ScheduleTabs
        tabIdx={tabIdx}
        handleChange={handleChange}
        titles={data.map((schedule: any) => schedule.title)}
        onNewSchedule={onNewScheduleHandler}
      />
      <div className={classes.schedulesContainer}>
        {schedules?.map((schedule: any, idx: any) => (
          <Scheduler schedule={schedule} key={idx} />
        ))}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoutButton: {
      position: 'fixed',
      zIndex: 9002,
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      '&:hover, &:focus': {
        ...buttonTheme.filled,
      },
    },
    schedulesContainer: {
      position: 'absolute',
    },
  }),
);
