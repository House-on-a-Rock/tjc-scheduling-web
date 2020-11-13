import React, { useState } from 'react';

//react query and data manipulation
import { useSelector } from '../../../shared/utilities';
import { getScheduleData } from '../../../query/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { addService } from '../../../store/apis/schedules';

import { Scheduler } from './Scheduler';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface ScheduleContainerProps {
  scheduleId: number;
}

//makes api calls, distributes data to scheduler
export const ScheduleContainer = ({ scheduleId }: ScheduleContainerProps) => {
  const classes = useStyles();
  const cache = useQueryCache();

  // const { isLoading, error, data = [] } = useQuery(
  //   ['schedulesData', scheduleId],
  //   getScheduleData,
  //   {
  //     refetchOnWindowFocus: false,
  //     staleTime: 100000000000000, //1157407.4 days fyi lol
  //   },
  // );
  // console.log('data received', data);
  const [mutateAddService] = useMutation(addService, {
    onSuccess: () => cache.invalidateQueries('schedulesData'),
  });
  const [isAddServiceVisible, setIsAddServiceVisible] = useState<boolean>(false);
  console.log('scheduleId', scheduleId);
  return (
    <div className={classes.schedulesContainer}>
      {/* <button onClick={onAddServiceClick}>
        <AddIcon height={50} width={50} /> Add New Service
      </button>
      {data.map((schedule: any, idx: any) => (
        <Scheduler schedule={schedule} key={idx} />
      ))} */}
      {scheduleId}
    </div>
  );

  function closeDialogHandler() {
    // setIsAddScheduleVisible(false);
    setIsAddServiceVisible(false);
  }

  function onAddServiceClick() {
    setIsAddServiceVisible(true);
  }

  async function onNewServiceSubmit(name: string, order: number, dayOfWeek: number) {
    setIsAddServiceVisible(false);
    const response = await mutateAddService({
      name,
      order,
      dayOfWeek,
      scheduleId: scheduleId + 1, //since these aren't 0 based, need to add 1
    });
    //need an error/alert reporting system
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    schedulesContainer: {
      position: 'absolute',
      paddingTop: 10,
    },
  }),
);
