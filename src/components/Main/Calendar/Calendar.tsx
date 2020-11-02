import React from 'react';
import { DateTile } from './DateTile';
import { DayNameRow } from './DayNameRow';

interface CalendarProps {
  displayedMonth: Date;
  onTilePress?: (date: Date) => void;
  // selectedDates?;
  // initialTasks;
}

export const Calendar = ({
  displayedMonth,
  onTilePress,
}: // selectedDates = [],
// initialTasks,
CalendarProps) => {
  const month = displayedMonth.getMonth();
  const year = displayedMonth.getFullYear();
  const initialDate = new Date(year, month, 1);
  const dateArray = new Array(6);
  // const today = new Date();

  const getNextDate: () => Date = determineRenderDate(initialDate);

  for (let j = 0; j < dateArray.length; j++) {
    dateArray[j] = new Array(7);
    for (let k = 0; k < dateArray[j].length; k++) {
      const day: Date = getNextDate();
      // const isCurrentMonth = day.getMonth() === month;
      // const isSelected = selectedDates.some((date) => isSameDate(day, date));
      // const hasTask = initialTasks.some((item) => isSameDate(new Date(item.date), day));

      dateArray[j][k] = (
        <DateTile
          day={day}
          key={`${day.toDateString()}${j}-${k}`}
          onTilePress={onTilePress}
          // isCurrentMonth={isCurrentMonth}
          // isSelected={isSelected}
          // textStyling={isSameDate(day, today) && styles.todayText}
          // hasTask={hasTask}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ padding: 20 }}>
        {displayedMonth.toLocaleString('default', { month: 'long' })}{' '}
        {displayedMonth.getFullYear()}
      </div>
      <DayNameRow />
      <div
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
      >
        {dateArray}
      </div>
    </div>
  );

  function determineRenderDate(initial: Date): () => Date {
    //sets start of week to correct day
    let renderDate: Date = new Date(
      initial.setDate(initial.getDate() - initial.getDay()),
    );

    return updateDate;

    function updateDate() {
      const returnDate: Date = new Date(renderDate);
      renderDate.setDate(renderDate.getDate() + 1);
      return returnDate;
    }
  }

  function isSameDate(d1: Date, d2: Date) {
    if (!d1 || !d2) return false;
    return (
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getDate() === d2.getDate()
    );
  }
};
