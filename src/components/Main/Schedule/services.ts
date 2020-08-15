// export function
import { DayIndexOptions } from '../../../shared/types';

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

export function everyBeepDayBetweenTwoDates(
  startDate: string,
  endDate: string,
  day: string,
) {
  let everyBeepDay = [];
  let start = new Date(startDate);

  if (start.getDay() !== dayIndex[day])
    start = determineStartDate(startDate, dayIndex[day]);

  let current = new Date(start);
  let end = new Date(endDate);

  while (current <= end) {
    everyBeepDay.push(readableDate(current));
    current = new Date(current.setDate(current.getDate() + 7));
  }
  return everyBeepDay;
}

export function columnizedDates(everyBeepDay: string[]) {
  return everyBeepDay.map((date: string) => {
    const jsDate = new Date(date);
    const month = jsDate.getMonth();
    const day = jsDate.getDate();
    return {
      title: `${month + 1}/${day}`,
      field: `${month + 1}/${day}`,
      cellStyle: { borderStyle: 'solid solid none none', borderWidth: '1px' },
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
  const timeSplit = time.split(' ');
  let [hour, min, period] = [...timeSplit[0].split(':'), timeSplit[1]];
  let convertedHour = hour === '12' ? 3600000 : 3600000 * parseInt(hour);
  let convertedMin = 60000 * parseInt(min);
  let convertedPeriod = period === 'AM' ? 0 : 43200000;

  return convertedHour + convertedMin + convertedPeriod;
}

export function createColumns(daterange: any, day: any) {
  return [
    {
      title: 'Time',
      field: 'time',
      cellStyle: { borderStyle: 'solid none solid solid', borderWidth: '1px' },
    },
    {
      title: 'Duty',
      field: 'duty',
      cellStyle: { borderStyle: 'solid none solid none', borderWidth: '1px' },
    },
    ...columnizedDates(everyBeepDayBetweenTwoDates(daterange[0], daterange[1], day)),
  ];
}

export const contrivedDate = (date: string) => {
  const jsDate = new Date(date);
  const month = jsDate.getMonth();
  const day = jsDate.getDate();
  return `${month + 1}/${day}`;
};
