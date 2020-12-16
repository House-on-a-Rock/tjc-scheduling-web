import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const ServiceContainer = ({ service }: any) => {
  return (
    <>
      <TableRow>{service.name}</TableRow>
      {service.eventData.map((event: any) => {
        return (
          <TableRow>
            {event.cells.map((cell: any, index: number) => {
              // can use index later to decide how to render time
              console.log('cell', cell);
              return <TableCell>{cell.display}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </>
  );
};
