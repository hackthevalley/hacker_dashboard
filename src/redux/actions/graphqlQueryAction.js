import { fetchAction } from "./";
import { graphqlUrl } from '../../helpers';
import HttpRequestError from "../../errors/HttpRequestError";

export const GRAPHQLQUERY_FAIL = 'GRAPHQLQUERY_FAIL';
export const GRAPHQLQUERY_SUCCESS = 'GRAPHQLQUERY_SUCCESS';

export function graphqlQueryAction(requestBody) {
  return async (dispatch) => {
    const action = await dispatch(fetchAction(graphqlUrl, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

      body: JSON.stringify(requestBody),
    }));

    if (action.error) {
      return dispatch({
        type: GRAPHQLQUERY_FAIL,
        error: action.error,
      });
    }

    const responseBody = action.result.body;
    if (responseBody.errors) {
      return dispatch({
        type: GRAPHQLQUERY_FAIL,
        error: new HttpRequestError(responseBody.errors.map(error => error.message)),
      });
    }

    return dispatch({
      type: GRAPHQLQUERY_SUCCESS,
      data: responseBody.data,
    });
  }
}
