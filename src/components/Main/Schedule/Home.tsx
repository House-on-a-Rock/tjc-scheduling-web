import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions';
import { EditableCell } from './EditableCell';

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

export const Home = () => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      { Header: 'Time', accessor: 'time' },
      { Header: 'Duty', accessor: 'duty' },
      { Header: '06/26', accessor: 'june06' },
      { Header: '07/04', accessor: 'july04' },
      { Header: '07/04', accessor: 'july04' },
      { Header: '07/11', accessor: 'july11' },
    ],
    [],
  );
  const data = useMemo(
    () => [
      { time: 'Hello', july04: 'World' },
      { col1: 'react-table', col2: 'rocks' },
      { col1: 'whatever', col2: 'you want' },
    ],
    [],
  );

  return (
    <>
      <button
        onClick={() => {
          // remove from local storage
          dispatch(logout());
        }}
      >
        Log Out
      </button>
    </>
  );
};
