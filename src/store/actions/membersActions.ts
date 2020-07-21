import { AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { errorDataExtractor } from '../../shared/helper_functions';
import { AuthStateActions } from '.';
import { secretIp } from '../../../secrets/secretStuff';
import { getAllUsers, getUserTasks } from '../apis';

import {
  MemberActionTypes,
  LOAD_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBERS,
  LOAD_USER,
  MemberStateData,
} from '../types';

export const loadMembers = (payload: MemberStateData[]): MemberActionTypes => ({
  type: LOAD_MEMBERS,
  payload: payload,
});

export const addMember = (payload: MemberStateData[]): MemberActionTypes => ({
  type: ADD_MEMBER,
  payload: payload,
});

export const deleteMembers = (payload: MemberStateData[]): MemberActionTypes => ({
  type: DELETE_MEMBERS,
  payload: payload,
});

export const loadUser = (payload: MemberStateData): MemberActionTypes => ({
  type: LOAD_USER,
  payload: payload,
});

//action creators or THUNKS
export const onLoadMembers = (): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const response = await getAllUsers();
      console.log(response.data);
      dispatch(loadMembers(response.data));
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};

export const onLoadUser = (
  rowData: MemberStateData,
): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const userId = rowData.id;
      let updatedRowData = rowData;
      let roleList: string[] = [];
      const taskResponse = await getUserTasks(userId.toString());
      console.log(taskResponse);
      taskResponse.data.map((task: any) => {
        roleList.push(task.role.name);
      });
      roleList = Array.from(new Set(roleList));
      updatedRowData.roles = roleList;
      console.log(roleList);
      dispatch(loadUser(updatedRowData));
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};
