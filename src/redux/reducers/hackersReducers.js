import { GETME_SUCCESS, UPDATEME_SUCCESS } from '../actions';

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

    default:
      return state
  }
}
