import localforage from 'localforage';
import htv from 'htv-sdk';
import HttpRequestError from '../../errors/HttpRequestError';

export const SETSESSION = 'SETSESSION';
export const CREATEHACKERTOKEN_FAIL = 'CREATEHACKERTOKEN_FAIL';
export const CREATEHACKERTOKEN_SUCCESS = 'CREATEHACKERTOKEN_SUCCESS';
export const CREATEHACKER_FAIL = 'CREATEHACKER_FAIL';
export const CREATEHACKER_SUCCESS = 'CREATEHACKER_SUCCESS';

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

export function createHackerTokenAction(email_address, password) {
  return async (dispatch) => {
    try {
      const token_body = await htv.Hacker.createToken(email_address, password);
      await Promise.all([
        localforage.setItem('email_address', email_address),
        localforage.setItem('token_body', token_body),
      ]);
      return dispatch({
        type: CREATEHACKERTOKEN_SUCCESS,
        email_address,
        token_body,
      });
    } catch (error) {
      return dispatch({
        type: CREATEHACKERTOKEN_FAIL,
        error: new HttpRequestError(error.graphQLErrors.map(err => err.message)),
      });
    }
  }
}

export function createHackerAction(email_address, password) {
  return async (dispatch) => {
    try {
      const token_body = await htv.Hacker.create(email_address, password);
      return Promise.all([
        dispatch({
          type: CREATEHACKER_SUCCESS,
          email_address,
          token_body,
        }),
        dispatch(createHackerTokenAction(email_address, password)),
      ]);
    } catch (error) {
      return dispatch({
        type: CREATEHACKER_FAIL,
        error: new HttpRequestError(error.graphQLErrors.map(err => err.message)),
      });
    }
  }
}
