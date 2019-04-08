import {
  CREATE_NEW_SERVICE,
  FETCH_CARETAKER_SERVICES,
  SERVICE_LOADING,
  FILTER_SERVICES,
  GET_SINGLE_SERVICE
} from "../actions/types";

const initialState = {
  currentService: {},
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
    case GET_SINGLE_SERVICE:
      return {
        ...state,
        currentService: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
