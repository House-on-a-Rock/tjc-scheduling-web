import React, { useState } from 'react';

// react query and data manipulation
import { getScheduleData } from '../../../query/schedules';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { addService } from '../../../store/apis/schedules';
// components
// import { Scheduler } from './Scheduler';
import { NewServiceForm } from './NewServiceForm';
import { useAlertProps } from '../../../shared/types/models';
// material ui and styling
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Dialog } from '@material-ui/core/';
import { showLoadingSpinner } from '../../../shared/styles/loading-spinner';
import { buttonTheme } from '../../../shared/styles/theme.js';

//
import { extractRoleIds } from '../../../shared/utilities';
import { Table } from './Table';

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

    // queries
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

    // state
    const [isAddServiceVisible, setIsAddServiceVisible] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<string>('');

    showLoadingSpinner(isLoading);

    //from scheduler.tsx but unused
    const accessLevel = extractRoleIds(localStorage.getItem('access_token')); // must log out/in
    const role = { id: 1 };

    console.log('data', data);

    return (
      <div
        className={classes.scheduleContainer}
        style={{ display: isViewed ? 'block' : 'none' }}
      >
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
        {
          data && (
            <div>
              <Table
                data={data}
                access="write"
                selectedCell={selectedCell}
                onCellClick={setSelectedCell}
              />
            </div>
          )
          // ))
        }
        <div className={classes.bottomButtonContainer}>
          <button onClick={onAddServiceClick} className={classes.addNewServiceButton}>
            <AddIcon height={50} width={50} />
            <span>Add New Service</span>
          </button>
        </div>
      </div>
    );

    function closeDialogHandler(response: any) {
      setIsAddServiceVisible(false);
      if (response.data) setAlert({ message: response.data, status: 'success' });
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
    bottomButtonContainer: {
      position: 'sticky',
      left: 0,
      display: 'flex',
      width: '100vw',
      justifyContent: 'center',
      paddingBottom: '2rem',
    },
    addNewServiceButton: {
      position: 'sticky',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      '&:hover, &:focus': {
        ...buttonTheme.filled,
      },
      display: 'flex',
      '& *': {
        margin: 'auto',
      },
    },
  }),
);
