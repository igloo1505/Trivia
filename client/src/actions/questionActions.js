import {
  GET_LEADERS,
  SET_LEADER,
  SET_LOADING,
  AUTHENTICATED,
  ADD_QUESTION,
  GET_QUESTIONS,
  QUESTION_ERROR,
  SET_CURRENT,
  DELETE_QUESTION,
  EDIT_QUESTION,
  CLEAR_CURRENT
} from "./Types";
import axios from "axios";
import store from "../store";
import setAuth from "../setToken";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
let state = store.getState();

export const addQuestion = question => async dispatch => {
  console.log(question);

  setLoading();
  console.log("reached addQuestion script as " + question);
  try {
    const res = await axios.post("/questions", question, config);
    console.log("res", res);
    dispatch({
      type: ADD_QUESTION,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err
    });
  }
};
export const getQuestions = reference => async dispatch => {
  console.log("calling getQuestions");
  try {
    const res = await axios.get(`/questions/${reference}`);
    console.log("res with questions: ", res);
    dispatch({ type: GET_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: QUESTION_ERROR, payload: err });
  }
};

export const setCurrent = id => dispatch => {
  dispatch({ type: SET_CURRENT, payload: id });
};
export const clearCurrent = () => dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
