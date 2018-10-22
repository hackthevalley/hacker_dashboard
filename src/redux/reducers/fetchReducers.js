import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL} from '../actions';

const DEFAULT_STATE = {
  fetching: false,
  fetchCount: 0
};

export const fetch = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        fetching: true,
        fetchCount: state.fetchCount + 1
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchCount: state.fetchCount - 1
      };

    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        fetchCount: state.fetchCount - 1
      };

    default:
      return state
  }
};