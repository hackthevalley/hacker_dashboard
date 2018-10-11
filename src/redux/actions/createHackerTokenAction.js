import htv from 'htv-sdk';
import HttpRequestError from '../../errors/HttpRequestError';
import localforage from 'localforage'

export const CREATEHACKERTOKEN_FAIL = 'CREATEHACKERTOKEN_FAIL';
export const CREATEHACKERTOKEN_SUCCESS = 'CREATEHACKERTOKEN_SUCCESS';

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
