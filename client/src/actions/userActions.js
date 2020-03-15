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
import uuid from "uuid";
import Axios from "axios";

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
    const res = await Axios.post("/users", user, config);
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

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
