import {
  MemberActionTypes,
  LOAD_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBERS,
  MembersState,
} from '../types';

const initialState: MembersState = {
  members: [],
};

export const membersReducer = (
  state = initialState,
  action: MemberActionTypes,
): MembersState => {
  switch (action.type) {
    case LOAD_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: action.payload,
      };
    case DELETE_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    default:
      return state;
  }
};
