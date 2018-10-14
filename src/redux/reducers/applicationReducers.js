import { GETAPPLICATIONS_SUCCESS } from '../actions';

const DEFAULT_STATE = {
    allApplications: [],
};

export const applications = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GETAPPLICATIONS_SUCCESS:
            return {
                ...state,
                allApplications: action.applications,
            };
        default:
            return state
    }
};
