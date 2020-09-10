import React, { useMemo, useState, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions';

import { Table } from './Table';

const databaseData = [
  {
    time: '10:15 AM',
    duty: 'Usher',
    june27: 'Kevin Wang',
    july04: 'Kevin Wang',
    july11: 'Sun-yu Yang',
  },
  {
    time: '10:45 AM',
    duty: 'Hymn Leading',
    june27: 'Shenney Lin',
    july04: 'Chloe Lin',
    july11: 'Vinnie Lin',
  },
  {
    time: '10:45 AM',
    duty: 'Piano',
    june27: 'Shouli Tung',
    july04: 'Shaun Tung',
    july11: 'Rebecca Lin',
  },
];

function makeData() {
  const makeDataLevel = () => databaseData;
  return makeDataLevel();
}

export const Home = () => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      { Header: 'Time', accessor: 'time' },
      { Header: 'Duty', accessor: 'duty' },
      { Header: '06/27', accessor: 'june27' },
      { Header: '07/04', accessor: 'july04' },
      { Header: '07/11', accessor: 'july11' },
    ],
    [],
  );
  const [data, setData] = useState(makeData());

  useEffect(() => console.log(data), []);

  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    setData((old) =>
      old.map((row: any, index: any) =>
        index === rowIndex ? { ...old[rowIndex], [columnId]: value } : row,
      ),
    );
  };

  return (
    <>
      {/* <button
        onClick={() => {
          // remove from local storage
          dispatch(logout());
        }}
      >
        Log Out
      </button> */}
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </>
  );
};
