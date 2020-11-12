import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { getScheduleData } from '../../../query/schedules';

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
      staleTime: 100000000000000,
    },
  );

  if (status === 'loading') return <div>loading...</div>; // loading state

  // Component state
  const [tabIdx, setTabIdx] = useState(0);
  const [services, setServices] = useState([]);
  const [role, setRole] = useState({});

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setServices(data[tabIdx]?.services);
  }

  useEffect(() => {
    setServices(data[tabIdx]?.services);
    setRole(data[tabIdx]?.role);
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
      <div className={classes.schedulesContainer}>
        {services?.map((schedule: any, idx: any) => {
          return <Scheduler schedule={schedule} key={idx} role={role} />;
        })}
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
