import { combineReducers } from "redux";
import authReducer from "./authReducer";
import petReducer from "./petReducer";

export default combineReducers({
  auth: authReducer,
  pets: petReducer
});
