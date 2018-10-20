import { GETME_SUCCESS, UPDATEME_SUCCESS, CREATEHACKERAPPLICATION_SUCCESS } from '../actions';

const DEFAULT_STATE = {
  me: undefined,
}

export const hackers = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GETME_SUCCESS:
      return {
        ...state,
        me: action.hacker,
      };

    case UPDATEME_SUCCESS:
      return {
        ...state,
        me: action.hacker,
      };

    case CREATEHACKERAPPLICATION_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          applications: [
            ...state.me.applications,
            action.application,
          ],
        },
      };

    default:
      return state
  }
}
