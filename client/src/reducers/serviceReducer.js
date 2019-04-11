import {
  CREATE_NEW_SERVICE,
  FETCH_CARETAKER_SERVICES,
  SERVICE_LOADING,
  FILTER_SERVICES,
  GET_SINGLE_SERVICE,
  GET_POTENTIAL_INCOME,
  GET_CURRENT_INCOME
} from "../actions/types";

const initialState = {
  currentService: {},
  filteredServices: [],
  userServices: [],
  pastServices: [],
  potentialIncome: 0,
  currentIncome: 0,
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
        currentService: action.payload.service,
        loading: false
      };
    case GET_POTENTIAL_INCOME: // ugly
      return {
        ...state,
        potentialIncome: action.payload.potentialIncome,
        loading: false
      };
    case GET_CURRENT_INCOME: // ugly
      return {
        ...state,
        currentIncome: action.payload.currentIncome,
        loading: false
      };
    default:
      return state;
  }
};
