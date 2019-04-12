import {
  CREATE_NEW_SERVICE,
  FETCH_CARETAKER_SERVICES,
  SERVICE_LOADING,
  FILTER_SERVICES,
  GET_SINGLE_SERVICE,
  GET_ERRORS,
  GET_POTENTIAL_INCOME,
  GET_CURRENT_INCOME,
  GET_SERVICE_STATUS,
  GET_FILTER_PAGE,
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

export const getPotentialIncome = caretakerId => dispatch => {
  dispatch(setServiceLoading());
  axios
    .get(`/api/services/by/${caretakerId}/potential`)
    .then(res => {
      dispatch({
        type: GET_POTENTIAL_INCOME,
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

export const getCurrentIncome = caretakerId => dispatch => {
  dispatch(setServiceLoading());
  axios
    .get(`/api/services/by/${caretakerId}/current`)
    .then(res => {
      dispatch({
        type: GET_CURRENT_INCOME,
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

export const getServiceStatus = serviceId => dispatch => {
  dispatch(setServiceLoading());
  axios
    .get(`/api/services/status/${serviceId}`)
    .then(res => {
      dispatch({
        type: GET_SERVICE_STATUS,
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

export const filterServices = (pageNum, filterInfo) => dispatch => {
  dispatch(setServiceLoading());
  axios
    .post(`/api/services/filter/${pageNum}`, filterInfo)
    .then(res => {
      dispatch({
        type: FILTER_SERVICES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const getServicePageNumber = (filterInfo) => dispatch => {
  dispatch(setServiceLoading());
  axios
    .post(`/api/services/filter`, filterInfo)
    .then(res => {
      dispatch({
        type: GET_FILTER_PAGE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}