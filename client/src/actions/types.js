export const GET_ERRORS = "GET_ERRORS";

// user types
export const SET_CURRENT_USER = "SET_CURRENT_USER";

// pet types
export const FETCH_OWNER_PETS = "FETCH_OWNER_PETS";
export const CREATE_NEW_PET = "CREATE_NEW_PET";
export const GET_BREEDS = "GET_BREEDS";
export const GET_PET_TYPES = "GET_PET_TYPES";
export const PETS_LOADING = "PETS_LOADING_MEOW";
export const DELETE_PET = "DELETE_PET";
export const UPDATE_PET = "UPDATE_PET";

// services types
export const FETCH_CARETAKER_SERVICES = "FETCH_CARETAKER_SERVICES";
export const SERVICE_LOADING = "SERVICE_LOADING";
export const CREATE_NEW_SERVICE = "CREATE_NEW_SERVICE";
export const FILTER_SERVICES = "FILTER_SERVICES";
export const GET_SINGLE_SERVICE = "GET_SINGLE_SERVICE";
// todo: all the bids of all the services of the caretaker, group by services

// bid
export const CREATE_NEW_BID_OF_A_SERVICE = "CREATE_NEW_BID_OF_A_SERVICE";
export const FETCH_BIDS_OF_SERVICE = "FETCH_BIDS_OF_SERVICE"; // get all bids under this service
export const UPDATE_BID_INFO = "UPDATE_BID_INFO"; // for owner
export const GET_BID_STATS_OF_SERVICE = "GET_BID_STATS_OF_SERVICE";
export const FETCH_BIDS_OF_OWNER = "FETCH_BIDS_OF_OWNER"; // get all bids made by this owner
export const BID_LOADING = "BID_LOADING";
export const FETCH_BIDS_OF_CARETAKER = "FETCH_BIDS_OF_CARETAKER";
