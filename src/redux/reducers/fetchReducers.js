import { FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL } from '../actions';

const DEFAULT_STATE = {
    fetching: false
};

export const fetch = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_LOADING:
            return {
                ...state,
                fetching: true
            };

        case FETCH_SUCCESS:
            return {
                ...state,
                fetching: false
            };

        case FETCH_FAIL:
            return {
                ...state,
                fetching: false
            };

        default:
            return state
    }
};