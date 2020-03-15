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
import setAuth from "../setToken";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const setNewUser = user => async dispatch => {
  setLoading();

  console.log("reached function");
  console.log(user);
  try {
    console.log("reached try block");
    const res = await axios.post("/users", user, config);
    console.log(res);
    dispatch({
      type: REGISTER_ADMIN,
      payload: res.data
    });
  } catch (error) {
    console.log("reached catch block");
    dispatch({
      type: USER_ERROR,
      payload: error.response.message
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

const loadUser = () => async dispatch => {
  setAuth(localStorage.token);
  try {
    const res = await axios.get("/auth");
    dispatch({
      type: AUTHENTICATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: USER_ERROR });
  }
};

const loginUser = user => async dispatch => {
  try {
    const res = await axios.post("/auth", user, config);
    dispatch({
      type: LOGIN,
      payload: res.data
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.data.msg
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
export const logoutUser = () => async dispatch => dispatch({ type: LOGOUT });
