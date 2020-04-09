import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  SET_RESULT,
  PLAY_ERROR,
  PLAY_LOADING,
  NEXT_QUESTION,
  GAME_FINISH,
  CLEAR_PLAY,
} from "../Types";
import store from "../../store";
import { browserHistory } from "react-router";

const initialState = {
  questionArray: null,
  score: 0,
  active: null,
  totalCorrect: [],
  totalIncorrect: [],
  totalQuestions: null,
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
      browserHistory.push("/leaderboard");
      return {
        ...state,
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

    case PLAY_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
