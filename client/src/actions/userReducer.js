import {
  SET_USER,
  SET_LOADING,
  EDIT_ACCESS,
  LOGIN,
  REGISTER_ADMIN,
  CHANGE_VIEW,
  LOGOUT,
  AUTHENTICATED,
} from "./Types";
import { loadUser } from "./userActions";
import setAuthToken from "../setToken";

const initialState = {
  loggedIn: false,
  token: localStorage.getItem("token"),
  leaders: null,
  loading: false,

  menuKey: "Submit",
  admin: false,
  organization: {
    organizationName: null,
    organizationUserPassword: null,
    displayName: null,
    organizationTime: null,
  },
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_VIEW:
      return {
        ...state,
        menuKey: action.payload,
      };

    case REGISTER_ADMIN:
      const { token, user } = action.payload;
      setAuthToken(token);

      localStorage.setItem("token", token);
      return {
        ...state,
        loggedIn: true,
        user: user,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loading: false,
      };
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      loadUser();
      return {
        ...state,
        user: action.payload.user,
        organization: action.payload.orgReturn,
        loggedIn: true,
        loading: false,
      };

    case EDIT_ACCESS:
      return {
        ...state,
        organization: action.payload,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        user: null,
        admin: false,
        loading: false,
      };

    case AUTHENTICATED:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
