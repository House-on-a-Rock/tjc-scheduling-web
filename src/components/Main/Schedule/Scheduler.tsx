import React, { useState } from 'react';
import { Table } from './Table';
import {
  MappedScheduleInterface,
  SchedulerProps,
  WeeklyAssignmentInterface,
} from '../../../shared/types';

//a table for each of the services
export const Scheduler = ({ schedule }: SchedulerProps) => {
  const { name, data, columns } = schedule;
  const [scheduleData, setScheduleData] = useState(data);
  console.log('scheduler name', name);

  const updateMyData = (rowIndex: number, columnId: string, value: string) =>
    setScheduleData((old: WeeklyAssignmentInterface[]) =>
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
