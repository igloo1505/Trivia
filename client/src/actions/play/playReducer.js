import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_PLAYSTATE,
  PLAY_LOADING,
  RESET_GAME_FINISH,
  GAME_FINISH,
  GET_LEADERS,
  SET_LEADER,
} from "../Types";

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
      return {
        ...state,
        questionArray: action.payload,
        score: 0,
        active: action.payload[0],
        totalCorrect: [],
        totalIncorrect: [],
        totalQuestions: action.payload.length,
        gameEnd: false,
        loading: false,
      };
    case CORRECT_ANSWER:
      let newArray = state.questionArray.filter(
        (que) => que._id !== action.payload._id
      );

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
        score: state.score - 100,
        totalIncorrect: [action.payload, ...state.totalIncorrect],
        questionArray: state.questionArray.filter(
          (que) => que._id !== action.payload._id
        ),
        loading: false,
      };
    case GET_LEADERS:
      return {
        ...state,
        leaders: action.payload,
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
