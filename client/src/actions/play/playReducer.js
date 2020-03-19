import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  SET_RESULT,
  PLAY_ERROR,
  PLAY_LOADING,
  NEXT_QUESTION,
  CLEAR_PLAY
} from "../Types";
import store from "../../store";

const initialState = {
  questionArray: null,
  score: null,
  active: null,
  totalCorrect: [],
  totalIncorrect: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYSTATE:
      console.log("add Toast here to make sure enough questions");
      return {
        ...state,
        questionArray: action.payload,
        active: action.payload[0],
        loading: false
      };
    case CORRECT_ANSWER:
      let newArray = state.questionArray.filter(
        que => que._id !== action.payload._id
      );
      return {
        ...state,
        totalCorrect: [action.payload, ...state.totalCorrect],
        questionArray: state.questionArray.filter(
          que => que._id !== action.payload._id
        ),
        active: newArray[0],
        loading: false
      };

    case WRONG_ANSWER:
      return {
        ...state,
        totalIncorrect: [action.payload, ...state.totalIncorrect],
        questionArray: state.questionArray.filter(
          que => que._id !== action.payload._id
        ),
        loading: false
      };

    case PLAY_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
