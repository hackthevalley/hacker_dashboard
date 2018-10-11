import localforage from 'localforage';

export const SETSESSION = 'SETSESSION';

export function setSessionAction(email_address, token_body) {
  return {
    type: SETSESSION,
    email_address,
    token_body,
  };
}

export function logoutAction() {
  return async (dispatch) => {
    await Promise.all([
      localforage.setItem('email_address', undefined),
      localforage.setItem('token_body', undefined),
    ]);
    return dispatch({
      type: SETSESSION,
      email_address: undefined,
      token_body: undefined,
    })
  };
}
