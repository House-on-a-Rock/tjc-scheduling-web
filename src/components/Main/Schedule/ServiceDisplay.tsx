import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { DataCell } from './TableCell';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/';
import { days } from '../../../shared/utilities/dateHelper';

//query
import { getChurchMembersData } from '../../../query';
import { useQuery, useMutation, useQueryCache } from 'react-query';

export const ServiceDisplay = ({
  service,
  selectedCell,
  onCellClick,
  onTaskModified,
}: any) => {
  const classes = useStyles();
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
  // need a better looking solution though

  const eventRows = service.eventData.map((event: any, rowIndex: number) => {
    const potentialMembers = userData.filter((user: any) =>
      user.roles.some((role: any) => role.id === event.roleId),
    );

    return (
      <TableRow>
        {event.cells.map((cell: any, columnIndex: number) => {
          if (columnIndex < 2)
            return (
              <TableCell key={`${rowIndex}_${columnIndex}`} className={classes.cell}>
                {cell.display}
              </TableCell>
            );
          return (
            <DataCell
              data={cell}
              members={potentialMembers}
              onTaskModified={onTaskModified}
              key={`${rowIndex}_${columnIndex}`}
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

// ok styling needs some work
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      // color: typographyTheme.common.color,
      textAlign: 'center',
      '&:focus': {
        outline: 'none',
      },
      'user-select': 'none',
      padding: '1px 0px 2px 0px',
      height: 20,
      width: 50,
      fontSize: 14,
    },
  }),
);
