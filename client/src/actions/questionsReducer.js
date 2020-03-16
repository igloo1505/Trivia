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
import setAuth from "../setToken";

const initialState = {
  questions: null,
  current: null,
  filtered: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
        loading: false
      };

    default:
      return state;
  }
};
