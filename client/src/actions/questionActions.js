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
  ADD_IMAGE,
  EDIT_QUESTION,
  CLEAR_CURRENT,
} from "./Types";
import axios from "axios";
import store from "../store";
import firebase from "../firebase";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addQuestion = (question) => async (dispatch) => {
  console.log(question);

  setLoading();
  console.log("reached addQuestion script as " + question);
  try {
    const res = await axios.post("/questions", question, config);
    console.log("res", res);
    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: err,
    });
  }
};
export const getQuestions = (reference) => async (dispatch) => {
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
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await axios.delete(`/questions/${id}`);
    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_ERROR,
      payload: error,
    });
  }
};
export const addImage = (image, questionID) => async (dispatch) => {
  debugger;
  var storage = firebase.storage().ref();
  var imageRef = storage.child(questionID);
  try {
    await imageRef.put(image).then(function (snapshot) {
      console.log("Uploaded");
    });
    dispatch({
      type: ADD_IMAGE,
      payload: questionID,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_ERROR,
      payload: error,
    });
  }
};

export const editQuestion = (id, question) => async (dispatch) => {
  try {
    const res = await axios.put(`/questions/${id}`, question, config);
    dispatch({
      type: EDIT_QUESTION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_ERROR,
      payload: error,
    });
  }
};

export const setCurrent = (id) => (dispatch) => {
  dispatch({ type: SET_CURRENT, payload: id });
};
export const clearCurrent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
