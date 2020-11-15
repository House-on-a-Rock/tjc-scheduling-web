import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import {
  MappedScheduleInterface,
  SchedulerProps,
  WeeklyAssignmentInterface,
} from '../../../shared/types';

//receives one service and creates a table for it
export const Scheduler = React.memo(({ service }: SchedulerProps) => {
  const { name, data, columns } = service;
  const [scheduleData, setScheduleData] = useState(data);

  useEffect(() => {
    setScheduleData(data);
  }, [data]);

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
}, propsAreEqual);

function propsAreEqual(prevProps: SchedulerProps, nextProps: SchedulerProps): boolean {
  return prevProps.service.name === nextProps.service.name ? true : false;
}
