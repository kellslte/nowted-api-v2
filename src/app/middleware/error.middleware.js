import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "../../lib/utils/errorDefinitions.util.js";

const ErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else if (
    err instanceof NotFoundError ||
    err instanceof UnauthenticatedError ||
    err instanceof ConflictError ||
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError ||
    err instanceof InternalServerError
  ) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
    });
  } else {
    return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

export default ErrorMiddleware;