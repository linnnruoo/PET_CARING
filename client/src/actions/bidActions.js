import {
  CREATE_NEW_BID_OF_A_SERVICE,
  BID_LOADING,
  FETCH_BIDS_OF_OWNER,
  FETCH_BIDS_OF_SERVICE,
  UPDATE_BID_INFO,
  GET_BID_STATS_OF_SERVICE,
  GET_ERRORS,
  FETCH_BIDS_OF_CARETAKER,
  ACCEPT_BID,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const setBidLoading = () => {
  return {
    type: BID_LOADING
  };
};

export const createNewBid = newBidInfo => dispatch => {
  axios
    .post(`/api/bids/`, newBidInfo)
    .then(res => {
      dispatch({
        type: CREATE_NEW_BID_OF_A_SERVICE,
        payload: res.data
      });
      if (res.data.success === 200) toast("New Bid Created!");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateBidInfo = bidInfo => async dispatch => {
  await axios
    .patch("/api/bids/update", bidInfo)
    .then(res => {
      dispatch({
        type: UPDATE_BID_INFO,
        payload: res.data
      });
      toast("updated!");
      dispatch(fetchBidsOfService(bidInfo.serviceId));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchBidsOfOwner = ownerId => dispatch => {
  dispatch(setBidLoading());
  axios
    .get(`/api/bids/owner/${ownerId}`)
    .then(res => {
      dispatch({
        type: FETCH_BIDS_OF_OWNER,
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

// get all the bids of a particular service
export const fetchBidsOfService = serviceId => dispatch => {
  dispatch(setBidLoading());
  axios
    .get(`/api/bids/on/${serviceId}`)
    .then(res => {
      dispatch({
        type: FETCH_BIDS_OF_SERVICE,
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

// fetch all thee bids then group by services
export const fetchBidsOfCaretaker = caretakerId => dispatch => {
  dispatch(setBidLoading());
  axios
    .get(`/api/bids/by/${caretakerId}`)
    .then(res => {
      dispatch({
        type: FETCH_BIDS_OF_CARETAKER,
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

export const fetchBidStatOfService = serviceId => dispatch => {
  dispatch(setBidLoading());
  axios
    .get(`/api/bids/stat/${serviceId}`)
    .then(res => {
      dispatch({
        type: GET_BID_STATS_OF_SERVICE,
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

export const acceptBid = (ownerId, serviceId) => dispatch => {
  axios
    .patch('/api/bids/accept', {ownerId, serviceId})
    .then(res => {
      if (res.data.success) toast.success("You have accepted a bid for this service!");

      dispatch({
        type: ACCEPT_BID,
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
