import htv from '@hackthevalley/sdk';
import HttpRequestError from '../../errors/HttpRequestError';
import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAIL} from '.';

export const GETAPPLICATIONS_FAIL = 'GETAPPLICATIONS_FAIL';
export const GETAPPLICATIONS_SUCCESS = 'GETAPPLICATIONS_SUCCESS';

/**
 * Fetch all hacker applications
 * @returns {Function}
 */
export function getApplicationsAction() {
    return async (dispatch) => {
        try {
            const promise = htv.Graph.query(`{
                me {
                    _id
                    applications {
                        _id
                        submitted_at
                        application {
                            _id
                            name
                            description
                            event {
                                _id
                                name
                            }
                        }
                    }
                }
            }`);
            dispatch({type: FETCH_LOADING, promise});
            const result = await promise;
            return Promise.all([
                dispatch({
                    type: GETAPPLICATIONS_SUCCESS,
                    // Not using model because this does not include complete data
                    applications: result.me.applications,
                }),
                dispatch({type: FETCH_SUCCESS}),
            ]);
        } catch (err) {
            const errorCodes = err.graphQLErrors
                ? err.graphQLErrors.map(err => err.message)
                : err.errorCodes;
            const error = new HttpRequestError(errorCodes);
            return Promise.all([
                dispatch({type: GETAPPLICATIONS_FAIL, error}),
                dispatch({type: FETCH_FAIL, error}),
            ]);
        }
    }
}
