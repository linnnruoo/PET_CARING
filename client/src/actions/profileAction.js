import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_ERRORS,
  PROFILE_LOADING
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getUserProfileById = userId => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/user/profile/${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER_PROFILE,
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

export const updateUserProfile = (userId, userInfo) => dispatch => {
  axios
    .patch(`/api/user/profile/${userId}`, userInfo)
    .then(res => {
      toast("Updated your profile successfully!");
      dispatch({
        type: UPDATE_USER_PROFILE,
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
