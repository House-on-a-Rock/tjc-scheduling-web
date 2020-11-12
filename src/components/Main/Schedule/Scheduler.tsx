import React, { useState } from 'react';
import { Table } from './Table';
import { SchedulerProps, WeeklyAssignmentInterface } from '../../../shared/types';
import { extractRoleIds } from '../../../shared/utilities';

const accessLevel = extractRoleIds(localStorage.getItem('access_token'));

export const Scheduler = ({ schedule, role }: SchedulerProps) => {
  const { name, data, columns } = schedule;
  const [scheduleData, setScheduleData] = useState(data);

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
};
