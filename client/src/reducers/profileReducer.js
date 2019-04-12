import { GET_USER_PROFILE, UPDATE_USER_PROFILE, PROFILE_LOADING, GET_ALL_TAKERS } from "../actions/types";

const initialState = {
  userProfile: {},
  allCaretakers: [],
  loading: false,
  currentCaretakerRating : 0
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
        userProfile: {
          ...action.payload
        },
        loading: false
      }
    case PROFILE_LOADING: 
      return {
        ...state,
        loading: true
      }
    case GET_ALL_TAKERS:
      return {
        ...state,
        loading: false,
        allCaretakers: action.payload
      }
    case GET_ALL_TAKERS:
      return {
        ...state,
        loading: false,
        GET_CARETAKER_RATING: action.payload
      }
    default:
      return state;
  }
}
