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
      <div key={i} style={{ width: '100%' }}>
        {AbbrevDays[i]}
      </div>
    );
  }
  return (
    <div
      style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingBottom: 20 }}
    >
      {dayNameArray}
    </div>
  );
};
