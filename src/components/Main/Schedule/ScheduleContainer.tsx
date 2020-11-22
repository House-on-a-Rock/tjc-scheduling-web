import React, { useState } from 'react';

// react query and data manipulation
import { getScheduleData } from '../../../query/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { addService } from '../../../store/apis/schedules';
// components
import { Scheduler } from './Scheduler';
import { NewServiceForm } from './NewServiceForm';
import { useAlertProps } from '../../../shared/types/models';
// material ui and styling
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Dialog } from '@material-ui/core/';
import { showLoadingSpinner } from '../../../shared/styles/loading-spinner';

interface ScheduleContainerProps {
  scheduleId: number;
  isViewed: boolean;
  setAlert: (arg: useAlertProps) => void;
}

// makes api calls, distributes data to scheduler
export const ScheduleContainer = React.memo(
  ({ scheduleId, isViewed, setAlert }: ScheduleContainerProps) => {
    const classes = useStyles();
    const cache = useQueryCache();

    const { isLoading, error, data } = useQuery(
      ['scheduleData', scheduleId],
      getScheduleData,
      {
        refetchOnWindowFocus: false,
        staleTime: 100000000000000,
      },
    );
    const [mutateAddService, { error: mutateScheduleError }] = useMutation(addService, {
      onSuccess: (data) => {
        cache.invalidateQueries('scheduleData');
        closeDialogHandler(data);
      },
    });
    const [isAddServiceVisible, setIsAddServiceVisible] = useState<boolean>(false);

    showLoadingSpinner(isLoading);
    return (
      <div
        className={classes.scheduleContainer}
        style={{ display: isViewed ? 'block' : 'none' }}
      >
        <button onClick={onAddServiceClick}>
          <AddIcon height={50} width={50} /> Add New Service
        </button>

        {data && (
          <Dialog open={isAddServiceVisible} onClose={closeDialogHandler}>
            <NewServiceForm
              error={mutateScheduleError}
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

    function closeDialogHandler(response: any) {
      setIsAddServiceVisible(false);
      if (response.data) setAlert({ message: response.data, status: 'success' }); // response.statusText = "OK", response.status == 200
    }

    function onAddServiceClick() {
      setIsAddServiceVisible(true);
    }

    async function onNewServiceSubmit(name: string, order: number, dayOfWeek: number) {
      await mutateAddService({
        name,
        order: order,
        dayOfWeek,
        scheduleId: scheduleId,
      });
    }
  },
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scheduleContainer: {
      position: 'absolute',
      paddingTop: 10,
    },
  }),
);
