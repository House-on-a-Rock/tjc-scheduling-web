import React from 'react';

enum AbbrevDays {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

// change name to CalendarDayTitleRow
export const DayNameRow = () => {
  const dayNameArray = new Array(7);
  for (let i = 0; i < dayNameArray.length; i++) {
    dayNameArray[i] = (
      <div
        key={i}
        style={{
          width: 200,
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid rgba(0, 0, 0, 0.5)',
        }}
      >
        {AbbrevDays[i]}
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        width: 1400,
        flexDirection: 'row',
        paddingBottom: 20,
        border: '1px solid rgba(0, 0, 0, 0.5)',
      }}
    >
      {dayNameArray}
    </div>
  );
};
