import { GET_USER_PROFILE, UPDATE_USER_PROFILE, PROFILE_LOADING } from "../actions/types";

const initialState = {
  userProfile: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      }
    case PROFILE_LOADING: 
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
