import { combineReducers } from "redux";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  userReducer,
  chatReducer,
});