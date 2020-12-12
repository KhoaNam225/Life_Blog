import * as types from "../constants/user.constants";

const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload
      }
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default userReducer;
