import { CREATEHACKERTOKEN_SUCCESS, SETSESSION } from '../actions';

const DEFAULT_SESSION = {
  email_address: undefined,
  token_body: undefined,
}

export const session = (state = DEFAULT_SESSION, action) => {
  switch (action.type) {
    case CREATEHACKERTOKEN_SUCCESS:
      return {
        ...state,
        email_address: action.email_address,
        token_body: action.token_body,
      };

    case SETSESSION:
      return {
        ...state,
        email_address: action.email_address,
        token_body: action.token_body,
      };

    default:
      return state
  }
}
