import {
  MemberActionTypes,
  MemberStateData,
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
    disabled: false,
    roles: [],
  },
  localChurch: '',
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
        localChurch: `${action.church} Church`,
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case DELETE_MEMBERS:
      let newMemberList = [...state.members];
      newMemberList = newMemberList.filter((member) => member.id !== action.payload);
      console.log(action.payload);
      return {
        ...state,
        members: newMemberList,
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
