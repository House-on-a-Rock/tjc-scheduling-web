// action types
export const LOAD_MEMBERS = 'LOAD_MEMBERS';
export const ADD_MEMBER = 'ADD_MEMBER';
export const DELETE_MEMBERS = 'DELETE_MEMBERS';

// action payloads
export interface MemberStateData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  ChurchId?: number;
  church: { name: string };
  roles: string[];
}

// action creators
interface LoadMembersAction {
  type: typeof LOAD_MEMBERS;
  payload: MemberStateData[];
}

interface AddMemberAction {
  type: typeof ADD_MEMBER;
  payload: MemberStateData[];
}

interface DeleteMemberAction {
  type: typeof DELETE_MEMBERS;
  payload: MemberStateData[];
}

export type MemberActionTypes = LoadMembersAction | AddMemberAction | DeleteMemberAction;

export interface MembersState {
  members: MemberStateData[];
}
