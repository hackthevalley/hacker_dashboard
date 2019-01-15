import HttpRequestError from '../../errors/HttpRequestError';

export const FETCH_LOADING = 'FETCH_LOADING';
export const FETCH_FAIL = 'FETCH_FAIL';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export function fetchAction(...args) {
  return async (dispatch) => {
    try {
      const fetchPromise = fetch(...args);
      dispatch({
        type: FETCH_LOADING,
        promise: fetchPromise,
      });
      const res = await fetchPromise;

      const result = {
        ok: res.ok,
        body: undefined,
      };
      const contentType = res.headers.get('Content-Type');
      switch (contentType && contentType.split(';')[0]) {
        case 'application/json':
          result.body = await res.json();
          break;

        default:
      }

      return dispatch({
        type: FETCH_SUCCESS,
        result,
      });
    } catch (err) {
      const error = new HttpRequestError(err.errorCodes || ['HttpInternal']);
      return dispatch({
        type: FETCH_FAIL,
        error,
      });
    }
  }
};
