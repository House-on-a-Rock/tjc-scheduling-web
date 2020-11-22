import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { SchedulerProps, WeeklyAssignmentInterface } from '../../../shared/types';
import { extractRoleIds } from '../../../shared/utilities';

//receives one service and creates a table for it
export const Scheduler = React.memo(({ service, role }: SchedulerProps) => {
  const { name, data, columns } = service;

  //not sure if this should be here or in Table, as im manipulating the data in Table as well. however, this component isn't really using
  //updateMyData right now so i'll just leave it as is, and figure it out once the table cells can update data too
  const [scheduleData, setScheduleData] = useState(data);

  const accessLevel = extractRoleIds(localStorage.getItem('access_token'));

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
      access={accessLevel.includes(role.id) || accessLevel.includes(0) ? 'write' : 'read'}
    />
  );
}, propsAreEqual);

function propsAreEqual(prevProps: SchedulerProps, nextProps: SchedulerProps): boolean {
  return prevProps.service.name === nextProps.service.name;
}
