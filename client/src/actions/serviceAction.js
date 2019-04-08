import {
  CREATE_NEW_SERVICE,
  FETCH_CARETAKER_SERVICES,
  SERVICE_LOADING,
  FILTER_SERVICES,
  GET_SINGLE_SERVICE,
  GET_ERRORS
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const setServiceLoading = () => {
  return {
    type: SERVICE_LOADING
  };
};

export const createNewService = newServiceInfo => dispatch => {
  axios
    .post("/api/services/", newServiceInfo)
    .then(res => {
      dispatch({
        type: CREATE_NEW_SERVICE,
        payload: res.data
      });
      if (res.data === 200) toast("New Service Added!");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchServicesOfCaretaker = caretakerId => dispatch => {
  dispatch(setServiceLoading());
  axios
    .get(`/api/services/by/${caretakerId}`)
    .then(res => {
      dispatch({
        type: FETCH_CARETAKER_SERVICES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getServiceInfo = serviceId => dispatch => {
  dispatch(setServiceLoading());
  axios
    .get(`/api/services/${serviceId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_SERVICE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
