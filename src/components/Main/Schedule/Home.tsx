import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MaterialTable from 'material-table';

import { useDispatch } from 'react-redux';
// import { logout } from '../../../store/actions';

import { SCHEDULE, Divider, EventData, TasksData } from './database';
import { Container } from '@material-ui/core';
import { ColumnFields } from '../../../shared/types';
import {
  columnizedDates,
  everyBeepDayBetweenTwoDates,
  isInTime,
  createColumns,
} from './services';

// function that figures out all the weekends

export const Home = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // push all services on each day to allTables
  const contrivedDate = (date: string) => {
    const jsDate = new Date(date);
    const month = jsDate.getMonth();
    const day = jsDate.getDate();
    return `${month + 1}/${day}`;
  };

  /**
    [
      {
        day: day,
        title: title,
        columns: [
          { title: 'Time', field: 'time' },
          { title: 'Duties', field: 'duties' },
          ...columnizedFields,
        ],
        data: data,
      },
      {
        day: day,
        title: title,
        columns: [
          { title: 'Time', field: 'time' },
          { title: 'Duties', field: 'duties' },
          ...columnizedFields,
        ],
        data: data,
      }
    ]
   */
  // function createColumns(daterange: any, day: any) {
  //   return [
  //     { title: 'Time', field: 'time' },
  //     { title: 'Duty', field: 'duty' },
  //     ...columnizedDates(everyBeepDayBetweenTwoDates(daterange[0], daterange[1], day)),
  //   ];
  // }

  const { daterange, weeklyEvents } = SCHEDULE[value];

  let assembledSchedule: any = [];

  SCHEDULE[value].weeklyEvents.map((schedule: any, index: number) => {
    const { day, events, dividers } = weeklyEvents[index];
    const columns = createColumns(daterange, day);
    let combinedSchedules: any = [];
    if (dividers) {
      dividers.map((divider: Divider) => {
        let data: any = [];
        let { name, timerange } = divider;

        events.map((event: EventData) => {
          let { duties, time } = event;
          let returnArr: any = [];
          if (isInTime(time, timerange.start, timerange.end))
            duties.map((duty: any, index: number) => {
              const { title, tasks } = duty;
              let assignments: any = {};
              tasks.map((task: TasksData) => {
                const { date, assignee } = task;
                const assignedDate = contrivedDate(date);
                assignments[assignedDate] = assignee;
              });

              if (index === 0) assignments.time = time;
              assignments.duty = title;
              returnArr.push(assignments);
            });
          data = [...data, ...returnArr];
        });

        combinedSchedules.push({ day, columns, data, name });
      });
    } else {
      let data: any = [];

      events.map((event: any) => {
        let { duties, time } = event;
        let returnArr: any = [];
        duties.map((duty: any, index: number) => {
          const { title, tasks } = duty;
          let returnObject: any = {};
          tasks.map((task: any) => {
            const { date, assignee } = task;
            let key = contrivedDate(date);
            returnObject[key] = assignee;
          });

          if (index === 0) returnObject.time = time;
          returnObject.duties = title;
          returnArr.push(returnObject);
        });
        data = [...data, ...returnArr];
      });

      combinedSchedules.push({ day, columns, data });
    }
    assembledSchedule = [...assembledSchedule, ...combinedSchedules];

    // return combinedSchedules;
  });
  console.log(assembledSchedule);
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
        {assembledSchedule.map(({ columns, data, day, name }: any) => {
          return (
            <MaterialTable
              columns={columns}
              options={{
                paging: false,
                fixedColumns: {
                  left: 2,
                  right: 0,
                },
                search: false,
                sorting: false,
                draggable: false,
              }}
              data={data}
              title={`${day} ${name}`}
            />
          );
        })}
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
