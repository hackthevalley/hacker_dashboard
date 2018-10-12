import { SETSESSION } from '../actions';

const DEFAULT_SESSION = {
  email_address: undefined,
  token_body: undefined,
  rehydrated: false,
}

export const session = (state = DEFAULT_SESSION, action) => {
  switch (action.type) {
    case SETSESSION:
      return {
        ...state,
        email_address: action.email_address,
        token_body: action.token_body,
        rehydrated: true,
      };

    default:
      return state
  }
}
