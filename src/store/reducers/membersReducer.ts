import {
  MemberActionTypes,
  LOAD_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBERS,
  LOAD_USER,
  MembersState,
} from '../types';

const initialState: MembersState = {
  members: [],
  selectedUser: {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    church: { name: '' },
    roles: [],
  },
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
    case LOAD_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};
