import htv from 'htv-sdk';
import HttpRequestError from '../../errors/HttpRequestError';
import { logoutAction } from './';
import { Hacker } from '../../models';
import { FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL } from '.';

export const GETME_FAIL = 'GETME_FAIL';
export const GETME_SUCCESS = 'GETME_SUCCESS';
export const UPDATEME_FAIL = 'UPDATEME_FAIL';
export const UPDATEME_SUCCESS = 'UPDATEME_SUCCESS';

export function getMeAction() {
  return async (dispatch) => {
    try {
      const promise = htv.Graph.query(`{
        me {
          _id,
          email_address,
          first_name,
          last_name,
          gender,
          dob,
          school,
          github,
          linkedin,
          website,
          description,
          avatar,
          promo_email,
          created_at,
          updated_at
        }
      }`);
      dispatch({ type: FETCH_LOADING, promise });
      const hacker = await promise;
      if (!hacker.me) {
        await dispatch(logoutAction());
        throw new Error('Hacker is not logged in');
      }
      return Promise.all([
        dispatch({
          type: GETME_SUCCESS,
          hacker: new Hacker(hacker.me),
        }),
        dispatch({ type: FETCH_SUCCESS }),
      ]);
    } catch (err) {
      const errorCodes = err.graphQLErrors
        ? err.graphQLErrors.map(err => err.message)
        : err.errorCodes;
      const error = new HttpRequestError(errorCodes);
      return Promise.all([
        dispatch({ type: GETME_FAIL, error }),
        dispatch({ type: FETCH_FAIL, error }),
      ]);
    }
  }
}

export function updateHackerAction(hacker_id, hacker) {
  return async (dispatch) => {
    try {
      const promise = htv.Hacker.update(hacker_id, hacker);
      dispatch({ type: FETCH_LOADING, promise });
      await promise;
      return Promise.all([
        dispatch({
          type: UPDATEME_SUCCESS,
          hacker: new Hacker(hacker),
        }),
        dispatch({ type: FETCH_SUCCESS }),
      ]);
    } catch (err) {
      const errorCodes = err.graphQLErrors
        ? err.graphQLErrors.map(err => err.message)
        : err.errorCodes;
      const error = new HttpRequestError(errorCodes);
      return Promise.all([
        dispatch({ type: UPDATEME_FAIL, error }),
        dispatch({ type: FETCH_FAIL, error }),
      ]);
    }
  }
}
