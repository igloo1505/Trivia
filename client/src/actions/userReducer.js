import {
  GET_LEADERS,
  SET_LEADER,
  SET_ADMIN,
  GET_ADMIN,
  SET_USER,
  SET_LOADING,
  USER_ERROR,
  LOGIN,
  REGISTER_ADMIN,
  LOGOUT,
  AUTHENTICATED
} from "./Types";
import { loadUser } from "./userActions";
import setAuthToken from "../setToken";

const initialState = {
  loggedIn: false,
  token: localStorage.getItem("token"),
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
      setAuthToken(action.payload.data);
      return {
        ...state,
        loggedIn: true,
        user: JSON.parse(action.payload.config.data),
        loading: false
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loading: false
      };
    case LOGIN:
      console.log("logged in Reducer reached");
      localStorage.setItem("token", action.payload.token);
      loadUser();
      return {
        ...state,
        ...action.payload,
        loggedIn: true,
        loading: false
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        user: null,
        admin: false,
        loading: false
      };

    case AUTHENTICATED:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
