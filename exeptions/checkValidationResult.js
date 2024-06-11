import { ApiError } from './api-error.js';

export const checkValidationResult = (errors) => {
  if (!errors.isEmpty()) {
    console.log(errors.array());
    throw ApiError.BadRequest(errors.array()[0].msg, errors.array());
  }
};
