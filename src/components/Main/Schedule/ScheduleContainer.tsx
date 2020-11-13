import React, { useState } from 'react';

//react query and data manipulation

import { getScheduleData } from '../../../query/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { addService } from '../../../store/apis/schedules';

import { Scheduler } from './Scheduler';
import AddIcon from '@material-ui/icons/Add';
import { Dialog } from '@material-ui/core/';
import { NewServiceForm } from './NewServiceForm';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface ScheduleContainerProps {
  scheduleId: number;
}

//makes api calls, distributes data to scheduler
export const ScheduleContainer = ({ scheduleId }: ScheduleContainerProps) => {
  const classes = useStyles();
  const cache = useQueryCache();

  const { isLoading, error, data } = useQuery(
    ['scheduleData', scheduleId],
    getScheduleData,
    {
      refetchOnWindowFocus: false,
      staleTime: 100000000000000, //1157407.4 days fyi lol
    },
  );
  const [mutateAddService] = useMutation(addService, {
    onSuccess: () => cache.invalidateQueries('scheduleData'),
  });
  const [isAddServiceVisible, setIsAddServiceVisible] = useState<boolean>(false);

  return (
    <div className={classes.schedulesContainer}>
      <button onClick={onAddServiceClick}>
        <AddIcon height={50} width={50} /> Add New Service
      </button>
      {data && (
        <Dialog open={isAddServiceVisible} onClose={closeDialogHandler}>
          <NewServiceForm
            order={data.services?.length || 0}
            onSubmit={onNewServiceSubmit}
            onClose={closeDialogHandler}
          />
        </Dialog>
      )}
      {data &&
        data.services.map((service: any, idx: any) => (
          <Scheduler service={service} key={idx} />
        ))}
    </div>
  );

  function closeDialogHandler() {
    setIsAddServiceVisible(false);
  }

  function onAddServiceClick() {
    setIsAddServiceVisible(true);
  }

  async function onNewServiceSubmit(name: string, order: number, dayOfWeek: number) {
    //this needs to be fixed
    setIsAddServiceVisible(false);
    const response = await mutateAddService({
      name,
      order: data.services?.length + 1 || 0,
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
