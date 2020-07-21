import { AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { errorDataExtractor } from '../../shared/helper_functions';
import { AuthStateActions } from '.';
import { secretIp } from '../../../secrets/secretStuff';
import { getAllUsers } from '../apis/users';
import {
  MemberActionTypes,
  LOAD_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBERS,
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

//action creators or THUNKS
export const onLoadMembers = (token: string): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const response = await getAllUsers(token);
      console.log(response.data);
      dispatch(loadMembers(response.data));
    } catch (error) {
      const errorData = errorDataExtractor(error);
      dispatch(AuthStateActions.Error(errorData));
    }
  };
};
