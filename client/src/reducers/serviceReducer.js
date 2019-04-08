import {
  CREATE_NEW_SERVICE,
  FETCH_CARETAKER_SERVICES,
  SERVICE_LOADING,
  FILTER_SERVICES
} from "../actions/types";

const initialState = {
  filteredServices: [],
  userServices: [],
  pastServices: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_SERVICE:
      return {
        ...state,
        userServices: [...state.userServices, action.payload.service],
        loading: false
      };
    case FETCH_CARETAKER_SERVICES:
      return {
        ...state,
        userServices: action.payload.services,
        loading: false
      };
    case FILTER_SERVICES:
      return {
        ...state,
        filteredServices: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
