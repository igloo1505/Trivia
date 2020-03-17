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
import uuid from "uuid";
import axios from "axios";
import setAuthToken from "../setToken";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
export const loadUser = () => async dispatch => {
  console.log("reached loadUser script");
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/auth");
    dispatch({
      type: SET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const setNewUser = user => async dispatch => {
  setLoading();

  try {
    console.log("reached try block");
    const res = await axios.post("/users", user, config);

    dispatch({
      type: REGISTER_ADMIN,
      payload: res
    });
    loadUser();
  } catch (error) {
    console.log("reached catch block");
    dispatch({
      type: USER_ERROR,
      payload: error
    });
  }
};

// export const getSales = () => {
//   return async dispatch => {
//     setLoading();
//     try {
//       const res = await Axios.get("/Sale");

//       dispatch({
//         type: GET_SALES,
//         payload: res.data
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const loginUser = user => async dispatch => {
  try {
    console.log("reached actions as " + user);
    const res = await axios.post("/auth", user, config);
    dispatch({
      type: LOGIN,
      payload: res.data
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.msg
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
export const logOut = () => async dispatch => dispatch({ type: LOGOUT });
