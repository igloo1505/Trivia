import {
  GET_LEADERS,
  SET_LEADER,
  SET_LOADING,
  AUTHENTICATED,
  ADD_QUESTION,
  GET_QUESTIONS,
  QUESTION_ERROR,
  DELETE_QUESTION,
  ADD_IMAGE,
  EDIT_QUESTION,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./Types";
import axios from "axios";
import setAuth from "../setToken";

const initialState = {
  questions: null,
  current: null,
  imageHolder: null,
  filtered: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case ADD_QUESTION:
      console.log("payload received as :", action.payload);
      const { addQuestion } = action.payload;
      return {
        ...state,
        questions: [addQuestion, ...state.questions],
        imageHolder: null,
        loading: false,
      };

    case QUESTION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: state.questions.filter((que) => que._id == action.payload),
        loading: false,
      };
    case ADD_IMAGE:
      return {
        ...state,
        imageHolder: action.payload,
        loading: false,
      };
    case EDIT_QUESTION:
      return {
        ...state,
        current: null,
        questions: state.questions.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
        loading: false,
      };
    case DELETE_QUESTION: {
      return {
        ...state,
        questions: state.questions.filter((que) => que._id !== action.payload),
        current: null,
        loading: false,
      };
    }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };

    default:
      return state;
  }
};
