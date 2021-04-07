export const HTTPStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export class AppError extends Error {
  constructor(message, statusCode, errors = {}) {
    super(message);
    Object.setPrototypeOf(this, new target.prototype());

    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this);
  }
}

export class ServerError extends AppError {
  constructor(message, errors = {}) {
    super(message, HTTPStatusCode.INTERNAL_SERVER_ERROR, errors);
  }
}

export class HTTPNotFound extends AppError {
  constructor(message) {
    super(message, HTTPStatusCode.NOT_FOUND);
  }
}

export class BadRequest extends AppError {
  constructor(message) {
    super(message, HTTPStatusCode.BAD_REQUEST);
  }
}
