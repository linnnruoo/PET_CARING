import {
  CREATE_NEW_BID_OF_A_SERVICE,
  BID_LOADING,
  FETCH_BIDS_OF_OWNER,
  FETCH_BIDS_OF_SERVICE,
  UPDATE_BID_INFO,
  GET_BID_STATS_OF_SERVICE,
  FETCH_BIDS_OF_CARETAKER,
  ACCEPT_BID,
} from "../actions/types";

const initialState = {
  bidsOfService: [],
  bidStatOfService: [],
  bidsOfOwner: [],
  bidsOfCaretaker: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BID_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_BIDS_OF_SERVICE:
      return {
        ...state,
        bidsOfService: action.payload.bids,
        loading: false
      };
    case CREATE_NEW_BID_OF_A_SERVICE:
      return {
        ...state,
        bidsOfService: [...state.bidsOfService, action.payload.bid],
        loading: false
      };
    case FETCH_BIDS_OF_OWNER: // list of the bids with their status
      return {
        ...state,
        bidsOfOwner: action.payload.bids,
        loading: false
      };
    case UPDATE_BID_INFO:
      return {
        ...state,
        loading: false
      };
    case FETCH_BIDS_OF_CARETAKER:
      return {
        ...state,
        bidsOfCaretaker: action.payload.bids,
        loading: false
      };
    case GET_BID_STATS_OF_SERVICE:
      return {
        ...state,
        bidStatOfService: action.payload.bidStat[0],
        loading: false
      }
    case ACCEPT_BID:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};
