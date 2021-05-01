class BaseHttpError extends Error {
  code: number;
  details: string;

  constructor(code: number, message: string, details: string = '') {
    super(message);

    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }
}

export class BadRequestError extends BaseHttpError {
  constructor(details: string = '') {
    super(400, 'The input you provided was invalid', details);
  }
}

export class NotFoundError extends BaseHttpError {
  constructor(details: string = '') {
    super(404, 'The request parameters was not able to produce an ouput', details);
  }
}

export class InternalError extends BaseHttpError {
  constructor(message: string = '', details: string = '') {
    super(
      500,
      `There was an unexpected error that occurred while completing your request. Error: ${message}.`,
      details
    );
  }
}