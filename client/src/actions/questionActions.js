import {
  GET_LEADERS,
  SET_LEADER,
  SET_LOADING,
  AUTHENTICATED,
  ADD_QUESTION,
  GET_QUESTIONS,
  QUESTION_ERROR,
  DELETE_QUESTION,
  EDIT_QUESTION
} from "./Types";
import axios from "axios";
import store from "../store";
import setAuth from "../setToken";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const addQuestion = question => async dispatch => {
  let state = store.getState();
  console.log(question);

  setLoading();
  console.log("reached addquestion script as " + question);
  try {
    const res = await axios.post("/questions", question, config);
    console.log("res", res);
    dispatch({
      type: ADD_QUESTION,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: QUESTION_ERROR,
      payload: error.msg
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
