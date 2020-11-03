import React, { useState } from 'react';
import { Calendar } from './Calendar';

export const MonthView = () => {
  const today = new Date();

  const onDateClick = (date: Date) => {
    console.log('Date was pressed', date);
  };

  const [displayedMonth, setDisplayedMonth] = useState(new Date());

  const decrementMonth = () =>
    setDisplayedMonth((d) => new Date(d.setMonth(d.getMonth() - 1)));

  const incrementMonth = () =>
    setDisplayedMonth((d) => new Date(d.setMonth(d.getMonth() + 1)));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button onClick={decrementMonth}>Back</button>
      <button onClick={incrementMonth}>Forward</button>
      <Calendar displayedMonth={displayedMonth} onTileClick={onDateClick} />
    </div>
  );
};
