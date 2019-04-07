import {
  CREATE_NEW_PET,
  GET_PET_TYPES,
  GET_BREEDS,
  FETCH_OWNER_PETS,
  PETS_LOADING,
  GET_ERRORS,
  DELETE_PET,
  UPDATE_PET
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const setPetLoading = () => {
  return {
    type: PETS_LOADING
  };
};

// create new pet
export const createNewPet = newPetInfo => dispatch => {
  axios
    .post("/api/pets/create", newPetInfo)
    .then(res => {
      dispatch({
        type: CREATE_NEW_PET,
        payload: res.data
      });
      if (res.status === 200) toast("New Pet Added!");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPetTypes = () => dispatch => {
  dispatch(setPetLoading());
  axios
    .get("/api/pettypes")
    .then(res => {
      dispatch({
        type: GET_PET_TYPES,
        payload: res.data.petTypes
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPetBreedsAll = () => dispatch => {
  dispatch(setPetLoading());
  axios
    .get("/api/petbreeds")
    .then(res => {
      dispatch({
        type: GET_BREEDS,
        payload: res.data.petBreeds
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deletePet = petInfo => async dispatch => {
  await axios
    .delete("/api/pets/delete", { data: petInfo })
    .then(res => {
      dispatch({
        type: DELETE_PET,
        payload: res.data
      });
      dispatch(fetchPetsOfOwner(petInfo.ownerId));
      if (res.data.deleted) toast("Deleted!");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updatePet = petInfo => async dispatch => {
  console.log(petInfo);
  await axios
    .patch("/api/pets/update", petInfo)
    .then(res => {
      dispatch({
        type: UPDATE_PET,
        payload: res.data
      });
      toast("Updated!");

      dispatch(fetchPetsOfOwner(petInfo.ownerId));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const fetchPetsOfOwner = ownerId => dispatch => {
  dispatch(setPetLoading());
  axios
    .get(`/api/pets/${ownerId}`)
    .then(res => {
      dispatch({
        type: FETCH_OWNER_PETS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
