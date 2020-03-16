import { combineReducers } from "redux";
import userReducer from "./actions/userReducer";
import questionReducer from "./actions/questionsReducer";

export default combineReducers({
  user: userReducer,
  question: questionReducer
});
