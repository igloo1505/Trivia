import { combineReducers } from "redux";
import userReducer from "./actions/userReducer";
import questionReducer from "./actions/questionsReducer";
import playReducer from "./actions/play/playReducer";

export default combineReducers({
  user: userReducer,
  question: questionReducer,
  play: playReducer
});
