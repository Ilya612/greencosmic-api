export default class ApiError extends Error {
  status;
  errors;

  constructor(status, errors = [], message) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthError() {
    return new ApiError(401, "User not logged in");
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}
