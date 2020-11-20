export default class ValidationError extends Error {
  constructor(message = 'ValidationError') {
    super();
    this.message = message;
  }
}
