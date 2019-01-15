import localforage from 'localforage';
import htv from '@hackthevalley/sdk';
import HttpRequestError from '../../errors/HttpRequestError';
import { FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL } from '.';

export const SETSESSION = 'SETSESSION';
export const CREATEHACKERTOKEN_FAIL = 'CREATEHACKERTOKEN_FAIL';
export const CREATEHACKERTOKEN_SUCCESS = 'CREATEHACKERTOKEN_SUCCESS';
export const CREATEHACKER_FAIL = 'CREATEHACKER_FAIL';
export const CREATEHACKER_SUCCESS = 'CREATEHACKER_SUCCESS';

export function setSessionAction(email_address, token_body) {
  return async (dispatch) => {
    htv.setAuthenticationToken(token_body);
    await Promise.all([
      localforage.setItem('email_address', email_address),
      localforage.setItem('token_body', token_body),
    ]);
    return dispatch({
      type: SETSESSION,
      email_address,
      token_body,
    });
  }
}

export const logoutAction = setSessionAction.bind(null, undefined, undefined)

export function createHackerTokenAction(email_address, password) {
  return async (dispatch) => {
    try {
      const promise = htv.Hacker.createToken(email_address, password);
      dispatch({ type: FETCH_LOADING, promise });
      const token_body = await promise;
      return Promise.all([
        dispatch(setSessionAction(email_address, token_body)),
        dispatch({ type: CREATEHACKERTOKEN_SUCCESS }),
        dispatch({ type: FETCH_SUCCESS }),
      ]);
    } catch (err) {
      const errorCodes = err.graphQLErrors
        ? err.graphQLErrors.map(err => err.message)
        : err.errorCodes;
      const error = new HttpRequestError(errorCodes);
      return Promise.all([
        dispatch({ type: CREATEHACKERTOKEN_FAIL, error }),
        dispatch({ type: FETCH_FAIL, error }),
      ]);
    }
  }
}

export function createHackerAction(email_address, password) {
  return async (dispatch) => {
    try {
      const promise = htv.Hacker.create(email_address, password);
      dispatch({ type: FETCH_LOADING, promise });
      const hacker_id = await promise;
      return Promise.all([
        dispatch(createHackerTokenAction(email_address, password)),
        dispatch({ type: CREATEHACKER_SUCCESS, hacker_id }),
        dispatch({ type: FETCH_SUCCESS }),
      ]);
    } catch (err) {
      const errorCodes = err.graphQLErrors
        ? err.graphQLErrors.map(err => err.message)
        : err.errorCodes;
      const error = new HttpRequestError(errorCodes);
      return Promise.all([
        dispatch({ type: CREATEHACKER_FAIL, error }),
        dispatch({ type: FETCH_FAIL, error }),
      ]);
    }
  }
}
