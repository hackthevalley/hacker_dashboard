export const SETSESSION = 'SETSESSION';

export function setSessionAction(email_address, token_body) {
  return {
    type: SETSESSION,
    email_address,
    token_body,
  };
}
