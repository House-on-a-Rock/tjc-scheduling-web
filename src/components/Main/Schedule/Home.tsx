import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SCHEDULE } from './database';
import { isInTime, createColumns, contrivedDate } from './services';
import {
  Divider,
  EventData,
  TaskData,
  DutyData,
  WeeklyEventData,
  MappedScheduleInterface,
  WeeklyAssignmentInterface,
} from '../../../shared/types';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';

// function that figures out all the weekends

export const Home = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const { daterange, weeklyEvents } = SCHEDULE[value];

  let allSchedulesForTheWeek: MappedScheduleInterface[] = [];
  SCHEDULE[value].weeklyEvents.map((schedule: WeeklyEventData, index: number) => {
    const { day, events, dividers } = weeklyEvents[index];
    const columns = createColumns(daterange, day);
    let fullDaySchedule: MappedScheduleInterface[] = [];

    dividers.map((divider: Divider) => {
      let data: WeeklyAssignmentInterface[] = [];
      let { name, timerange } = divider;

      events.map((event: EventData) => {
        let { duties, time } = event;
        let everyWeeksAssignment: WeeklyAssignmentInterface[] = [];
        if (isInTime(time, timerange.start, timerange.end))
          duties.map((duty: DutyData, index: number) => {
            const { title, tasks } = duty;
            let assignments: WeeklyAssignmentInterface = { duty: title };
            if (index === 0) assignments.time = time;

            tasks.map((task: TaskData) => {
              const { date, assignee } = task;
              const assignedDate = contrivedDate(date);
              assignments[assignedDate] = assignee;
            });

            everyWeeksAssignment.push(assignments);
          });
        data = [...data, ...everyWeeksAssignment];
      });

      fullDaySchedule.push({ day, columns, data, name });
    });

    allSchedulesForTheWeek = [...allSchedulesForTheWeek, ...fullDaySchedule];
  });

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {SCHEDULE.map((schedule: any) => {
          return <Tab label={schedule.title} />;
        })}
        <Tab label="+" />
      </Tabs>
      <Container component="main" style={{ maxWidth: '100%' }}>
        {allSchedulesForTheWeek.map(
          ({ columns, data, day, name }: MappedScheduleInterface) => {
            return (
              <MaterialTable
                columns={columns}
                data={data}
                title={`${day} ${name}`}
                options={{
                  paging: false,
                  search: false,
                  sorting: false,
                  draggable: false,
                  fixedColumns: {
                    left: 2,
                    right: 0,
                  },
                }}
              />
            );
          },
        )}
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
