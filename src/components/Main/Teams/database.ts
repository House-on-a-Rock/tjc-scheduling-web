import { v4 as uuid } from 'uuid';

export const TEAMS: BackendTeamsData[] = [
  {
    role: 'Sermon Speakers',
    members: [
      { id: uuid(), name: 'Ted Chen' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Jane Doe' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
  {
    role: 'Pianists',
    members: [
      { id: uuid(), name: 'Tom Nook' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Michelle Nook' },
      { id: uuid(), name: 'Wells Doe' },
    ],
  },
  {
    role: 'Announcers',
    members: [
      { id: uuid(), name: 'Ted Nook' },
      { id: uuid(), name: 'John Doe' },
      { id: uuid(), name: 'Jane Nook' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
  {
    role: 'Senior Class Teachers',
    members: [
      { id: uuid(), name: 'Isabel Nook' },
      { id: uuid(), name: 'Ian Doe' },
      { id: uuid(), name: 'Jane Nook' },
      { id: uuid(), name: 'Tendo Nook' },
    ],
  },
];

export const MEMBERS: AllMembersData[] = [
  { id: uuid(), name: 'Shaun Tung' },
  { id: uuid(), name: 'Ted Chen' },
  { id: uuid(), name: 'Ian Lin' },
  { id: uuid(), name: 'Michelle Lin' },
  { id: uuid(), name: 'Alan Lin' },
];

export interface BackendTeamsData {
  role: string;
  members: TeamData[];
}
export interface TeamData {
  id: string;
  name: string;
}

export interface AllMembersData {
  id: string;
  name: string;
}

export interface TeamState {
  [key: string]: TeamData[];
}
