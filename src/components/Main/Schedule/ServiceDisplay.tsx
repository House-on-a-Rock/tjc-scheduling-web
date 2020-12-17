import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { DataCell } from './TableCell';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/';
import { days } from '../../../shared/utilities/dateHelper';

//query
import { getChurchMembersData } from '../../../query';
import { useQuery, useMutation, useQueryCache } from 'react-query';

export const ServiceDisplay = ({ service, selectedCell, onCellClick }: any) => {
  const [isChildrenVisible, setChildrenVisible] = useState(true);

  const { churchId, name: churchName } = useSelector((state: RootState) => state.profile);
  const { isLoading, error, data: userData } = useQuery(
    ['roleData', churchId],
    getChurchMembersData,
    {
      staleTime: 300000,
      cacheTime: 3000000,
    },
  );
  if (isLoading) return <div>Loading</div>; // prevents problems when using data from useQuery before its arrived from the backend.

  const eventRows = service.eventData.map((event: any, rowIndex: number) => {
    const potentialMembers = userData.filter((user: any) =>
      user.roles.some((role: any) => role.id === event.roleId),
    );

    return (
      <TableRow>
        {event.cells.map((cell: any, columnIndex: number) => {
          if (columnIndex < 2) return <TableCell>{cell.display}</TableCell>;
          return (
            <DataCell
              data={cell}
              isSelected={selectedCell === `${service.name}_${columnIndex}_${rowIndex}`}
              row={rowIndex}
              column={columnIndex}
              onCellClick={onCellClick}
              service={service}
              members={potentialMembers}
            />
          );
        })}
      </TableRow>
    );
  });

  return (
    <>
      <TableRow
        onClick={() => {
          setChildrenVisible((d) => !d);
        }}
      >{`${days[service.day]} ${service.name}`}</TableRow>
      {isChildrenVisible ? eventRows : <TableRow>placeholder</TableRow>}
    </>
  );
};
