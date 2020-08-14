import { v4 as uuid } from 'uuid';
import { ColumnFields } from '../../../shared/types';
// import { BackendTeamsData, MembersData } from './models';

export const MEMBERS: any = [];

// consistent schedule
export interface TasksData {
  date: string;
  assignee: string;
}
export interface DutyData {
  title: string;
  tasks: TasksData[];
  team?: string;
}
export interface EventData {
  time: string;
  duties: DutyData[];
  tag?: string;
}
export interface WeeklyEventData {
  day: string;
  events: EventData[];
  dividers: Divider[];
  order: number;
}
export interface TimeRange {
  start: string;
  end: string;
}
export interface Divider {
  name: string;
  timerange: TimeRange;
}
export interface ScheduleData {
  title: string;
  id: string;
  view: string;
  daterange: string[];
  weeklyEvents: WeeklyEventData[];
  specificEvents?: any[];
}

export interface ScheduleInterface {
  columns: ColumnFields[];
  day: string;
  // data:
}
export const SCHEDULE: ScheduleData[] = [
  {
    title: 'Main',
    id: uuid(),
    view: 'weekly', // 'weekly' | 'monthly'  // leave to the front end
    daterange: ['2020/06/26', '2020/09/19'], // database will come back with utc string
    weeklyEvents: [
      {
        day: 'Saturday',
        order: 1,
        events: [
          {
            time: '10:15 AM',
            duties: [
              {
                title: 'Usher',
                team: 'Church Council',
                tasks: [
                  { date: '2020/06/27', assignee: 'Kevin Wang' },
                  { date: '2020/07/04', assignee: 'Kevin Wang' },
                  { date: '2020/07/11', assignee: 'Sun-yu Yang' },
                  { date: '2020/07/18', assignee: 'Kevin Wang' },
                  { date: '2020/07/25', assignee: 'Sun-yu Yang' },
                  { date: '2020/08/01', assignee: 'Kevin Wang' },
                  { date: '2020/08/08', assignee: 'Sun-yu Yang' },
                  { date: '2020/08/15', assignee: 'Kevin Wang' },
                  { date: '2020/08/22', assignee: 'Sun-yu Yang' },
                  { date: '2020/08/29', assignee: 'Kevin Wang' },
                  { date: '2020/09/05', assignee: 'Sun-yu Yang' },
                  { date: '2020/09/12', assignee: 'Kevin Wang' },
                  { date: '2020/09/19', assignee: 'Sun-yu Yang' },
                ],
              },
            ],
          },
          {
            time: '10:45 AM',
            duties: [
              {
                title: 'Hymn Leading',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shenney Lin' },
                  { date: '2020/07/04', assignee: 'Chloe Lin' },
                  { date: '2020/07/11', assignee: 'Vinnie Lin' },
                  { date: '2020/07/18', assignee: 'Qianwei Liu' },
                  { date: '2020/07/25', assignee: 'Xingru Wang' },
                  { date: '2020/08/01', assignee: 'Shaun Tung' },
                  { date: '2020/08/08', assignee: 'Shenney Lin' },
                  { date: '2020/08/15', assignee: 'Chloe Lin' },
                  { date: '2020/08/22', assignee: 'Vinnie Lin' },
                  { date: '2020/08/29', assignee: 'Qianwei Liu' },
                  { date: '2020/09/05', assignee: 'Xingru Wang' },
                  { date: '2020/09/12', assignee: 'Shaun Tung' },
                  { date: '2020/09/19', assignee: 'Shenney Lin' },
                ],
              },
              {
                title: 'Piano',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shouli Tung' },
                  { date: '2020/07/04', assignee: 'Shaun Tung' },
                  { date: '2020/07/11', assignee: 'Rebecca Lin' },
                  { date: '2020/07/18', assignee: 'Shenney Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Chloe Lin' },
                  { date: '2020/08/08', assignee: 'Vinnie Lin' },
                  { date: '2020/08/15', assignee: 'Shouli Tung' },
                  { date: '2020/08/22', assignee: 'Shaun Tung' },
                  { date: '2020/08/29', assignee: 'Rebecca Lin' },
                  { date: '2020/09/05', assignee: 'Shenney Lin' },
                  { date: '2020/09/12', assignee: 'Joseph Wu' },
                  { date: '2020/09/19', assignee: 'Chloe Lin' },
                ],
              },
            ],
          },
          {
            time: '11:00 AM',
            duties: [
              {
                title: 'Sermon Speaker',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shouli Tung' },
                  { date: '2020/07/04', assignee: 'Shaun Tung' },
                  { date: '2020/07/11', assignee: 'Rebecca Lin' },
                  { date: '2020/07/18', assignee: 'Shenney Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Chloe Lin' },
                  { date: '2020/08/08', assignee: 'Vinnie Lin' },
                  { date: '2020/08/15', assignee: 'Shouli Tung' },
                  { date: '2020/08/22', assignee: 'Shaun Tung' },
                  { date: '2020/08/29', assignee: 'Rebecca Lin' },
                  { date: '2020/09/05', assignee: 'Shenney Lin' },
                  { date: '2020/09/12', assignee: 'Joseph Wu' },
                  { date: '2020/09/19', assignee: 'Chloe Lin' },
                ],
              },
              {
                title: 'Interpreter',
                tasks: [
                  { date: '2020/06/27', assignee: 'Joseph Wu' },
                  { date: '2020/07/04', assignee: 'Thomas Hsu' },
                  { date: '2020/07/11', assignee: 'Qianwei Liu' },
                  { date: '2020/07/18', assignee: 'Rebecca Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Thomas Hsu' },
                  { date: '2020/08/08', assignee: 'Qianwei Liu' },
                  { date: '2020/08/15', assignee: 'Rebecca Lin' },
                  { date: '2020/08/22', assignee: 'Joseph Wu' },
                  { date: '2020/08/29', assignee: 'Thomas Hsu' },
                  { date: '2020/09/05', assignee: 'Qianwei Liu' },
                  { date: '2020/09/12', assignee: 'Rebecca Lin' },
                  { date: '2020/09/19', assignee: 'Joseph Wu' },
                ],
              },
            ],
          },
          {
            time: '12:00 PM',
            duties: [
              {
                title: 'Announcer',
                tasks: [
                  { date: '2020/06/27', assignee: 'Brenda Ong' },
                  { date: '2020/07/04', assignee: 'Kevin Wang' },
                  { date: '2020/07/11', assignee: 'Sun-Yu Yang' },
                  { date: '2020/07/18', assignee: 'Yvonne Wong' },
                  { date: '2020/07/25', assignee: 'Brenda Ong' },
                  { date: '2020/08/01', assignee: 'Kevin Wang' },
                  { date: '2020/08/08', assignee: 'Sun-Yu Yang' },
                  { date: '2020/08/15', assignee: 'Yvonne Wong' },
                  { date: '2020/08/22', assignee: 'Brenda Ong' },
                  { date: '2020/08/29', assignee: 'Kevin Wang' },
                  { date: '2020/09/05', assignee: 'Sun-Yu Yang' },
                  { date: '2020/09/12', assignee: 'Yvonne Wong' },
                  { date: '2020/09/19', assignee: 'Brenda Ong' },
                ],
              },
              {
                title: 'Grace',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shenney Lin' },
                  { date: '2020/07/04', assignee: 'Vinnie Lin' },
                  { date: '2020/07/11', assignee: 'Shaun Tung' },
                  { date: '2020/07/18', assignee: 'Shouli Tung' },
                  { date: '2020/07/25', assignee: 'Brenda Ong' },
                  { date: '2020/08/01', assignee: 'Kevin Wang' },
                  { date: '2020/08/08', assignee: 'Sun-Yu Yang' },
                  { date: '2020/08/15', assignee: 'Yvonne Wong' },
                  { date: '2020/08/22', assignee: 'Rebecca Lin' },
                  { date: '2020/08/29', assignee: 'Thomas Hsu' },
                  { date: '2020/09/05', assignee: 'Qianwei Liu' },
                  { date: '2020/09/12', assignee: 'Chloe Lin' },
                  { date: '2020/09/19', assignee: 'Joseph Wu' },
                ],
              },
              {
                title: 'Cooking',
                tasks: [
                  { date: '2020/06/27', assignee: 'Team A' },
                  { date: '2020/07/04', assignee: 'Team B' },
                  { date: '2020/07/11', assignee: 'Team A' },
                  { date: '2020/07/18', assignee: 'Team B' },
                  { date: '2020/07/25', assignee: 'Team A' },
                  { date: '2020/08/01', assignee: 'Team B' },
                  { date: '2020/08/08', assignee: 'Team A' },
                  { date: '2020/08/15', assignee: 'Team B' },
                  { date: '2020/08/22', assignee: 'Team A' },
                  { date: '2020/08/29', assignee: 'Team B' },
                  { date: '2020/09/05', assignee: 'Team A' },
                  { date: '2020/09/12', assignee: 'Team B' },
                  { date: '2020/09/19', assignee: 'Team A' },
                ],
              },
            ],
          },
          {
            time: '1:45 PM',
            duties: [
              {
                title: 'Hymn Leading',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shenney Lin' },
                  { date: '2020/07/04', assignee: 'Chloe Lin' },
                  { date: '2020/07/11', assignee: 'Vinnie Lin' },
                  { date: '2020/07/18', assignee: 'Qianwei Liu' },
                  { date: '2020/07/25', assignee: 'Xingru Wang' },
                  { date: '2020/08/01', assignee: 'Shaun Tung' },
                  { date: '2020/08/08', assignee: 'Shenney Lin' },
                  { date: '2020/08/15', assignee: 'Chloe Lin' },
                  { date: '2020/08/22', assignee: 'Vinnie Lin' },
                  { date: '2020/08/29', assignee: 'Qianwei Liu' },
                  { date: '2020/09/05', assignee: 'Xinrgu Wang' },
                  { date: '2020/09/12', assignee: 'Shaun Tung' },
                  { date: '2020/09/19', assignee: 'Shenney Lin' },
                ],
              },
              {
                title: 'Piano',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shouli Tung' },
                  { date: '2020/07/04', assignee: 'Shaun Tung' },
                  { date: '2020/07/11', assignee: 'Rebecca Lin' },
                  { date: '2020/07/18', assignee: 'Shenney Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Chloe Lin' },
                  { date: '2020/08/08', assignee: 'Vinnie Lin' },
                  { date: '2020/08/15', assignee: 'Shouli Tung' },
                  { date: '2020/08/22', assignee: 'Shaun Tung' },
                  { date: '2020/08/29', assignee: 'Rebecca Lin' },
                  { date: '2020/09/05', assignee: 'Shenney Lin' },
                  { date: '2020/09/12', assignee: 'Joseph Wu' },
                  { date: '2020/09/19', assignee: 'Chloe Lin' },
                ],
              },
            ],
          },
          {
            time: '2:00 PM',
            duties: [
              {
                title: 'Sermon Speaker',
                tasks: [
                  { date: '2020/06/27', assignee: 'Shouli Tung' },
                  { date: '2020/07/04', assignee: 'Shaun Tung' },
                  { date: '2020/07/11', assignee: 'Rebecca Lin' },
                  { date: '2020/07/18', assignee: 'Shenney Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Chloe Lin' },
                  { date: '2020/08/08', assignee: 'Vinnie Lin' },
                  { date: '2020/08/15', assignee: 'Shouli Tung' },
                  { date: '2020/08/22', assignee: 'Shaun Tung' },
                  { date: '2020/08/29', assignee: 'Rebecca Lin' },
                  { date: '2020/09/05', assignee: 'Shenney Lin' },
                  { date: '2020/09/12', assignee: 'Joseph Wu' },
                  { date: '2020/09/19', assignee: 'Chloe Lin' },
                ],
              },
              {
                title: 'Interpreter',
                tasks: [
                  { date: '2020/06/27', assignee: 'Joseph Wu' },
                  { date: '2020/07/04', assignee: 'Thomas Hsu' },
                  { date: '2020/07/11', assignee: 'Qianwei Liu' },
                  { date: '2020/07/18', assignee: 'Rebecca Lin' },
                  { date: '2020/07/25', assignee: 'Joseph Wu' },
                  { date: '2020/08/01', assignee: 'Thomas Hsu' },
                  { date: '2020/08/08', assignee: 'Qianwei Liu' },
                  { date: '2020/08/15', assignee: 'Rebecca Lin' },
                  { date: '2020/08/22', assignee: 'Joseph Wu' },
                  { date: '2020/08/29', assignee: 'Thomas Hsu' },
                  { date: '2020/09/05', assignee: 'Qianwei Liu' },
                  { date: '2020/09/12', assignee: 'Rebecca Lin' },
                  { date: '2020/09/19', assignee: 'Joseph Wu' },
                ],
              },
            ],
          },
        ],
        dividers: [
          { name: 'Morning Service', timerange: { start: '10:15 AM', end: '12:30 PM' } },
          { name: 'Afternoon Service', timerange: { start: '1:45 PM', end: '2:00 PM' } },
        ],
      },
      {
        day: 'Friday',
        order: 2,
        events: [
          {
            time: '7:00 PM',
            duties: [
              {
                title: 'Usher',
                team: 'Church Council',
                tasks: [
                  { date: '2020/06/26', assignee: 'Kevin Wang' },
                  { date: '2020/07/03', assignee: 'Kevin Wang' },
                  { date: '2020/07/10', assignee: 'Sun-yu Yang' },
                  { date: '2020/07/17', assignee: 'Kevin Wang' },
                  { date: '2020/07/24', assignee: 'Sun-yu Yang' },
                  { date: '2020/07/31', assignee: 'Kevin Wang' },
                  { date: '2020/08/07', assignee: 'Sun-yu Yang' },
                  { date: '2020/08/14', assignee: 'Kevin Wang' },
                  { date: '2020/08/21', assignee: 'Sun-yu Yang' },
                  { date: '2020/08/28', assignee: 'Kevin Wang' },
                  { date: '2020/09/04', assignee: 'Sun-yu Yang' },
                  { date: '2020/09/11', assignee: 'Kevin Wang' },
                  { date: '2020/09/18', assignee: 'Sun-yu Yang' },
                ],
              },
            ],
          },
          {
            time: '7:45 PM',
            duties: [
              {
                title: 'Hymn Leading',
                tasks: [
                  { date: '2020/06/26', assignee: 'Shenney Lin' },
                  { date: '2020/07/03', assignee: 'Chloe Lin' },
                  { date: '2020/07/10', assignee: 'Vinnie Lin' },
                  { date: '2020/07/17', assignee: 'Qianwei Liu' },
                  { date: '2020/07/24', assignee: 'Xingru Wang' },
                  { date: '2020/07/31', assignee: 'Shaun Tung' },
                  { date: '2020/08/07', assignee: 'Shenney Lin' },
                  { date: '2020/08/14', assignee: 'Chloe Lin' },
                  { date: '2020/08/21', assignee: 'Vinnie Lin' },
                  { date: '2020/08/28', assignee: 'Qianwei Liu' },
                  { date: '2020/09/04', assignee: 'Xingru Wang' },
                  { date: '2020/09/11', assignee: 'Shaun Tung' },
                  { date: '2020/09/18', assignee: 'Shenney Lin' },
                ],
              },
              {
                title: 'Piano',
                tasks: [
                  { date: '2020/06/26', assignee: 'Shouli Tung' },
                  { date: '2020/07/03', assignee: 'Shaun Tung' },
                  { date: '2020/07/10', assignee: 'Rebecca Lin' },
                  { date: '2020/07/17', assignee: 'Shenney Lin' },
                  { date: '2020/07/24', assignee: 'Joseph Wu' },
                  { date: '2020/07/31', assignee: 'Chloe Lin' },
                  { date: '2020/08/07', assignee: 'Vinnie Lin' },
                  { date: '2020/08/14', assignee: 'Shouli Tung' },
                  { date: '2020/08/21', assignee: 'Shaun Tung' },
                  { date: '2020/08/28', assignee: 'Rebecca Lin' },
                  { date: '2020/09/04', assignee: 'Shenney Lin' },
                  { date: '2020/09/11', assignee: 'Joseph Wu' },
                  { date: '2020/09/18', assignee: 'Chloe Lin' },
                ],
              },
            ],
          },
          {
            time: '8:00 PM',
            duties: [
              {
                title: 'Sermon Speaker',
                tasks: [
                  { date: '2020/06/26', assignee: 'Shouli Tung' },
                  { date: '2020/07/03', assignee: 'Shaun Tung' },
                  { date: '2020/07/10', assignee: 'Rebecca Lin' },
                  { date: '2020/07/17', assignee: 'Shenney Lin' },
                  { date: '2020/07/24', assignee: 'Joseph Wu' },
                  { date: '2020/07/31', assignee: 'Chloe Lin' },
                  { date: '2020/08/07', assignee: 'Vinnie Lin' },
                  { date: '2020/08/14', assignee: 'Shouli Tung' },
                  { date: '2020/08/21', assignee: 'Shaun Tung' },
                  { date: '2020/08/28', assignee: 'Rebecca Lin' },
                  { date: '2020/09/04', assignee: 'Shenney Lin' },
                  { date: '2020/09/11', assignee: 'Joseph Wu' },
                  { date: '2020/09/18', assignee: 'Chloe Lin' },
                ],
              },
              {
                title: 'Interpreter',
                tasks: [
                  { date: '2020/06/26', assignee: 'Joseph Wu' },
                  { date: '2020/07/03', assignee: 'Thomas Hsu' },
                  { date: '2020/07/10', assignee: 'Qianwei Liu' },
                  { date: '2020/07/17', assignee: 'Rebecca Lin' },
                  { date: '2020/07/24', assignee: 'Joseph Wu' },
                  { date: '2020/07/31', assignee: 'Thomas Hsu' },
                  { date: '2020/08/07', assignee: 'Qianwei Liu' },
                  { date: '2020/08/14', assignee: 'Rebecca Lin' },
                  { date: '2020/08/21', assignee: 'Joseph Wu' },
                  { date: '2020/08/28', assignee: 'Thomas Hsu' },
                  { date: '2020/09/04', assignee: 'Qianwei Liu' },
                  { date: '2020/09/11', assignee: 'Rebecca Lin' },
                  { date: '2020/09/18', assignee: 'Joseph Wu' },
                ],
              },
            ],
            tag: 'Evening Service',
          },
        ],
        dividers: [
          { name: 'Evening Service', timerange: { start: '7:00 PM', end: '9:00 PM' } },
        ],
      },
    ],
    specificEvents: [],
  },
  // {
  //   title: 'Religious Education',
  //   id: uuid(),
  //   view: 'monthly',
  //   daterange: ['2020/09/19', '2020/09/19'],
  //   weeklyEvents: [
  //     {
  //       day: 'Saturday',
  //       events: [
  //         {
  //           time: '11:00 AM',
  //           duties: [
  //             {
  //               title: 'E1 Teacher',
  //               tasks: [{ date: '2020/09/19', assignee: 'Joseph Wu' }],
  //             },
  //             {
  //               title: 'Kindegarten Teacher',
  //               tasks: [{ date: '2020/09/19', assignee: 'Yvonne Wong' }],
  //             },
  //           ],
  //         },
  //         // {
  //         //   time: '1:30 PM',
  //         //   duties: [{ title: 'E2 Teacher' }, { title: 'J2 Teacher' }],
  //         // },
  //       ],
  //     },
  //   ],
  // },
];

export const TASKS = [{}];
