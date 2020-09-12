import {
  DayIndexOptions,
  MappedScheduleInterface,
  WeeklyEventData,
  Divider,
  WeeklyAssignmentInterface,
  EventData,
  DutyData,
  TaskData,
} from '../../../shared/types';
import { SCHEDULE } from './database';

const idxToMonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const dayIndex: DayIndexOptions = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const readableDate = (unreadableDate: Date) =>
  `${
    unreadableDate.getMonth() + 1
  }/${unreadableDate.getDate()}/${unreadableDate.getFullYear()}`;

const incrementDay = (date: Date) => new Date(date.setDate(date.getDate() + 1));

function determineStartDate(startDate: string, day: number) {
  let current = incrementDay(new Date(startDate));
  while (current.getDay() !== day) current = incrementDay(current);
  return current;
}

export function everyRepeatingDayBetweenTwoDates(
  startDate: string,
  endDate: string,
  day: string,
) {
  let everyRepeatingDay = [];
  let start = new Date(startDate);

  if (start.getDay() !== dayIndex[day])
    start = determineStartDate(startDate, dayIndex[day]);

  let current = new Date(start);
  let end = new Date(endDate);

  while (current <= end) {
    everyRepeatingDay.push(readableDate(current));
    current = new Date(current.setDate(current.getDate() + 7));
  }
  return everyRepeatingDay;
}

const zeroPaddingDates = (monthIdx: number, dayIdx: number): string => {
  let month = (monthIdx++).toString();
  let day = dayIdx.toString();

  month = month.length > 1 ? month : `0${month}`;
  day = day.length > 1 ? day : `0${day}`;

  return `${month}/${day}`;
};

export function columnizedDates(everyRepeatingDay: string[]) {
  return everyRepeatingDay.map((date: string) => {
    const jsDate = new Date(date);
    const monthIdx = jsDate.getMonth();
    const dayIdx = jsDate.getDate();
    return {
      Header: zeroPaddingDates(monthIdx, dayIdx),
      accessor: zeroPaddingDates(monthIdx, dayIdx),
    };
  });
}

export function isInTime(target: string, start: string, end: string): boolean {
  const targetTime = timeToMilliSeconds(target);
  const startTime = timeToMilliSeconds(start);
  const endTime = timeToMilliSeconds(end);
  return startTime <= targetTime && targetTime <= endTime;
}

export function timeToMilliSeconds(time: string) {
  const [hourMin, period] = time.split(' ');
  const [hour, min] = hourMin.split(':');
  let convertedHour = hour === '12' ? 3600000 : 3600000 * parseInt(hour);
  let convertedMin = 60000 * parseInt(min);
  let convertedPeriod = period === 'AM' ? 0 : 43200000;

  return convertedHour + convertedMin + convertedPeriod;
}

export function createColumns(daterange: any, day: any) {
  return [
    {
      Header: 'Time',
      accessor: 'time',
    },
    {
      Header: 'Duty',
      accessor: 'duty',
    },
    ...columnizedDates(everyRepeatingDayBetweenTwoDates(daterange[0], daterange[1], day)),
  ];
}

export const contrivedDate = (date: string) => {
  const jsDate = new Date(date);
  const monthIdx = jsDate.getMonth();
  const dayIdx = jsDate.getDate();
  return zeroPaddingDates(monthIdx, dayIdx);
};

export const makeData = (value: number): MappedScheduleInterface[] => {
  const { daterange, weeklyEvents } = SCHEDULE[value];
  let allSchedulesForTheWeek: MappedScheduleInterface[] = [];
  weeklyEvents.map((schedule: WeeklyEventData, index: number) => {
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
  return allSchedulesForTheWeek;
};

export const memoizeData = (data: any) => {
  const makeDataLevel = () => data;
  return makeDataLevel();
};
