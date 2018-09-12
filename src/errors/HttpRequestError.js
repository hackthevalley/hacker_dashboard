export default class HttpRequestError extends Error {
  constructor(errorCodes) {
    super('HttpRequestError');
    this.name = 'HttpRequestError';
    this.errorCodes = errorCodes;
  }
}
