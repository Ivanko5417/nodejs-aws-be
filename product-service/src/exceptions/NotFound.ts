export default class NotFound extends Error {
  constructor(message = 'NotFound') {
    super();
    this.message = message;
  }
}
