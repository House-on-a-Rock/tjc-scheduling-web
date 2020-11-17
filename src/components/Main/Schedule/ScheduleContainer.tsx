import React, { useState } from 'react';

//react query and data manipulation
import { getScheduleData } from '../../../query/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { addService } from '../../../store/apis/schedules';
//components
import { Scheduler } from './Scheduler';
import { NewServiceForm } from './NewServiceForm';
//material ui and styling
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Dialog } from '@material-ui/core/';
import { showLoadingSpinner } from '../../../shared/styles/loading-spinner';

interface ScheduleContainerProps {
  scheduleId: number;
}

//makes api calls, distributes data to scheduler
export const ScheduleContainer = React.memo(({ scheduleId }: ScheduleContainerProps) => {
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

  showLoadingSpinner(isLoading);
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
          <Scheduler role={1} service={service} key={idx} />
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
    setIsAddServiceVisible(false);
    const response = await mutateAddService({
      name,
      order: order,
      dayOfWeek,
      scheduleId: scheduleId,
    });
    //need an error/alert reporting system
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    schedulesContainer: {
      position: 'absolute',
      paddingTop: 10,
    },
  }),
);
