import { v4 as uuid } from 'uuid';
// import { BackendTeamsData, MembersData } from './models';

export const MEMBERS: any = [];

// consistent schedule
export const SCHEDULE: any = [
  {
    Main: {
      // each tab
      uuid: 'uuid1',
      view: 'weekly', // 'weekly' | 'monthly'  // leave to the front end
      time_span: '07/01/2020-09/30/2020',
      weekly_events: {
        Saturday: {
          events: [
            // event[] =
            // weekly view fetch events for that week and sort according to date
            // look by time frame
            // calendar has many roles
            // assign the role when they create a template

            // each object is a row
            {
              // order: 1, // maybe useful to fix sorting logic?
              time: '10:15 AM',
              duties: [{ title: 'Door Opener' }, { title: 'Usher' }],
            },
            {
              time: '10:45 AM',
              duties: [{ title: 'Hymn Leading' }, { title: 'Piano' }],
            },
            {
              time: '11:00 AM',
              duties: [{ title: 'Sermon Speaker' }, { title: 'Interpreter' }],
            },
            {
              time: '12:00 PM',
              duties: [{ title: 'Announcer' }, { title: 'Grace' }, { title: 'Cooking' }],
            },
            {
              time: '12:30 PM',
              duties: [{ title: 'Lunch Prayer' }, { title: 'Cleaning Team' }],
            },
            {
              time: '1:45 PM',
              duties: [{ title: 'Hymn Leading' }, { title: 'Piano' }],
            },
            {
              time: '2:00 PM',
              duties: [{ title: 'Sermon Speaker' }, { title: 'Interpreter' }],
            },
          ],
          dividers: [
            { name: 'Morning Service', time: '10:15 AM - 12:30 PM' },
            { name: 'Afternoon Service', time: '1:45 PM - 2:00 PM' },
          ],
        },
        Friday: {
          events: [
            {
              time: '7:00 PM',
              duties: [{ title: 'Unlock Door' }, { title: 'Usher' }],
              tag: 'Evening Service',
            },
            {
              time: '7:45 PM',
              duties: [{ title: 'Hymn Leading' }, { title: 'Piano' }],
              tag: 'Evening Service',
            },
            {
              time: '8:00 PM',
              duties: [{ title: 'Sermon Speaker' }, { title: 'Interpreter' }],
              tag: 'Evening Service',
            },
          ],
          dividers: [{ name: 'Evening Service', time: '7:00 PM - 9:00 PM' }],
        },
      },
      specific_events: [],
    },
  },
  {
    'Religious Education': {
      uuid: 'uuid2',
      view: 'monthly',
      time_span: '07/01/2020-09/30/2020',
      weekly_events: [
        {
          time: '11:00 AM',
          duties: [{ name: 'E1 Teacher' }, { name: 'Kindegarten Teacher' }],
        },
        {
          time: '1:30 PM',
          duties: [{ name: 'E2 Teacher' }, { name: 'J2 Teacher' }],
        },
      ],
    },
  },
  // {
  //   'Upper Room Fellowship': {
  //     uuid: 'uuid3',
  //     view: 'monthly',
  //   },
  // },
];

// schedule[i] = tabs
// schedule[i].type

const tasks = [];
