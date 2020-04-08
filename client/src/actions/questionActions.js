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
  CLEAR_IMAGE,
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
  console.log("question added as", question);

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
    let finalArray = [];

    for (var i = 0; i < res.data.length; i++) {
      if ("imageHolder" in res.data[i]) {
        const ref = firebase.storage().ref(res.data[i].imageHolder);
        const url = await ref.getDownloadURL();
        res.data[i].imgUrl = url;
        finalArray.push(res.data[i]);
      } else finalArray.push(res.data[i]);
    }
    console.log("res with questions after calcs ", res);

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
export const clearImageState = () => async (dispatch) => {
  dispatch({
    type: CLEAR_IMAGE,
  });
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
