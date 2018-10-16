import { GETEVENTS_SUCCESS } from '../actions';

const DEFAULT_STATE = {
    allEvents: [],
};

export const events = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GETEVENTS_SUCCESS:
            return {
                ...state,
                allEvents: action.events,
            };
        default:
            return state
    }
};
