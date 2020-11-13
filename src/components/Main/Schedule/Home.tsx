import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryCache } from 'react-query';

import { ScheduleTabs } from './ScheduleTabs';
import { NewScheduleForm } from './NewScheduleForm';

import { ScheduleContainer } from './ScheduleContainer';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { getTabData } from '../../../query/schedules';

import { addSchedule } from '../../../store/apis/schedules';

import { Dialog } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { buttonTheme } from '../../../shared/styles/theme.js';
import { showLoadingSpinner } from '../../../shared/styles/loading-spinner';

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cache = useQueryCache();
  const { churchId, name: churchName } = useSelector((state) => state.profile);
  const { isLoading, error, data }: any = useQuery(
    ['scheduleTabs', churchId],
    getTabData,
    {
      enabled: churchId,
      refetchOnWindowFocus: false,
      staleTime: 100000000000000, //1157407.4 days fyi lol
    },
  );
  const [mutateAddSchedule] = useMutation(addSchedule, {
    onSuccess: () => cache.invalidateQueries('scheduleTabs'), //causes the schedulesData query to call and update on success
  });
  const [tabIdx, setTabIdx] = useState(0);
  const [isAddScheduleVisible, setIsAddScheduleVisible] = useState<boolean>(false);

  // showLoadingSpinner(isLoading);
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
      <Dialog open={isAddScheduleVisible} onClose={closeDialogHandler}>
        <NewScheduleForm onSubmit={onNewScheduleSubmit} onClose={closeDialogHandler} />
      </Dialog>
      {data && (
        <div>
          <ScheduleTabs
            tabIdx={tabIdx}
            onTabClick={onTabClick}
            titles={data.map((schedule: any) => schedule.title)}
          />
          <ScheduleContainer scheduleId={data[tabIdx].id} />
        </div>
      )}
    </>
  );

  function onTabClick(e: React.ChangeEvent, value: number) {
    if (value <= data.length - 1) {
      //if not the last tab, display that tab
      setTabIdx(value);
    } else setIsAddScheduleVisible(true); //if last tab, open dialog to make new schedule
  }

  function closeDialogHandler() {
    setIsAddScheduleVisible(false);
  }

  async function onNewScheduleSubmit(
    scheduleTitle: string,
    startDate: string,
    endDate: string,
    view: string,
    team: number,
  ) {
    setIsAddScheduleVisible(false);
    const response = await mutateAddSchedule({
      scheduleTitle,
      startDate,
      endDate,
      view,
      team,
      churchId,
    });
    //display error messages if needed
  }
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
      paddingTop: 10,
    },
  }),
);
