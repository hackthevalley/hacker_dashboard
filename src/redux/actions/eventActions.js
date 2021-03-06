import htv from '@hackthevalley/sdk';
import HttpRequestError from '../../errors/HttpRequestError';
import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL} from '.';

export const GETEVENTS_FAIL = 'GETEVENTS_FAIL';
export const GETEVENTS_SUCCESS = 'GETEVENTS_SUCCESS';

export function getEventsAction() {
    return async (dispatch) => {
        try {
            const promise = htv.Graph.query(`{
                  events {
                    _id
                    name
                    applications {
                      _id
                      name
                      description
                      open
                      event {
                        _id
                        name
                      }
                      questions {
                        _id
                        name
                        question_type
                        description
                        required
                        choices
                        max_characters
                      }
                    }
                  }

              }`);
            dispatch({type: FETCH_LOADING, promise});
            const result = await promise;
            return Promise.all([
                dispatch({
                    type: GETEVENTS_SUCCESS,
                    // Not using model because this does not include complete data
                    events: result.events,
                }),
                dispatch({type: FETCH_SUCCESS}),
            ]);
        } catch (err) {
            const errorCodes = err.graphQLErrors
                ? err.graphQLErrors.map(err => err.message)
                : err.errorCodes;
            const error = new HttpRequestError(errorCodes);
            return Promise.all([
                dispatch({type: GETEVENTS_FAIL, error}),
                dispatch({type: FETCH_FAIL, error}),
            ]);
        }
    }
}
