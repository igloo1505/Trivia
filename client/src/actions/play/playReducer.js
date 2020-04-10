import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  SET_RESULT,
  PLAY_ERROR,
  PLAY_LOADING,
  RESET_GAME_FINISH,
  NEXT_QUESTION,
  GAME_FINISH,
  CLEAR_PLAY,
  GET_LEADERS,
  SET_LEADER,
} from "../Types";
import store from "../../store";
import { browserHistory } from "react-router";
import { Route, Redirect } from "react-router-dom";

const initialState = {
  leaders: [],
  questionArray: null,
  score: 0,
  active: null,
  totalCorrect: [],
  totalIncorrect: [],
  totalQuestions: null,
  gameEnd: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYSTATE:
      console.log("add Toast here to make sure enough questions");

      return {
        ...state,
        questionArray: action.payload,
        active: action.payload[0],
        totalQuestions: action.payload.length,
        score: 0,
        totalCorrect: [],
        totalIncorrect: [],
        totalQuestions: null,
        gameEnd: false,
        loading: false,
      };
    case CORRECT_ANSWER:
      let newArray = state.questionArray.filter(
        (que) => que._id !== action.payload._id
      );
      console.log("total count at ", state.totalQuestions);
      console.log("score is ", state.score);
      return {
        ...state,
        totalCorrect: [action.payload, ...state.totalCorrect],
        questionArray: state.questionArray.filter(
          (que) => que._id !== action.payload._id
        ),
        score: state.score + action.payload.difficulty,
        active: newArray[0],
        totalQuestions: state.totalQuestions + 1,
        loading: false,
      };

    case GAME_FINISH:
      return {
        ...state,
        gameEnd: true,
        loading: false,
      };

    case RESET_GAME_FINISH:
      return {
        ...state,
        gameEnd: false,
        loading: false,
      };

    case WRONG_ANSWER:
      return {
        ...state,
        totalIncorrect: [action.payload, ...state.totalIncorrect],
        questionArray: state.questionArray.filter(
          (que) => que._id !== action.payload._id
        ),
        loading: false,
      };
    case SET_LEADER:
      return {
        ...state,
        leaders: [action.payload, ...state.leaders],
        loading: false,
      };

    case PLAY_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
