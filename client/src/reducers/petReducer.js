import {
  CREATE_NEW_PET,
  GET_PET_TYPES,
  GET_BREEDS,
  FETCH_OWNER_PETS,
  PETS_LOADING,
  DELETE_PET,
  UPDATE_PET
} from "../actions/types";

const initialState = {
  userPets: [],
  breeds: [],
  petTypes: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PETS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_PET:
      return {
        ...state,
        userPets: [...state.userPets, action.payload],
        loading: false
      };
    case FETCH_OWNER_PETS:
      return {
        ...state,
        userPets: action.payload,
        loading: false
      };
    case GET_PET_TYPES:
      return {
        ...state,
        petTypes: action.payload,
        loading: false
      };
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        loading: false
      };
    case DELETE_PET:
      return {
        ...state,
        loading: false
      };
    case UPDATE_PET:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
