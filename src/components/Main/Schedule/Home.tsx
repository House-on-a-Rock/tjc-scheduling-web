import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryCache } from 'react-query';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';
import { NewScheduleForm } from './NewScheduleForm';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { getScheduleData } from '../../../query/schedules';
import { addSchedule } from '../../../store/apis/schedules';

import { Dialog } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { buttonTheme } from '../../../shared/styles/theme.js';
import { useSpinner } from '../../../shared/styles/loading-spinner';

export const Home = () => {
  const classes = useStyles();
  // useSpinner();

  const dispatch = useDispatch();

  // React-query
  const cache = useQueryCache();
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
  const [mutateAddSchedule] = useMutation(addSchedule, {
    onSuccess: () => cache.invalidateQueries('schedulesData'), //causes the roleData query to call and update on success
  });

  // if (status === 'loading') return <div>loading...</div>; // loading state

  // Component state
  const [tabIdx, setTabIdx] = useState(0);
  const [displayedSchedule, setDisplayedSchedule] = useState(data[tabIdx]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function onTabClick(e: React.ChangeEvent, value: number) {
    if (value <= data.length - 1) {
      //if not the last tab, display that tab
      setTabIdx(value);
      setDisplayedSchedule(data[tabIdx]?.services);
    } else setIsDialogVisible(true); //if last tab, open dialog to make new schedule
  }

  useEffect(() => {
    setDisplayedSchedule(data[tabIdx]?.services);
  }, [data, tabIdx]);

  async function onNewScheduleSubmit(
    scheduleTitle: string,
    startDate: string,
    endDate: string,
    view: string,
    team: number,
  ) {
    //validations needed
    setIsDialogVisible(false);
    const response = await mutateAddSchedule({
      scheduleTitle,
      startDate,
      endDate,
      view,
      team,
      churchId,
    });
    console.log('response', response);
    //display error messages if needed
  }

  const closeDialogHandler = () => setIsDialogVisible(false);

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
      <Dialog open={isDialogVisible} onClose={closeDialogHandler}>
        <NewScheduleForm onSubmit={onNewScheduleSubmit} onClose={closeDialogHandler} />
      </Dialog>
      <ScheduleTabs
        tabIdx={tabIdx}
        onTabClick={onTabClick}
        titles={data.map((schedule: any) => schedule.title)}
      />
      <div className={classes.schedulesContainer}>
        {displayedSchedule?.map((schedule: any, idx: any) => (
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
