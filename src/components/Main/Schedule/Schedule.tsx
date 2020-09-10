import React, { useState } from 'react';
import { Table } from './Table';
import { MappedScheduleInterface } from '../../../shared/types';

export const Schedule = ({ schedule }: any) => {
  const { day, columns, data, name }: MappedScheduleInterface = schedule;
  const [scheduleData, setScheduleData] = useState(data);

  const updateMyData = (rowIndex: number, columnId: string, value: string) =>
    setScheduleData((old) =>
      old.map((row: any, index: any) =>
        index === rowIndex ? { ...old[rowIndex], [columnId]: value } : row,
      ),
    );

  return (
    <Table
      columns={columns}
      data={scheduleData}
      updateMyData={updateMyData}
      title={name}
    />
  );
};
