import { combineReducers } from "redux";
import authReducer from "./authReducer";
import petReducer from "./petReducer";
import serviceReducer from "./serviceReducer";
import bidReducer from "./bidReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  pets: petReducer,
  services: serviceReducer,
  bids: bidReducer,
  profile: profileReducer,
});
