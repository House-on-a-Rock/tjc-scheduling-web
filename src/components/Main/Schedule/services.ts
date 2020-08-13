// export function
import { DayIndexOptions } from '../../../shared/types';
import { v1String } from 'uuid/interfaces';

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

// type DayIndexOptions

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
  console.log(start);
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
    return { title: `${month + 1}/${day}`, field: `${idxToMonth[month]}${day}` };
  });
}
