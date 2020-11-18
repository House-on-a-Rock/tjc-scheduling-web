import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//react query
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { getTabData } from '../../../query/schedules';
import { addSchedule } from '../../../store/apis/schedules';

import { ScheduleTabs } from './ScheduleTabs';
import { NewScheduleForm } from './NewScheduleForm';
import { ScheduleContainer } from './ScheduleContainer';
import { Alert } from '../../shared/Alert';
import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';

import { Dialog } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { buttonTheme } from '../../../shared/styles/theme.js';

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cache = useQueryCache();
  const { churchId, name: churchName } = useSelector((state) => state.profile);
  const { isLoading, error, data } = useQuery(['scheduleTabs', churchId], getTabData, {
    enabled: churchId,
    refetchOnWindowFocus: false,
    staleTime: 100000000000000,
  });
  // const [
  //   mutateAddSchedule,
  //   { status: addScheduleStatus, error: addScheduleError },
  // ] = useMutation(addSchedule, {
  //   onSuccess: () => cache.invalidateQueries('scheduleTabs'),
  // });
  const [tabIdx, setTabIdx] = useState(0);
  const [isNewScheduleVisible, setIsNewScheduleVisible] = useState<boolean>(false);
  const [openedTabs, setOpenedTabs] = useState<number[]>([0]);
  const [role, setRole] = useState({});

  const [alert, setAlert] = useState<{ message: string; status: string }>();

  function onTabClick(e: React.ChangeEvent, value: number) {
    //if not the last tab, open that tab
    if (value <= data.length - 1) {
      setTabIdx(value);
      const isOpened = openedTabs.indexOf(value);
      if (isOpened < 0) setOpenedTabs([...openedTabs, value]);
    } else setIsNewScheduleVisible(true); //if last tab, open dialog to make new schedule
  }

  function closeDialogHandler() {
    setIsNewScheduleVisible(false);
  }

  // not too sure how setRole is being used/passed through
  React.useEffect(() => {
    // setDisplayedSchedule(data[tabIdx]?.services);
    // setRole(data[tabIdx]?.role);
  }, [data, tabIdx]);

  // async function onNewScheduleSubmit(
  //   scheduleTitle: string,
  //   startDate: string,
  //   endDate: string,
  //   view: string,
  //   team: number,
  // ) {
  //   const response = await mutateAddSchedule({
  //     scheduleTitle,
  //     startDate,
  //     endDate,
  //     view,
  //     team,
  //     churchId,
  //   });

  //   console.log('response', response);
  //   console.log('addScheduleError', addScheduleError);
  //   setIsNewScheduleVisible(false);
  //   setAlert({ message: response.data, status: 'success' }); //response.statusText = "OK", response.status == 200
  // }

  // console.log('addScheduleError outer', addScheduleError);

  const unMountAlert = () => {
    setAlert(null);
  };

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
      <Dialog open={isNewScheduleVisible} onClose={closeDialogHandler}>
        <NewScheduleForm
          // onSubmit={onNewScheduleSubmit}
          onClose={closeDialogHandler}
          // error={addScheduleError}
        />
      </Dialog>
      {alert && <Alert alert={alert} unMountMe={unMountAlert} />}
      {data && (
        <div>
          <ScheduleTabs
            tabIdx={tabIdx}
            onTabClick={onTabClick}
            titles={data.map((schedule: any) => schedule.title)}
          />
          {openedTabs.map((tab) => (
            <ScheduleContainer
              scheduleId={data[tab].id}
              isViewed={tab === tabIdx}
              key={tab.toString()}
            />
          ))}
        </div>
      )}
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
      paddingTop: 10,
    },
  }),
);
