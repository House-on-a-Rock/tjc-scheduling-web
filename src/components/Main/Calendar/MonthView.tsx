import React from 'react';
import { Calendar } from './Calendar';

export const MonthView = () => {
  const today = new Date();

  const onDatePress = (date: Date) => {
    console.log('Date was pressed', date);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <button>Back</button>
      <button>Forward</button> */}
      <Calendar displayedMonth={today} onTilePress={onDatePress} />
    </div>
  );
};
