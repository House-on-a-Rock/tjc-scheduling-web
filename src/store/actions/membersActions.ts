import { AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { errorDataExtractor } from '../../shared/helper_functions';
import { AuthStateActions } from '.';
import { secretIp } from '../../../secrets/secretStuff';
import {
  getOneUser,
  getAllUsers,
  getUserTasks,
  getAllLocalChurchUsers,
  deleteUser,
} from '../apis';
import { extractId } from './helper_functions';
import {
  MemberActionTypes,
  LOAD_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBERS,
  LOAD_USER,
  MemberStateData,
} from '../types';

export const loadMembers = (
  payload: MemberStateData[],
  church: string,
): MemberActionTypes => ({
  type: LOAD_MEMBERS,
  payload: payload,
  church: church,
});

export const addMember = (payload: MemberStateData[]): MemberActionTypes => ({
  type: ADD_MEMBER,
  payload: payload,
});

export const deleteMembers = (): MemberActionTypes => ({
  type: DELETE_MEMBERS,
});

export const loadUser = (payload: MemberStateData): MemberActionTypes => ({
  type: LOAD_USER,
  payload: payload,
});

//action creators or THUNKS
export const onLoadMembers = (): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = extractId(accessToken);
      const loggedInUserResponse = await getOneUser(userId.toString());
      const response = await getAllLocalChurchUsers(
        loggedInUserResponse.data.ChurchId.toString(),
      );

      // update users with their roles
      let updatedMemberList = response.data;
      updatedMemberList.map(async (user: MemberStateData) => {
        const userId = user.id;
        let roleList: string[] = [];
        const taskResponse = await getUserTasks(userId.toString());
        console.log(taskResponse);
        taskResponse.data.map((task: any) => {
          roleList.push(task.role.name);
        });
        roleList = Array.from(new Set(roleList));
        user.roles = roleList;
      });
      dispatch(loadMembers(updatedMemberList, loggedInUserResponse.data.church.name));
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
      dispatch(loadUser(rowData));
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};

export const onDeleteMembers = (
  selectedMembers: number[],
): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      selectedMembers.map(async (member) => {
        await deleteUser(member.toString());
      });
      dispatch(deleteMembers());
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};
