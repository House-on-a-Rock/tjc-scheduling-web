import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { errorDataExtractor, extractUserId } from '../../shared/helper_functions';
import { AuthStateActions } from '.';
import {
  getOneUser,
  getAllUsers,
  getUserRoles,
  getAllLocalChurchUsers,
  deleteUser,
  addUser,
} from '../apis';
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

export const addMember = (payload: MemberStateData): MemberActionTypes => ({
  type: ADD_MEMBER,
  payload: payload,
});

export const deleteMembers = (payload: number): MemberActionTypes => ({
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
      console.log('loading members');
      const accessToken = localStorage.getItem('access_token');
      const userId = extractUserId(accessToken);
      const loggedInUserResponse = await getOneUser(userId.toString());
      const response = await getAllLocalChurchUsers(
        loggedInUserResponse.data.ChurchId.toString(),
      );

      // update users with their roles
      let updatedMemberList = response.data;
      updatedMemberList.map(async (user: MemberStateData) => {
        const userId = user.id;
        let roleList: string[] = [];
        const userRolesResponse = await getUserRoles(userId.toString());
        console.log(userRolesResponse);
        userRolesResponse.data.map((userRole: any) => {
          roleList.push(userRole.role.name);
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
        const response = await deleteUser(member.toString());
        dispatch(deleteMembers(response.data.id));
      });
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};

export const onAddMember = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = extractUserId(accessToken);
      const loggedInUserResponse = await getOneUser(userId.toString());
      const churchId = loggedInUserResponse.data.ChurchId;
      const response = await addUser(
        email,
        firstName,
        lastName,
        password,
        churchId.toString(),
      );
      const newUserData = response.data;
      newUserData.roles = [];
      dispatch(addMember(newUserData));
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};
