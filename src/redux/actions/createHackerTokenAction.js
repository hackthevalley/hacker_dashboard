import { graphqlQueryAction } from './';

export const CREATEHACKERTOKEN_FAIL = 'CREATEHACKERTOKEN_FAIL';
export const CREATEHACKERTOKEN_SUCCESS = 'CREATEHACKERTOKEN_SUCCESS';

export function createHackerTokenAction(email_address, password) {
  return async (dispatch) => {
    const action = await dispatch(graphqlQueryAction({
      query: `mutation createHackerTokenMutation($email_address: String!, $password: String!) {
        createHackerToken(email_address: $email_address, password: $password) {
          token_body
        }
      }`,

      variables: {
        email_address,
        password,
      },
    }));

    if (action.error) {
      return dispatch({
        type: CREATEHACKERTOKEN_FAIL,
        error: action.error,
      });
    }

    const actionResponse = action.data.createHackerToken;
    return dispatch({
      type: CREATEHACKERTOKEN_SUCCESS,
      email_address,
      token_body: actionResponse.token_body,
    })
  }
}
