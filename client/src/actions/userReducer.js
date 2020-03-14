import {
  GET_LEADERS,
  SET_LEADER,
  SET_ADMIN,
  GET_ADMIN,
  SET_USER,
  SET_LOADING,
  USER_ERROR,
  REGISTER_ADMIN,
  LOGOUT
} from "./Types";

const initialState = {
  loggedIn: false,
  leaders: null,
  loading: false,
  admin: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LEADERS:
      return {
        ...state,
        leaders: action.payload,
        loading: false
      };
    case REGISTER_ADMIN:
      return {
        ...state,
        loggedIn: true,
        admin: true,
        user: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loading: false
      };

    default:
      return state;
  }
};
