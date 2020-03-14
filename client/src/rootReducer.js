import { combineReducers } from "redux";
import userReducer from "./actions/userReducer";
// import employeeReducer from "./employeeReducer";

export default combineReducers({
  user: userReducer
});
