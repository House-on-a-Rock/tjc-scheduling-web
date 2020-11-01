import React, { useState, useEffect } from 'react';
import { makeData } from './services';
import { useDispatch } from 'react-redux';

import { Scheduler } from './Scheduler';
import { ScheduleTabs } from './ScheduleTabs';

import { logout } from '../../../store/actions';
import { useSelector } from '../../../shared/utilities';
import { useQuery } from 'react-query';
import { getScheduleData } from '../../../query/schedules';
import { makeScheduleData } from './anotherService';

export const Home = () => {
  const dispatch = useDispatch();

  // React-query
  const { churchId, name: churchName } = useSelector((state) => state.profile);
  const { isLoading, error, data = [] } = useQuery(
    ['schedulesData', churchId],
    getScheduleData,
    { enabled: churchId },
  );

  if (status === 'loading') return <div>loading...</div>; // loading state

  // Component state
  const [tabIdx, setTabIdx] = useState(0);
  if (data[0]) console.log('schedules', data[0].services);
  const [schedules, setSchedules] = useState(data[tabIdx]);

  function handleChange(e: React.ChangeEvent, value: number) {
    setTabIdx(value);
    setSchedules(data[tabIdx]?.services);
  }

  useEffect(() => {
    setSchedules(data[tabIdx]?.services);
  }, [data]);

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem('access_token');
          dispatch(logout());
        }}
      >
        Log Out
      </button>
      <ScheduleTabs
        tabIdx={tabIdx}
        handleChange={handleChange}
        titles={data.map((schedule: any) => schedule.title)}
      />
      {schedules?.map((schedule: any, idx: any) => (
        <Scheduler schedule={schedule} key={idx} />
      ))}
    </>
  );
};

// import React, { useState, useEffect } from 'react';
// import { makeData } from './services';
// import { useDispatch } from 'react-redux';

// import { Scheduler } from './Scheduler';
// import { ScheduleTabs } from './ScheduleTabs';

// import { logout } from '../../../store/actions';
// import { useSelector } from '../../../shared/utilities';
// import { useQuery } from 'react-query';
// import { getScheduleData } from '../../../query/schedules';
// import { makeScheduleData } from './anotherService';

// export const Home = () => {
//   const dispatch = useDispatch();

//   // React-query
//   const { churchId, name: churchName } = useSelector((state) => state.profile);
//   const { isLoading, error, data = [] } = useQuery(
//     ['schedulesData', churchId],
//     getScheduleData,
//     { enabled: churchId },
//   );

//   if (status === 'loading') return <div>loading...</div>; // loading state

//   // Component state
//   const [tabIdx, setTabIdx] = useState(0);
//   const [schedules, setSchedules] = useState(makeScheduleData(data, 0));

//   function handleChange(e: React.ChangeEvent, value: number) {
//     setTabIdx(value);
//     setSchedules(makeScheduleData(data, value));
//   }

//   useEffect(() => {
//     const updatedSchedule = makeScheduleData(data, tabIdx);
//     if (updatedSchedule && updatedSchedule[0]) {
//       console.table(updatedSchedule);
//       console.log('data:');
//       console.table(updatedSchedule[0].data);
//       console.log('columns:');
//       console.table(updatedSchedule[0].columns);
//     }
//     setSchedules(updatedSchedule);
//   }, [data]);

//   return (
//     <>
//       <button
//         onClick={() => {
//           localStorage.removeItem('access_token');
//           dispatch(logout());
//         }}
//       >
//         Log Out
//       </button>
//       <ScheduleTabs
//         tabIdx={tabIdx}
//         handleChange={handleChange}
//         titles={data.map(({ title }: any) => title)}
//       />
//       {schedules.map((schedule: any, idx: any) => (
//         <Scheduler schedule={schedule} key={idx} />
//       ))}
//     </>
//   );
// };
