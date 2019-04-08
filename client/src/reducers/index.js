import { combineReducers } from "redux";
import authReducer from "./authReducer";
import petReducer from "./petReducer";
import serviceReducer from "./serviceReducer";
import bidReducer from "./bidReducer";

export default combineReducers({
  auth: authReducer,
  pets: petReducer,
  services: serviceReducer,
  bids: bidReducer
});
